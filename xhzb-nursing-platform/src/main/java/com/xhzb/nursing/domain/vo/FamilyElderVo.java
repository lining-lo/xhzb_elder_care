package com.xhzb.nursing.domain.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 家人列表信息（小程序「查询家人列表」使用）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "家人列表信息")
public class FamilyElderVo
{
    /** 绑定关系ID */
    @Schema(title = "绑定关系ID")
    private Long id;

    /** 家属ID */
    @Schema(title = "家属ID")
    private Long familyMemberId;

    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String elderName;
}
