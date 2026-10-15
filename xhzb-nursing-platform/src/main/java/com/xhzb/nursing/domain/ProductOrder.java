package com.xhzb.nursing.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xhzb.common.core.domain.BaseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 服务单（订单）对象 product_order
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "服务单对象")
public class ProductOrder extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 订单号 */
    @Schema(title = "订单号")
    private String orderNo;

    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 护理项目ID */
    @Schema(title = "护理项目ID")
    private Long projectId;

    /** 小程序用户ID */
    @Schema(title = "小程序用户ID")
    private Long familyMemberId;

    /** 期望服务时间 */
    @Schema(title = "期望服务时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedArrivalTime;

    /** 订单金额 */
    @Schema(title = "订单金额")
    private BigDecimal amount;

    /** 状态（0：待支付，1：待执行，2：已执行，3：已完成，4：已取消，5：退款中） */
    @Schema(title = "状态（0：待支付，1：待执行，2：已执行，3：已完成，4：已取消，5：退款中）")
    private Integer status;

    /** 交易单号 */
    @Schema(title = "交易单号")
    private String tradingOrderNo;

    /** 支付时间 */
    @Schema(title = "支付时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime payTime;

    /** 取消原因 */
    @Schema(title = "取消原因")
    private String cancelReason;
}
