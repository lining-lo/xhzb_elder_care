package com.xhzb.nursing.domain.vo;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 预约时间段剩余预约数量对象
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@Data
@Schema(description = "预约时间段剩余预约数量")
public class ReservationTimeCountVo
{
    /** 预约时间段 */
    @Schema(title = "预约时间段")
    private LocalDateTime time;

    /** 剩余可预约数量 */
    @Schema(title = "剩余可预约数量")
    private Integer count;
}
