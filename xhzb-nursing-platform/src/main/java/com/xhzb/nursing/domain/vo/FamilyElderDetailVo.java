package com.xhzb.nursing.domain.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 家人列表详细信息（小程序「查看家人列表」使用）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "家人列表详细信息")
public class FamilyElderDetailVo
{
    /** 绑定关系ID */
    @Schema(title = "绑定关系ID")
    private String mid;

    /** 称呼 */
    @Schema(title = "称呼")
    private String mremark;

    /** 老人ID */
    @Schema(title = "老人ID")
    private String elderId;

    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String name;

    /** 老人头像 */
    @Schema(title = "老人头像")
    private String image;

    /** 床位编号 */
    @Schema(title = "床位编号")
    private String bedNumber;

    /** 房型名称 */
    @Schema(title = "房型名称")
    private String typeName;

    /** 设备ID */
    @Schema(title = "设备ID")
    private String iotId;

    /** 设备名称 */
    @Schema(title = "设备名称")
    private String deviceName;

    /** 产品key */
    @Schema(title = "产品key")
    private String productKey;
}
