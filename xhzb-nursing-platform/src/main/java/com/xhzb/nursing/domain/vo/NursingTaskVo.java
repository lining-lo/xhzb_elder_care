package com.xhzb.nursing.domain.vo;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 护理任务列表/详情对象
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Data
@Schema(description = "护理任务列表/详情")
public class NursingTaskVo
{
    /** 护理任务ID */
    @Schema(title = "护理任务ID")
    private Long id;

    /** 老人ID */
    @Schema(title = "老人ID")
    private Long elderId;

    /** 老人姓名 */
    @Schema(title = "老人姓名")
    private String elderName;

    /** 床位号 */
    @Schema(title = "床位号")
    private String bedNumber;

    /** 身份证号（详情页计算年龄用） */
    @Schema(title = "身份证号")
    private String idCardNo;

    /** 性别（男/女） */
    @Schema(title = "性别")
    private String sex;

    /** 护理等级名称 */
    @Schema(title = "护理等级名称")
    private String nursingLevelName;

    /** 护理员姓名（老人对应的护理员，可能多个） */
    @Schema(title = "护理员姓名")
    private List<String> nursingName;

    /** 护理项目ID */
    @Schema(title = "护理项目ID")
    private Long projectId;

    /** 护理项目名称 */
    @Schema(title = "护理项目名称")
    private String projectName;

    /** 任务类型（1：护理计划外，2：护理计划内） */
    @Schema(title = "任务类型（1：护理计划外，2：护理计划内）")
    private Integer taskType;

    /** 护理计划ID */
    @Schema(title = "护理计划ID")
    private Long planId;

    /** 期望服务时间 */
    @Schema(title = "期望服务时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime estimatedServerTime;

    /** 实际执行时间 */
    @Schema(title = "实际执行时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime realServerTime;

    /** 执行图片 */
    @Schema(title = "执行图片")
    private String taskImage;

    /** 执行记录 */
    @Schema(title = "执行记录")
    private String mark;

    /** 取消原因 */
    @Schema(title = "取消原因")
    private String cancelReason;

    /** 状态（1：待执行，2：已执行，3：已取消） */
    @Schema(title = "状态（1：待执行，2：已执行，3：已取消）")
    private Integer status;

    /** 处理人（执行人/取消人） */
    @Schema(title = "处理人")
    private String updater;

    /** 创建时间 */
    @Schema(title = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;

    /** 更新时间 */
    @Schema(title = "更新时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;

    /** 备注 */
    @Schema(title = "备注")
    private String remark;
}
