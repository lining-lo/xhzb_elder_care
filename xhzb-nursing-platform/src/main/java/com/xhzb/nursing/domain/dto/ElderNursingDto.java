package com.xhzb.nursing.domain.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 设置护理员请求对象
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "设置护理员请求参数")
public class ElderNursingDto
{
    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 护理员ID列表 */
    @Schema(title = "护理员ID列表")
    private List<Long> nursingIds;
}
