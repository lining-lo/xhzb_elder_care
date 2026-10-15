package com.xhzb.nursing.domain.vo;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 小程序端合同信息
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "小程序端合同信息")
public class MemberContractVo
{
    /** 合同ID */
    @Schema(title = "合同ID")
    private Long id;

    /** 合同编号 */
    @Schema(title = "合同编号")
    private String contractNo;

    /** 合同名称 */
    @Schema(title = "合同名称")
    private String name;

    /** 合同状态（0：待签订，1：已生效，2：已到期，3：已终止） */
    @Schema(title = "合同状态")
    private Integer status;

    /** 签约日期 */
    @Schema(title = "签约日期")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime signDate;

    /** 合同开始时间 */
    @Schema(title = "合同开始时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    /** 合同结束时间 */
    @Schema(title = "合同结束时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    /** 解除日期 */
    @Schema(title = "解除日期")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime releaseDate;

    /** 合同文件地址 */
    @Schema(title = "合同文件地址")
    private String pdfUrl;

    /** 老人信息 */
    @Schema(title = "老人信息")
    private MemberElderVo elderVo;
}
