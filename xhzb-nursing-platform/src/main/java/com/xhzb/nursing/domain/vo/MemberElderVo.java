package com.xhzb.nursing.domain.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序端家人信息（合同/订单/账单等接口内嵌使用）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "小程序端家人信息")
public class MemberElderVo
{
    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String name;

    /** 老人头像 */
    @Schema(title = "老人头像")
    private String image;
}
