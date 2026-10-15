package com.xhzb.nursing.domain;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xhzb.common.core.domain.BaseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 护理任务对象 nursing_task
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "护理任务对象")
public class NursingTask extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 护理项目ID */
    @Schema(title = "护理项目ID")
    private Long projectId;

    /** 护理计划ID（计划外任务为空） */
    @Schema(title = "护理计划ID")
    private Long planId;

    /** 任务类型（1：护理计划外，2：护理计划内） */
    @Schema(title = "任务类型（1：护理计划外，2：护理计划内）")
    private Integer taskType;

    /** 期望服务时间 */
    @Schema(title = "期望服务时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedServerTime;

    /** 计划服务时间（生成时的原始时间，改期后不变，用于避免重复生成） */
    @Schema(title = "计划服务时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime planServerTime;

    /** 实际执行时间 */
    @Schema(title = "实际执行时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime realServerTime;

    /** 执行图片 */
    @Schema(title = "执行图片")
    private String taskImage;

    /** 执行记录 */
    @Schema(title = "执行记录")
    private String mark;

    /** 取消原因 */
    @Schema(title = "取消原因")
    private String cancelReason;

    /** 状态（1：待执行，2：已执行，3：已取消） */
    @Schema(title = "状态（1：待执行，2：已执行，3：已取消）")
    private Integer status;
}
