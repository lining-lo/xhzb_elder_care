package com.xhzb.nursing.domain.vo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xhzb.nursing.domain.NursingProject;
import com.xhzb.nursing.domain.RefundRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序端服务单（订单）信息
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "小程序端服务单信息")
public class MemberOrderVo
{
    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 订单号 */
    @Schema(title = "订单号")
    private String orderNo;

    /** 期望服务时间 */
    @Schema(title = "期望服务时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedArrivalTime;

    /** 订单金额 */
    @Schema(title = "订单金额")
    private BigDecimal amount;

    /** 状态（0：待支付，1：待执行，2：已执行，3：已完成，4：已取消，5：退款中） */
    @Schema(title = "状态")
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

    /** 备注 */
    @Schema(title = "备注")
    private String remark;

    /** 创建时间 */
    @Schema(title = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /** 护理项目信息 */
    @Schema(title = "护理项目信息")
    private NursingProject nursingProjectVo;

    /** 老人信息 */
    @Schema(title = "老人信息")
    private MemberElderVo elderVo;

    /** 退款记录 */
    @Schema(title = "退款记录")
    private RefundRecord refundRecordVo;

    /** 支付参数（下单/支付时返回，含 placeOrderJson） */
    @Schema(title = "支付参数")
    private Map<String, Object> tradingVo;
}
