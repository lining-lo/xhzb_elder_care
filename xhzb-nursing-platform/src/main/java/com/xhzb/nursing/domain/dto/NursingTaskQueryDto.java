package com.xhzb.nursing.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 护理任务查询参数
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "护理任务查询参数")
public class NursingTaskQueryDto
{
    /** 状态（1：待执行，2：已执行，3：已取消） */
    @Schema(title = "状态")
    private Integer status;

    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String elderName;

    /** 护理员ID */
    @Schema(title = "护理员ID")
    private Long nurseId;

    /** 护理项目ID */
    @Schema(title = "护理项目ID")
    private Long projectId;

    /** 期望服务时间-开始 */
    @Schema(title = "期望服务时间-开始")
    private String startTime;

    /** 期望服务时间-结束 */
    @Schema(title = "期望服务时间-结束")
    private String endTime;
}
