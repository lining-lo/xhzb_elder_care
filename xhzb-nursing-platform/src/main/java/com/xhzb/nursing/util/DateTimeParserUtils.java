package com.xhzb.nursing.util;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.StringUtils;

/**
 * 小程序端时间解析工具
 * 兼容 yyyy-MM-dd HH:mm:ss、ISO 格式以及前端日期对象序列化后的带时区格式
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public class DateTimeParserUtils
{
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private static final DateTimeFormatter TIME_FORMATTER_SECOND = DateTimeFormatter.ofPattern("HH:mm:ss");

    private static final DateTimeFormatter TIME_FORMATTER_MINUTE = DateTimeFormatter.ofPattern("HH:mm");

    private DateTimeParserUtils()
    {
    }

    /**
     * 解析日期时间
     *
     * @param text 时间字符串
     * @param defaultValue 为空时的默认值（也允许为 null，此时为空会报错）
     * @return 解析结果
     */
    public static LocalDateTime parseDateTime(String text, LocalDateTime defaultValue)
    {
        if (StringUtils.isEmpty(text))
        {
            if (defaultValue == null)
            {
                throw new ServiceException("时间不能为空");
            }
            return defaultValue;
        }
        String value = text.trim();
        try
        {
            return OffsetDateTime.parse(value).atZoneSameInstant(ZoneId.systemDefault()).toLocalDateTime();
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalDateTime.parse(value.length() > 19 ? value.substring(0, 19) : value);
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalDateTime.parse(value, DATE_TIME_FORMATTER);
        }
        catch (DateTimeParseException e)
        {
            throw new ServiceException("时间格式不正确：" + value);
        }
    }

    /**
     * 解析时间点（HH:mm 或 HH:mm:ss）
     *
     * @param text 时间字符串
     * @return 解析结果，无法解析时返回 null
     */
    public static LocalTime parseTime(String text)
    {
        if (StringUtils.isEmpty(text))
        {
            return null;
        }
        String value = text.trim();
        try
        {
            return LocalTime.parse(value, TIME_FORMATTER_SECOND);
        }
        catch (DateTimeParseException ignored)
        {
        }
        try
        {
            return LocalTime.parse(value, TIME_FORMATTER_MINUTE);
        }
        catch (DateTimeParseException e)
        {
            return null;
        }
    }
}
