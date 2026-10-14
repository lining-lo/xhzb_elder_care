package com.xhzb.nursing.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序绑定家人请求对象
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "绑定家人请求参数")
public class ElderBindingDto
{
    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String name;

    /** 身份证号 */
    @Schema(title = "身份证号")
    private String idCard;

    /** 称呼 */
    @Schema(title = "称呼")
    private String remark;
}
