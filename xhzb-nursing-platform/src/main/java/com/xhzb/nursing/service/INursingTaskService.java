package com.xhzb.nursing.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.NursingTask;
import com.xhzb.nursing.domain.dto.NursingTaskOperateDto;
import com.xhzb.nursing.domain.dto.NursingTaskQueryDto;
import com.xhzb.nursing.domain.vo.NursingTaskVo;

/**
 * 护理任务Service接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public interface INursingTaskService extends IService<NursingTask>
{
    /**
     * 查询护理任务列表
     *
     * @param query 查询条件
     * @return 护理任务列表
     */
    public List<NursingTaskVo> selectNursingTaskList(NursingTaskQueryDto query);

    /**
     * 查询护理任务详情
     *
     * @param id 护理任务ID
     * @return 护理任务详情
     */
    public NursingTaskVo selectNursingTaskById(Long id);

    /**
     * 取消护理任务
     *
     * @param operateDto 任务ID与取消原因
     * @return 结果
     */
    public int cancelNursingTask(NursingTaskOperateDto operateDto);

    /**
     * 执行护理任务
     *
     * @param operateDto 任务ID、执行时间、执行图片与执行记录
     * @return 结果
     */
    public int executeNursingTask(NursingTaskOperateDto operateDto);

    /**
     * 修改护理任务的期望服务时间（改期）
     *
     * @param operateDto 任务ID与新的期望服务时间
     * @return 结果
     */
    public int updateNursingTaskTime(NursingTaskOperateDto operateDto);

    /**
     * 按老人的护理计划生成护理任务（计划内任务，未来一周）
     *
     * @return 生成的任务数量
     */
    public int generateNursingTask();
}
