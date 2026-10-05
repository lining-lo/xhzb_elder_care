package com.xhzb.nursing.domain;

import com.xhzb.nursing.domain.NursingProjectPlan;
import lombok.Data;

import java.util.List;

@Data
public class NursingPlanVo {

    /**
     * 护理计划id
     */
    private Long id;

    /**
     * 排序号
     */
    private Integer sortNo;

    /**
     * 护理计划名称
     */
    private String planName;

    /**
     * 护理计划状态
     */
    private Integer status;

    List<NursingProjectPlanVo> projectPlans;

}