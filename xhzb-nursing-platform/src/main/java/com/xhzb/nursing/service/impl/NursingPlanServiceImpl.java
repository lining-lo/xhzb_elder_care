package com.xhzb.nursing.service.impl;

import java.util.List;

import com.xhzb.common.utils.DateUtils;
import com.xhzb.nursing.domain.NursingPlanDto;
import com.xhzb.nursing.domain.NursingPlanVo;
import com.xhzb.nursing.domain.NursingProjectPlanVo;
import com.xhzb.nursing.mapper.NursingProjectPlanMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.NursingPlanMapper;
import com.xhzb.nursing.domain.NursingPlan;
import com.xhzb.nursing.service.INursingPlanService;
import org.springframework.transaction.annotation.Transactional;

/**
 * 护理计划Service业务层处理
 *
 * @author lining-lo
 * @date 2026-10-04
 */
@Service
public class NursingPlanServiceImpl implements INursingPlanService {
    @Autowired
    private NursingPlanMapper nursingPlanMapper;

    @Autowired
    private NursingProjectPlanMapper nursingProjectPlanMapper;

    /**
     * 查询护理计划
     *
     * @param id 护理计划主键
     * @return 护理计划
     */
    @Override
    public NursingPlanVo selectNursingPlanById(Long id)
    {
        //查询护理计划
        NursingPlan nursingPlan = nursingPlanMapper.selectNursingPlanById(Math.toIntExact(id));
        NursingPlanVo nursingPlanVo = new NursingPlanVo();
        BeanUtils.copyProperties(nursingPlan,nursingPlanVo);

        //根据护理计划ID查询护理项目的关系
        List<NursingProjectPlanVo> list = nursingProjectPlanMapper.selectByPlanId(id);
        nursingPlanVo.setProjectPlans(list);

        return nursingPlanVo;
    }

    /**
     * 查询护理计划列表
     *
     * @param nursingPlan 护理计划
     * @return 护理计划
     */
    @Override
    public List<NursingPlan> selectNursingPlanList(NursingPlan nursingPlan) {
        return nursingPlanMapper.selectNursingPlanList(nursingPlan);
    }

    /**
     * 新增护理计划
     *
     * @param dto 护理计划
     * @return 结果
     */
    @Transactional
    @Override
    public int insertNursingPlan(NursingPlanDto dto) {
        // 保存护理计划
        NursingPlan nursingPlan = new NursingPlan();
        BeanUtils.copyProperties(dto, nursingPlan);
        nursingPlan.setCreateTime(DateUtils.getNowDate());
        nursingPlanMapper.insertNursingPlan(nursingPlan);

        //保存护理项目计划中间关系数据
        if (dto.getProjectPlans() != null && !dto.getProjectPlans().isEmpty()) {
            dto.getProjectPlans().forEach(projectPlan -> {
                projectPlan.setPlanId(Long.valueOf(nursingPlan.getId()));
                projectPlan.setCreateTime(DateUtils.getNowDate());
            });
            //批量保存
            return nursingProjectPlanMapper.batchInsert(dto.getProjectPlans());
        }
        return 0;
    }

    /**
     * 修改护理计划
     *
     * @param nursingPlan 护理计划
     * @return 结果
     */
    @Override
    public int updateNursingPlan(NursingPlan nursingPlan) {
        nursingPlan.setUpdateTime(DateUtils.getNowDate());
        return nursingPlanMapper.updateNursingPlan(nursingPlan);
    }

    /**
     * 批量删除护理计划
     *
     * @param ids 需要删除的护理计划主键
     * @return 结果
     */
    @Override
    public int deleteNursingPlanByIds(Integer[] ids) {
        return nursingPlanMapper.deleteNursingPlanByIds(ids);
    }

    /**
     * 删除护理计划信息
     *
     * @param id 护理计划主键
     * @return 结果
     */
    @Transactional
    @Override
    public int deleteNursingPlanById(Integer id) {
        nursingProjectPlanMapper.deleteNursingPlanByPlandId(id);
        int result = nursingPlanMapper.deleteNursingPlanById(id);
        return result;
    }
}
