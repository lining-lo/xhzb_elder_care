package com.xhzb.nursing.domain.dto;

import java.math.BigDecimal;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序退款申请参数
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "小程序退款申请参数")
public class OrderRefundDto
{
    /** 订单ID（前端传的 productOrderNo） */
    @Schema(title = "订单ID")
    private Long productOrderNo;

    /** 订单号 */
    @Schema(title = "订单号")
    private String orderNo;

    /** 交易单号 */
    @Schema(title = "交易单号")
    private String tradingOrderNo;

    /** 退款渠道 */
    @Schema(title = "退款渠道")
    private String tradingChannel;

    /** 退款金额 */
    @Schema(title = "退款金额")
    private BigDecimal refundAmount;
}
