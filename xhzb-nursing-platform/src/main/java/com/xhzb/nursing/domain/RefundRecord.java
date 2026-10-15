package com.xhzb.nursing.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xhzb.common.core.domain.BaseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 退款记录对象 refund_record
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "退款记录对象")
public class RefundRecord extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 订单ID */
    @Schema(title = "订单ID")
    private Long orderId;

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

    /** 退款状态（1：退款中，2：退款成功，3：退款失败） */
    @Schema(title = "退款状态（1：退款中，2：退款成功，3：退款失败）")
    private Integer refundStatus;

    /** 退款完成时间 */
    @Schema(title = "退款完成时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime refundTime;
}
