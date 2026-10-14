package com.xhzb.nursing.domain.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 设备指标统计数据对象（小程序「按天/按周统计查询指标数据」使用）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "设备指标统计数据")
public class DeviceDataTrendVo
{
    /** 时间点，按天统计为 HH:00，按周统计为 MM.dd */
    @Schema(title = "时间点")
    private String dateTime;

    /** 指标值 */
    @Schema(title = "指标值")
    private Double dataValue;
}
