package com.xhzb.nursing.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import com.xhzb.common.core.domain.BaseEntity;

/**
 * 护理员老人关联对象 nursing_elder
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "护理员老人关联对象")
public class NursingElder extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 护理员ID（sys_user.user_id） */
    @Schema(title = "护理员ID")
    private Long nursingId;

    /** 老人ID（elder.id） */
    @Schema(title = "老人ID")
    private Long elderId;
}
