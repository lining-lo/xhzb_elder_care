package com.xhzb.nursing.service;

import java.util.List;
import com.xhzb.nursing.domain.NursingPlan;
import com.xhzb.nursing.domain.NursingPlanDto;
import com.xhzb.nursing.domain.NursingPlanVo;

/**
 * 护理计划Service接口
 * 
 * @author lining-lo
 * @date 2026-10-04
 */
public interface INursingPlanService 
{
    /**
     * 查询护理计划
     *
     * @param id 护理计划主键
     * @return 护理计划
     */
    public NursingPlanVo selectNursingPlanById(Long id);

    /**
     * 查询护理计划列表
     * 
     * @param nursingPlan 护理计划
     * @return 护理计划集合
     */
    public List<NursingPlan> selectNursingPlanList(NursingPlan nursingPlan);

    /**
     * 新增护理计划
     *
     * @param dto 护理计划
     * @return 结果
     */
    public int insertNursingPlan(NursingPlanDto dto);

    /**
     * 修改护理计划
     * 
     * @param dto 护理计划
     * @return 结果
     */
    public int updateNursingPlan(NursingPlanDto dto);

    /**
     * 批量删除护理计划
     * 
     * @param ids 需要删除的护理计划主键集合
     * @return 结果
     */
    public int deleteNursingPlanByIds(Integer[] ids);

    /**
     * 删除护理计划信息
     * 
     * @param id 护理计划主键
     * @return 结果
     */
    public int deleteNursingPlanById(Integer id);
}
