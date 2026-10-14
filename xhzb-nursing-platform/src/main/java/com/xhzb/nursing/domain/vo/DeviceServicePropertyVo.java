package com.xhzb.nursing.domain.vo;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 设备最新上报数据对象（小程序「查询健康数据」使用）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "设备最新上报数据")
public class DeviceServicePropertyVo
{
    /** 功能ID */
    @Schema(title = "功能ID")
    private String functionId;

    /** 数据上报时间 */
    @Schema(title = "数据上报时间")
    private LocalDateTime eventTime;

    /** 数据值 */
    @Schema(title = "数据值")
    private String value;
}
