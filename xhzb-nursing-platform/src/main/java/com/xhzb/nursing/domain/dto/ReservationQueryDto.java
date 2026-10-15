package com.xhzb.nursing.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 预约信息查询参数（管理端）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "预约信息查询参数")
public class ReservationQueryDto
{
    /** 预约人姓名 */
    @Schema(title = "预约人姓名")
    private String name;

    /** 预约人手机号 */
    @Schema(title = "预约人手机号")
    private String mobile;

    /** 预约类型（0：参观预约，1：探访预约） */
    @Schema(title = "预约类型（0：参观预约，1：探访预约）")
    private Integer type;

    /** 预约状态（0：待上门，1：已完成，2：已取消，3：已过期） */
    @Schema(title = "预约状态（0：待上门，1：已完成，2：已取消，3：已过期）")
    private Integer status;

    /** 预约时间-开始 */
    @Schema(title = "预约时间-开始")
    private String startTime;

    /** 预约时间-结束 */
    @Schema(title = "预约时间-结束")
    private String endTime;
}
