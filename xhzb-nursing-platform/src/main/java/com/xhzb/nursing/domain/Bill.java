package com.xhzb.nursing.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.xhzb.common.core.domain.BaseEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 费用账单对象 bill
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "费用账单对象")
public class Bill extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 账单编号 */
    @Schema(title = "账单编号")
    private String billNo;

    /** 账单类型（0：月度账单，1：费用账单） */
    @Schema(title = "账单类型（0：月度账单，1：费用账单）")
    private Integer billType;

    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 入住配置ID */
    @Schema(title = "入住配置ID")
    private Long checkInConfigId;

    /** 小程序用户ID */
    @Schema(title = "小程序用户ID")
    private Long familyMemberId;

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

    /** 床位费 */
    @Schema(title = "床位费")
    private BigDecimal bedCost;

    /** 护理费 */
    @Schema(title = "护理费")
    private BigDecimal nursingCost;

    /** 其他费用 */
    @Schema(title = "其他费用")
    private BigDecimal otherCost;

    /** 医保支付 */
    @Schema(title = "医保支付")
    private BigDecimal medicalInsurancePayment;

    /** 政府补贴 */
    @Schema(title = "政府补贴")
    private BigDecimal governmentSubsidy;

    /** 每月应付 */
    @Schema(title = "每月应付")
    private BigDecimal monthCost;

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
    @Schema(title = "支付状态（0：待支付，1：已支付，2：已关闭）")
    private Integer transactionStatus;

    /** 支付截止时间 */
    @Schema(title = "支付截止时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime paymentDeadline;

    /** 支付时间 */
    @Schema(title = "支付时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime transactionTime;
}
