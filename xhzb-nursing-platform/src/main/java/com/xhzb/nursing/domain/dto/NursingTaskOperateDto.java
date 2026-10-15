package com.xhzb.nursing.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 护理任务操作参数（取消/执行/改期）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "护理任务操作参数")
public class NursingTaskOperateDto
{
    /** 护理任务ID */
    @Schema(title = "护理任务ID")
    private Long taskId;

    /** 时间（执行时间/改期后的期望服务时间） */
    @Schema(title = "时间")
    private String estimatedServerTime;

    /** 执行图片 */
    @Schema(title = "执行图片")
    private String taskImage;

    /** 执行记录 */
    @Schema(title = "执行记录")
    private String mark;

    /** 取消原因 */
    @Schema(title = "取消原因")
    private String reason;
}
