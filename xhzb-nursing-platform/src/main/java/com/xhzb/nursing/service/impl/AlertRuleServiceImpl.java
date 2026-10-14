package com.xhzb.nursing.service.impl;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.NumberUtil;
import cn.hutool.json.JSONUtil;
import com.xhzb.common.constant.CacheConstants;
import com.xhzb.common.exception.base.BaseException;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.AlertData;
import com.xhzb.nursing.domain.DeviceData;
import com.xhzb.nursing.service.IAlertDataService;
import com.xhzb.system.mapper.SysUserRoleMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.AlertRuleMapper;
import com.xhzb.nursing.domain.AlertRule;
import com.xhzb.nursing.service.IAlertRuleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

/**
 * 报警规则Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-13
 */
@Service
public class AlertRuleServiceImpl extends ServiceImpl<AlertRuleMapper, AlertRule> implements IAlertRuleService {
    @Autowired
    private AlertRuleMapper alertRuleMapper;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private SysUserRoleMapper sysUserRoleMapper;

    @Value("${alertRule.roleAdmin}")
    private String roleAdmin;

    @Value("${alertRule.roleRepair}")
    private String roleRepair;

    @Autowired
    private IAlertDataService alertDataService;

    /**
     * 查询报警规则
     *
     * @param id 报警规则主键
     * @return 报警规则
     */
    @Override
    public AlertRule selectAlertRuleById(Long id) {
        return getById(id);
    }

    /**
     * 查询报警规则列表
     *
     * @param alertRule 报警规则
     * @return 报警规则
     */
    @Override
    public List<AlertRule> selectAlertRuleList(AlertRule alertRule) {
        return alertRuleMapper.selectAlertRuleList(alertRule);
    }

    /**
     * 新增报警规则
     *
     * @param alertRule 报警规则
     * @return 结果
     */
    @Override
    public int insertAlertRule(AlertRule alertRule) {
        return save(alertRule) ? 1 : 0;
    }

    /**
     * 修改报警规则
     *
     * @param alertRule 报警规则
     * @return 结果
     */
    @Override
    public int updateAlertRule(AlertRule alertRule) {
        return updateById(alertRule) ? 1 : 0;
    }

    /**
     * 批量删除报警规则
     *
     * @param ids 需要删除的报警规则主键
     * @return 结果
     */
    @Override
    public int deleteAlertRuleByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除报警规则信息
     *
     * @param id 报警规则主键
     * @return 结果
     */
    @Override
    public int deleteAlertRuleById(Long id) {
        return removeById(id) ? 1 : 0;
    }

