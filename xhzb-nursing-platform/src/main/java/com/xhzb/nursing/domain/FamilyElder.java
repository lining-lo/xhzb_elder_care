package com.xhzb.nursing.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import com.xhzb.common.core.domain.BaseEntity;

/**
 * 家属老人绑定对象 family_elder
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "家属老人绑定对象")
public class FamilyElder extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 家属ID（family_member.id） */
    @Schema(title = "家属ID")
    private Long familyMemberId;

    /** 老人ID（elder.id） */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 称呼 */
    @Schema(title = "称呼")
    private String remark;
}
