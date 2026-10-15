package com.xhzb.nursing.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.CheckIn;
import com.xhzb.nursing.domain.Elder;
import com.xhzb.nursing.domain.NursingLevel;
import com.xhzb.nursing.domain.NursingPlan;
import com.xhzb.nursing.domain.NursingProjectPlan;
import com.xhzb.nursing.domain.NursingTask;
import com.xhzb.nursing.domain.dto.NursingTaskOperateDto;
import com.xhzb.nursing.domain.dto.NursingTaskQueryDto;
import com.xhzb.nursing.domain.vo.NursingTaskVo;
import com.xhzb.nursing.mapper.NursingProjectPlanMapper;
import com.xhzb.nursing.mapper.NursingTaskMapper;
import com.xhzb.nursing.service.ICheckInService;
import com.xhzb.nursing.service.IElderService;
import com.xhzb.nursing.service.INursingLevelService;
import com.xhzb.nursing.service.INursingPlanService;
import com.xhzb.nursing.service.INursingTaskService;

/**
 * 护理任务Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Service
public class NursingTaskServiceImpl extends ServiceImpl<NursingTaskMapper, NursingTask> implements INursingTaskService
{
    /** 状态：待执行 */
    private static final Integer STATUS_WAIT = 1;

    /** 状态：已执行 */
    private static final Integer STATUS_DONE = 2;

    /** 状态：已取消 */
    private static final Integer STATUS_CANCELLED = 3;

    /** 任务类型：护理计划内 */
    private static final Integer TASK_TYPE_INNER = 2;

    /** 老人状态：已入住 */
    private static final Integer ELDER_STATUS_CHECKED_IN = 1;

    /** 生成任务的天数（未来一周） */
    private static final int GENERATE_DAYS = 7;

    /** 执行周期：一周的天数 / 一月的天数 */
    private static final int WEEK_DAYS = 7;

    private static final int MONTH_DAYS = 30;

    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private static final DateTimeFormatter TIME_FORMATTER_SECOND = DateTimeFormatter.ofPattern("HH:mm:ss");

    private static final DateTimeFormatter TIME_FORMATTER_MINUTE = DateTimeFormatter.ofPattern("HH:mm");

    @Autowired
    private NursingTaskMapper nursingTaskMapper;

    @Autowired
    private IElderService elderService;

    @Autowired
    private ICheckInService checkInService;

    @Autowired
    private INursingLevelService nursingLevelService;

    @Autowired
    private INursingPlanService nursingPlanService;

    @Autowired
    private NursingProjectPlanMapper nursingProjectPlanMapper;

    /**
     * 查询护理任务列表
     *
     * @param query 查询条件
     * @return 护理任务列表
     */
    @Override
    public List<NursingTaskVo> selectNursingTaskList(NursingTaskQueryDto query)
    {
        return nursingTaskMapper.selectNursingTaskList(query);
    }

    /**
     * 查询护理任务详情
     *
     * @param id 护理任务ID
     * @return 护理任务详情
     */
    @Override
    public NursingTaskVo selectNursingTaskById(Long id)
    {
        NursingTaskVo nursingTask = nursingTaskMapper.selectNursingTaskById(id);
        if (Objects.isNull(nursingTask))
        {
            throw new ServiceException("护理任务不存在");
        }
        return nursingTask;
    }

    /**
     * 取消护理任务
     *
     * @param operateDto 任务ID与取消原因
     * @return 结果
     */
    @Override
    public int cancelNursingTask(NursingTaskOperateDto operateDto)
    {
        NursingTask task = getWaitTask(operateDto.getTaskId());
        if (StringUtils.isEmpty(operateDto.getReason()))
        {
            throw new ServiceException("取消原因不能为空");
        }
        task.setStatus(STATUS_CANCELLED);
        task.setCancelReason(operateDto.getReason());
        return updateById(task) ? 1 : 0;
    }

    /**
     * 执行护理任务
     *
     * @param operateDto 任务ID、执行时间、执行图片与执行记录
     * @return 结果
     */
    @Override
    public int executeNursingTask(NursingTaskOperateDto operateDto)
    {
        NursingTask task = getWaitTask(operateDto.getTaskId());
        task.setRealServerTime(parseDateTime(operateDto.getEstimatedServerTime(), LocalDateTime.now()));
        task.setTaskImage(operateDto.getTaskImage());
        task.setMark(operateDto.getMark());
        task.setStatus(STATUS_DONE);
        return updateById(task) ? 1 : 0;
    }

    /**
     * 修改护理任务的期望服务时间（改期）
     *
     * @param operateDto 任务ID与新的期望服务时间
     * @return 结果
     */
    @Override
    public int updateNursingTaskTime(NursingTaskOperateDto operateDto)
    {
        NursingTask task = getWaitTask(operateDto.getTaskId());
        task.setEstimatedServerTime(parseDateTime(operateDto.getEstimatedServerTime(), null));
        return updateById(task) ? 1 : 0;
    }

    /**
     * 按老人的护理计划生成护理任务（计划内任务，未来一周）
     * 规则：老人（已入住）→ 最新入住记录的护理等级 → 护理计划 → 计划中的护理项目；
     * 执行周期 0每天/1每周/2每月 与执行频次换算为间隔天数（如每周3次 = 每2天一次），
     * 期望服务时间取计划中的期望服务时间；已经存在的任务不会重复生成。
     *
     * @return 生成的任务数量
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int generateNursingTask()
    {
        LocalDate today = LocalDate.now();
        LocalDateTime now = LocalDateTime.now();
        int count = 0;

        List<Elder> elderList = elderService.lambdaQuery()
                .eq(Elder::getStatus, ELDER_STATUS_CHECKED_IN).list();
        for (Elder elder : elderList)
        {
            NursingPlan plan = getNursingPlan(elder.getId());
            if (Objects.isNull(plan))
            {
                continue;
            }

            List<NursingProjectPlan> projectPlanList = nursingProjectPlanMapper.selectList(
                    Wrappers.<NursingProjectPlan>lambdaQuery().eq(NursingProjectPlan::getPlanId, plan.getId()));
            for (NursingProjectPlan projectPlan : projectPlanList)
            {
                LocalTime executeTime = parseTime(projectPlan.getExecuteTime());
                if (Objects.isNull(executeTime))
                {
                    continue;
                }
                int interval = getExecuteInterval(projectPlan);
                for (int day = 0; day < GENERATE_DAYS; day += interval)
                {
                    LocalDateTime estimatedServerTime = LocalDateTime.of(today.plusDays(day), executeTime);
                    if (estimatedServerTime.isBefore(now))
                    {
                        continue;
                    }
                    if (taskExists(elder.getId(), projectPlan.getProjectId(), estimatedServerTime))
                    {
                        continue;
                    }
                    NursingTask task = new NursingTask();
                    task.setElderId(elder.getId());
                    task.setProjectId(projectPlan.getProjectId());
                    task.setPlanId(plan.getId());
                    task.setTaskType(TASK_TYPE_INNER);
                    task.setEstimatedServerTime(estimatedServerTime);
                    task.setPlanServerTime(estimatedServerTime);
                    task.setStatus(STATUS_WAIT);
                    save(task);
                    count++;
                }
            }
        }
        return count;
    }

    /**
     * 根据老人的入住记录查询护理计划
     */
    private NursingPlan getNursingPlan(Long elderId)
    {
        CheckIn checkIn = checkInService.lambdaQuery()
                .eq(CheckIn::getElderId, elderId)
                .orderByDesc(CheckIn::getId)
                .last("limit 1").one();
        if (Objects.isNull(checkIn) || StringUtils.isEmpty(checkIn.getNursingLevelName()))
        {
            return null;
        }
        NursingLevel nursingLevel = nursingLevelService.lambdaQuery()
                .eq(NursingLevel::getName, checkIn.getNursingLevelName())
                .orderByDesc(NursingLevel::getId)
                .last("limit 1").one();
        if (Objects.isNull(nursingLevel) || Objects.isNull(nursingLevel.getLplanId()))
        {
            return null;
        }
        NursingPlan plan = nursingPlanService.getById(nursingLevel.getLplanId());
        return Objects.nonNull(plan) && Integer.valueOf(1).equals(plan.getStatus()) ? plan : null;
    }

    /**
     * 把执行周期与执行频次换算成间隔天数（如每周3次 → 每2天一次）
     */
    private int getExecuteInterval(NursingProjectPlan projectPlan)
    {
        long cycle = Objects.isNull(projectPlan.getExecuteCycle()) ? 0L : projectPlan.getExecuteCycle();
        int period = cycle == 1L ? WEEK_DAYS : (cycle == 2L ? MONTH_DAYS : 1);
        long frequency = Objects.isNull(projectPlan.getExecuteFrequency()) || projectPlan.getExecuteFrequency() < 1
                ? 1L : projectPlan.getExecuteFrequency();
        return (int) Math.max(1L, period / frequency);
    }

    /**
     * 判断该时间点上是否已经生成过任务（按计划服务时间判断，任务改期后也不会重复生成）
     */
    private boolean taskExists(Long elderId, Long projectId, LocalDateTime planServerTime)
    {
        Long count = nursingTaskMapper.selectCount(Wrappers.<NursingTask>lambdaQuery()
                .eq(NursingTask::getElderId, elderId)
                .eq(NursingTask::getProjectId, projectId)
                .eq(NursingTask::getPlanServerTime, planServerTime));
        return count > 0;
    }

    /**
     * 获取待执行的任务
     */
    private NursingTask getWaitTask(Long taskId)
    {
        if (Objects.isNull(taskId))
        {
            throw new ServiceException("护理任务ID不能为空");
        }
        NursingTask task = getById(taskId);
        if (Objects.isNull(task))
        {
            throw new ServiceException("护理任务不存在");
        }
        if (!STATUS_WAIT.equals(task.getStatus()))
        {
            throw new ServiceException("当前任务状态不允许该操作");
        }
        return task;
    }

    /**
     * 解析期望服务时间（计划中的 HH:mm / HH:mm:ss）
     */
    private LocalTime parseTime(String text)
    {
        if (StringUtils.isEmpty(text))
        {
            return null;
        }
        String value = text.trim();
        try
        {
            return LocalTime.parse(value, TIME_FORMATTER_SECOND);
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalTime.parse(value, TIME_FORMATTER_MINUTE);
        }
        catch (DateTimeParseException e)
        {
            return null;
        }
    }

    /**
     * 解析时间：兼容 yyyy-MM-dd HH:mm:ss、ISO 格式以及前端日期对象序列化后的带时区格式
     */
    private LocalDateTime parseDateTime(String text, LocalDateTime defaultValue)
    {
        if (StringUtils.isEmpty(text))
        {
            if (Objects.isNull(defaultValue))
            {
                throw new ServiceException("时间不能为空");
            }
            return defaultValue;
        }
        String value = text.trim();
        try
        {
            return OffsetDateTime.parse(value).atZoneSameInstant(ZoneId.systemDefault()).toLocalDateTime();
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalDateTime.parse(value.length() > 19 ? value.substring(0, 19) : value);
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalDateTime.parse(value, DATE_TIME_FORMATTER);
        }
        catch (DateTimeParseException e)
        {
            throw new ServiceException("时间格式不正确：" + value);
        }
    }
}