    /**
     * 设备数据对应的报警规则校验，将报警数据保存到对应表中
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void alertRuleFilter() {
        //1. 查询报警规则表中的所有报警规则
        Long ruleCount = this.lambdaQuery().eq(AlertRule::getStatus, 1).count();
        if (ruleCount <= 0) {
            log.error("[定时报警规则校验]没有任何报警规则，无需处理");
            return;
        }

        //2. 查询Redis中所有设备上报的数据
        List<Object> values = redisTemplate.opsForHash().values(CacheConstants.IOT_DEVICE_LAST_DATA);
        if (CollUtil.isEmpty(values)) {
            log.error("[定时报警规则校验]没有任何设备数据，无需处理");
            return;
        }

        List<DeviceData> deviceDataAllList = new ArrayList<>();
        //3. 将查询到的设备上报数据进行格式化处理
        values.forEach(v -> {
            List<DeviceData> deviceDataList = JSONUtil.toList((String) v, DeviceData.class);
            deviceDataAllList.addAll(deviceDataList);
        });

        //4. 获取到全部的设备数据，进行过滤处理
        for (DeviceData deviceData : deviceDataAllList) {

            //4.1 校验设备上报时间是否太久（由业务规则决定，可变）
            int limit = 600;//单位秒，超过十分钟的设备上报数据不再处理
            long between = LocalDateTimeUtil.between(deviceData.getAlarmTime(),
                    LocalDateTime.now(), ChronoUnit.SECONDS);
            if (between > limit) {
                log.error("[定时报警规则校验]过十分钟的设备上报数据不再处理");
                continue;
            }

            //4.2 查询上报数据对应的设备绑定的全部报警规则数据

            //4.2.1 查询当前上报数据对应的产品类型下同样的功能绑定的全部规则数据
            List<AlertRule> productAlertRuleList = this.lambdaQuery()
                    .eq(AlertRule::getProductKey, deviceData.getProductKey())
                    .eq(AlertRule::getFunctionId, deviceData.getFunctionId())
                    .eq(AlertRule::getIotId, -1)
                    .eq(AlertRule::getStatus, 1)
                    .list();
            if (CollUtil.isEmpty(productAlertRuleList)) {
                productAlertRuleList = new ArrayList<>();
            }

            //4.2.2 查询当前上报数据对应的设备下绑定的规则数据
            List<AlertRule> deviceAlertRuleList = this.lambdaQuery()
                    .eq(AlertRule::getProductKey, deviceData.getProductKey())
                    .eq(AlertRule::getFunctionId, deviceData.getFunctionId())
                    .eq(AlertRule::getIotId, deviceData.getIotId())
                    .eq(AlertRule::getStatus, 1)
                    .list();
            if (CollUtil.isEmpty(deviceAlertRuleList)) {
                deviceAlertRuleList = new ArrayList<>();
            }

            //4.2.3 合并所有报警规则
            productAlertRuleList.addAll(deviceAlertRuleList);

            //4.2.4 判断规则是否为空
            if (CollUtil.isEmpty(productAlertRuleList)) {
                log.error("[定时报警规则校验]当前上报数据对应的设备没匹配到任何报警规则，无需处理");
                continue;
            }

            //4.2.5 对规则去重，得到全部规则列表
            List<AlertRule> allAlertRuleList = CollUtil.distinct(productAlertRuleList);
            for (AlertRule alertRule : allAlertRuleList) {
                //第一层校验：判断生效时间是否合适
                String period = alertRule.getAlertEffectivePeriod();//生效时间段，值的格式：00:00:00~23:59:59

                //比较设备数据上报时间是否在生效时间段内
                String[] periodArr = period.split("~");

                LocalTime startTime = LocalTime.parse(periodArr[0]);//生效开始时间
                LocalTime endTime = LocalTime.parse(periodArr[1]); //生效结束时间
                LocalTime alarmTime = deviceData.getAlarmTime().toLocalTime();//数据上报时间
                if (alarmTime.isBefore(startTime) || alarmTime.isAfter(endTime)) {
                    log.error("[定时报警规则校验]数据上报时间不在规则的生效时间段内，无需处理");
                    continue;
                }

                //第二层校验：判断数据阈值
                Double dataValue = Double.valueOf(deviceData.getDataValue());//设备上报的数据
                Double value = alertRule.getValue();//阈值
                String operator = alertRule.getOperator();//比较运算符 >= 或 <

                //x大于y，结果就是1； x等于y，结果就是0； x小于y，结果就是-1
                int compare = NumberUtil.compare(dataValue, value);

                //达到阈值
                if ((operator.equals(">=") && compare >= 0) || (operator.equals("<") && compare < 0)) {
                    //第三层校验：检查沉默周期是否存在，存在就直接结束
                    String silentKey = CharSequenceUtil.format(CacheConstants.IOT_ALERT_SILENT_PREFIX, deviceData.getIotId(), deviceData.getFunctionId(), alertRule.getId());
                    String silentVal = redisTemplate.opsForValue().get(silentKey);
                    if (StringUtils.isNotBlank(silentVal)) {
                        log.error("[定时报警规则校验]沉默周期还未结束，无需处理");
                        continue;
                    } else {

                        //第四层校验：判断持续周期对应的次数是否达到（没达到则直接结束）
                        String countKey = CharSequenceUtil.format(CacheConstants.IOT_ALERT_COUNT_PREFIX, deviceData.getIotId(), deviceData.getFunctionId(), alertRule.getId());
                        Long increment = redisTemplate.opsForValue().increment(countKey);
                        if (increment < alertRule.getDuration()) {
                            log.error("[定时报警规则校验]持续周期次数还未达到，无需处理");
                            continue;
                        }

                        //保存沉默周期的值到Redis，过期时间为沉默周期对应的秒数
                        redisTemplate.opsForValue().setIfAbsent(silentKey, "123", alertRule.getAlertSilentPeriod() * 60, TimeUnit.SECONDS);

                        //删除Redis中持续抽周期缓存数据
                        redisTemplate.delete(countKey);

                        //查询老人的护理人员
                        List<Long> nursingIds = null;

                        //如果是老人异常数据，则查询对应护理人员
                        if (alertRule.getAlertDataType() == 0) {
                            // 老人异常数据类型
                            if (deviceData.getLocationType() == 0) {
                                nursingIds = this.baseMapper.selectNursingIdsByElderId(Long.valueOf(deviceData.getAccessLocation()));
                            } else if (deviceData.getLocationType() == 1) {
                                nursingIds = this.baseMapper.selectNursingIdsByBedId(Long.valueOf(deviceData.getAccessLocation()));
                            }
                        } else {
                            //如果是设备异常数据，则查询维修工
                            nursingIds = sysUserRoleMapper.selectUserIdsByRoleName(roleRepair);
                        }

                        //查询超级管理员
                        List<Long> adminUserIds = sysUserRoleMapper.selectUserIdsByRoleName(roleAdmin);

                        //合并用户ID
                        nursingIds.addAll(adminUserIds);

                        //去重用户ID （等待查看异常报警的所有用户ID）
                        List<Long> nursingIdList = CollUtil.distinct(nursingIds);

                        //封装报警基础数据对象
                        AlertData alertData = new AlertData();
                        BeanUtils.copyProperties(deviceData, alertData);
                        alertData.setId(null);
                        alertData.setType(alertRule.getAlertDataType());//设备数据类型 0-老人异常数据 1-设备异常数据
                        alertData.setAlertRuleId(alertRule.getId());//规则id
                        alertData.setStatus(0);//0-待处理  1-已处理
                        String reasonTemplate = "功能{}{}{}，持续了{}个周期才报警，沉默周期：{}";
                        String alertReason = CharSequenceUtil.format(reasonTemplate,
                                alertRule.getFunctionId(),
                                alertRule.getOperator(),
                                alertRule.getValue(),
                                alertRule.getDuration(),
                                alertRule.getAlertSilentPeriod()
                        );
                        alertData.setAlertReason(alertReason);//报警原因
                        //所有用户报警数据的集合
                        List<AlertData> alertDataList = new ArrayList<>();
                        for (Long userId : nursingIdList) {
                            //封装用户报警数据，设置用户ID
                            AlertData userAlertData = new AlertData();
                            BeanUtils.copyProperties(alertData, userAlertData);
                            userAlertData.setUserId(userId);
                            alertDataList.add(userAlertData);
                        }

                        //批量保存所有用户报警数据
                        boolean result = alertDataService.saveBatch(alertDataList);
                        if (!result) {
                            throw new BaseException("保存用户保存数据失败");
                        }
                    }
                } else {
                    log.error("[定时报警规则校验]数据上报的值没有达到规则阈值，无需处理");
                    continue;
                }

            }
        }
    }
}
