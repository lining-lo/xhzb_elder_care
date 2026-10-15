package com.xhzb.nursing.domain.vo;

import java.math.BigDecimal;

import com.xhzb.nursing.domain.CheckInConfig;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 账单费用明细（小程序账单页面按 bedCost/nursingCost/... 读取，这里做成别名对象）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "账单费用明细")
public class BillCostVo extends CheckInConfig
{
    private static final long serialVersionUID = 1L;

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
}
