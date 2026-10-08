package com.xhzb.nursing.service.impl;

import java.util.List;

import cn.hutool.json.JSONUtil;
import com.xhzb.common.exception.base.BaseException;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.nursing.domain.HealthAssessmentDataCollection;
import com.xhzb.nursing.domain.dto.health.ElderAssessmentDto;
import com.xhzb.nursing.service.IHealthAssessmentDataCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.HealthAssessmentMapper;
import com.xhzb.nursing.domain.HealthAssessment;
import com.xhzb.nursing.service.IHealthAssessmentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

/**
 * 健康评估记录Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-08
 */
@Service
public class HealthAssessmentServiceImpl extends ServiceImpl<HealthAssessmentMapper, HealthAssessment> implements IHealthAssessmentService {
    @Autowired
    private HealthAssessmentMapper healthAssessmentMapper;

    @Autowired
    private IHealthAssessmentDataCollectionService healthAssessmentDataCollectionService;

    /**
     * 查询健康评估记录
     *
     * @param id 健康评估记录主键
     * @return 健康评估记录
     */
    @Override
    public HealthAssessmentDataCollection selectHealthAssessmentById(Long id) {
        return healthAssessmentDataCollectionService.getById(id);
    }

    /**
     * 查询健康评估记录列表
     *
     * @param healthAssessment 健康评估记录
     * @return 健康评估记录
     */
    @Override
    public List<HealthAssessment> selectHealthAssessmentList(HealthAssessment healthAssessment) {
        return healthAssessmentMapper.selectHealthAssessmentList(healthAssessment);
    }


    /**
     * 新增健康评估记录
     *
     * @param dto 健康评估记录
     * @return 结果
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public Long insertHealthAssessment(ElderAssessmentDto dto) {
        // 保存两份数据，评估记录表，评估数据收集表  注意，这两个表的主键是一样的
        HealthAssessment healthAssessment = new HealthAssessment();
        // 如果id不为空，则根据id查询评估基本信息
        if (dto.getId() != null) {
            //查询状态  如果是评估完成，则不能再新增或修改
            HealthAssessment ha = getById(dto.getId());
            if (!ha.getEvaluationProgress().equals(0)) {
                throw new BaseException("评估已完成，不能再次修改");
            }
            healthAssessment = ha;
        } else {
            // 入住状态  默认为0  未入住
            healthAssessment.setCheckInStatus(0);
            // 核心建议  默认为null
            healthAssessment.setCoreSuggestion(null);
            // 评估进度  默认为0  评估中
            healthAssessment.setEvaluationProgress(0);
        }

        // 老人姓名  从基本信息中获取
        healthAssessment.setElderName(dto.getBasicInfo().getElderName());
        // 身份证号码  从基本信息中获取
        healthAssessment.setIdCard(dto.getBasicInfo().getIdCard());
        // 保存，会自动主键返回
        saveOrUpdate(healthAssessment);

        //评估数据数据采集表
        HealthAssessmentDataCollection healthAssessmentDataCollection = new HealthAssessmentDataCollection();
        // 设置主键，与评估基本信息表的主键一致
        healthAssessmentDataCollection.setId(healthAssessment.getId());
        // 其余字段主要是为了方便展示使用，全部转换为JSON字符串中，存储到字段中
        // 基本信息
        healthAssessmentDataCollection.setBasicInfo(JSONUtil.toJsonStr(dto.getBasicInfo()));
        // 健康评估
        healthAssessmentDataCollection.setHealthAssessment(JSONUtil.toJsonStr(dto.getHealthAssessmentDto()));
        // 日常生活活动
        healthAssessmentDataCollection.setDailyLivingActivities(JSONUtil.toJsonStr(dto.getDailyLivingActivities()));
        // 精神状态
        healthAssessmentDataCollection.setMentalState(JSONUtil.toJsonStr(dto.getMentalState()));
        // 感知与沟通
        healthAssessmentDataCollection.setPerceptionCommunication(JSONUtil.toJsonStr(dto.getPerceptionAndCommunication()));
        // 社会参与
        healthAssessmentDataCollection.setSocialParticipation(JSONUtil.toJsonStr(dto.getSocialParticipation()));

        healthAssessmentDataCollectionService.saveOrUpdate(healthAssessmentDataCollection);

        //返回主键，方便前端查询或处理
        return healthAssessment.getId();
    }

    /**
     * 修改健康评估记录
     *
     * @param healthAssessment 健康评估记录
     * @return 结果
     */
    @Override
    public int updateHealthAssessment(HealthAssessment healthAssessment) {
        return updateById(healthAssessment) ? 1 : 0;
    }

    /**
     * 批量删除健康评估记录
     *
     * @param ids 需要删除的健康评估记录主键
     * @return 结果
     */
    @Override
    public int deleteHealthAssessmentByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除健康评估记录信息
     *
     * @param id 健康评估记录主键
     * @return 结果
     */
    @Override
    public int deleteHealthAssessmentById(Long id) {
        return removeById(id) ? 1 : 0;
    }
}
