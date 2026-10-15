package com.xhzb.nursing.domain.vo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序端账单信息
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "小程序端账单信息")
public class MemberBillVo
{
    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 账单编号 */
    @Schema(title = "账单编号")
    private String billNo;

    /** 账单类型（0：月度账单，1：费用账单） */
    @Schema(title = "账单类型")
    private Integer billType;

    /** 账单月份（yyyy-MM） */
    @Schema(title = "账单月份")
    private String billMonth;

    /** 账单开始时间 */
    @Schema(title = "账单开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime billStartTime;

    /** 账单结束时间 */
    @Schema(title = "账单结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime billEndTime;

    /** 账单天数 */
    @Schema(title = "账单天数")
    private Integer totalDays;

    /** 护理等级名称 */
    @Schema(title = "护理等级名称")
    private String lname;

    /** 房型名称 */
    @Schema(title = "房型名称")
    private String typeName;

    /** 每月应付 */
    @Schema(title = "每月应付")
    private java.math.BigDecimal monthCost;

    /** 入住配置ID */
    @Schema(title = "入住配置ID")
    private Long checkInConfigId;

    /** 床位费 */
    @Schema(title = "床位费")
    private java.math.BigDecimal bedCost;

    /** 护理费 */
    @Schema(title = "护理费")
    private java.math.BigDecimal nursingCost;

    /** 其他费用 */
    @Schema(title = "其他费用")
    private java.math.BigDecimal otherCost;

    /** 医保支付 */
    @Schema(title = "医保支付")
    private java.math.BigDecimal medicalInsurancePayment;

    /** 政府补贴 */
    @Schema(title = "政府补贴")
    private java.math.BigDecimal governmentSubsidy;

    /** 本期应付 */
    @Schema(title = "本期应付")
    private BigDecimal currentCost;

    /** 押金 */
    @Schema(title = "押金")
    private BigDecimal depositAmount;

    /** 账单金额 */
    @Schema(title = "账单金额")
    private BigDecimal billAmount;

    /** 预缴款支付 */
    @Schema(title = "预缴款支付")
    private BigDecimal prepaidAmount;

    /** 应付金额 */
    @Schema(title = "应付金额")
    private BigDecimal payableAmount;

    /** 支付状态（0：待支付，1：已支付，2：已关闭） */
    @Schema(title = "支付状态")
    private Integer transactionStatus;

    /** 支付截止时间 */
    @Schema(title = "支付截止时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime paymentDeadline;

    /** 支付时间 */
    @Schema(title = "支付时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime transactionTime;

    /** 创建时间 */
    @Schema(title = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /** 入住配置（各项费用明细） */
    @Schema(title = "入住配置")
    private BillCostVo checkInConfigVo;

    /** 老人信息 */
    @Schema(title = "老人信息")
    private MemberElderVo elderVo;

    /** 支付参数（支付时返回，含 placeOrderJson） */
    @Schema(title = "支付参数")
    private Map<String, Object> tradingVo;
}
