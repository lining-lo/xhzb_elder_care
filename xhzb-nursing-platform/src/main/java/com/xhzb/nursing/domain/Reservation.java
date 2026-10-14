package com.xhzb.nursing.domain;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.xhzb.common.annotation.Excel;
import com.xhzb.common.core.domain.BaseEntity;
import com.xhzb.common.utils.StringUtils;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * 预约信息对象 reservation
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@Data
@Schema(description = "预约信息对象")
public class Reservation extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 主键ID */
    @Schema(title = "主键ID")
    private Long id;

    /** 预约人姓名 */
    @Schema(title = "预约人姓名")
    @Excel(name = "预约人姓名")
    private String name;

    /** 预约人手机号 */
    @Schema(title = "预约人手机号")
    @Excel(name = "预约人手机号")
    private String mobile;

    /**
     * 预约时间
     * 入参：兼容小程序端的 yyyy-MM-dd HH:mm:ss 与标准 ISO 格式
     * 出参：ISO 格式（yyyy-MM-ddTHH:mm:ss），小程序端 new Date() 在 iOS 上也能正常解析
     */
    @Schema(title = "预约时间")
    @JsonDeserialize(using = ReservationDateTimeDeserializer.class)
    @Excel(name = "预约时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime time;

    /** 家人姓名（老人姓名） */
    @Schema(title = "家人姓名（老人姓名）")
    @Excel(name = "家人姓名")
    private String visitor;

    /** 预约类型（0：参观预约，1：探访预约） */
    @Schema(title = "预约类型（0：参观预约，1：探访预约）")
    @Excel(name = "预约类型", readConverterExp = "0=：参观预约，1=探访预约")
    private Integer type;

    /** 预约状态（0：待上门，1：已完成，2：已取消，3：已过期） */
    @Schema(title = "预约状态（0：待上门，1：已完成，2：已取消，3：已过期）")
    @Excel(name = "预约状态", readConverterExp = "0=：待上门，1=已完成，2=已取消，3=已过期")
    private Integer status;

    /** 到院时间 */
    @Schema(title = "到院时间")
    @JsonDeserialize(using = ReservationDateTimeDeserializer.class)
    @Excel(name = "到院时间", width = 30, dateFormat = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime arriveTime;

    /**
     * 预约时间反序列化器
     * 小程序端传 yyyy-MM-dd HH:mm:ss，框架默认按 ISO 格式处理，这里两种格式都兼容
     */
    public static class ReservationDateTimeDeserializer extends JsonDeserializer<LocalDateTime>
    {
        private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        @Override
        public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException
        {
            String text = p.getText();
            if (StringUtils.isEmpty(text))
            {
                return null;
            }
            text = text.trim();
            return text.contains("T") ? LocalDateTime.parse(text) : LocalDateTime.parse(text, DATE_TIME_FORMATTER);
        }
    }
}
