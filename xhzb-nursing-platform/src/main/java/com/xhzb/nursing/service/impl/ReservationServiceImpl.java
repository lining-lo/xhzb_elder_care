package com.xhzb.nursing.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.nursing.constants.SystemConstants;
import com.xhzb.nursing.domain.Reservation;
import com.xhzb.nursing.domain.vo.ReservationTimeCountVo;
import com.xhzb.nursing.mapper.ReservationMapper;
import com.xhzb.nursing.service.IReservationService;

/**
 * 预约信息Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@Service
public class ReservationServiceImpl extends ServiceImpl<ReservationMapper, Reservation> implements IReservationService
{
    /** 预约状态：待上门 */
    private static final Integer STATUS_WAIT = 0;

    /** 预约状态：已取消 */
    private static final Integer STATUS_CANCELLED = 2;

    /** 预约类型：参观预约 */
    private static final Integer TYPE_VISIT = 0;

    @Autowired
    private ReservationMapper reservationMapper;

    /**
     * 查询预约信息列表
     *
     * @param reservation 预约信息
     * @return 预约信息集合
     */
    @Override
    public List<Reservation> selectReservationList(Reservation reservation)
    {
        return reservationMapper.selectReservationList(reservation);
    }

    /**
     * 查询预约信息
     *
     * @param id 预约信息主键
     * @return 预约信息
     */
    @Override
    public Reservation selectReservationById(Long id)
    {
        return getById(id);
    }

    /**
     * 小程序新增预约
     *
     * @param reservation 预约信息
     * @return 结果
     */
    @Override
    public int insertReservation(Reservation reservation)
    {
        Long userId = currentUserId();

        if (Objects.isNull(reservation.getTime()))
        {
            throw new ServiceException("预约时间不能为空");
        }
        if (reservation.getTime().isBefore(LocalDateTime.now()))
        {
            throw new ServiceException("预约时间需大于当前时间");
        }
        // 当天取消预约次数达到上限后不允许再预约
        if (countCancelledToday(userId) >= SystemConstants.RESERVATION_CANCEL_LIMIT)
        {
            throw new ServiceException("今日取消预约次数已达上限，当天无法再次预约");
        }

        Integer type = Objects.isNull(reservation.getType()) ? TYPE_VISIT : reservation.getType();
        // 参观预约需要判断该时间段剩余预约次数
        if (TYPE_VISIT.equals(type) && bookedCount(reservation.getTime(), type) >= SystemConstants.RESERVATION_TIME_CAPACITY)
        {
            throw new ServiceException("该时间段预约已满，请选择其他时间");
        }

        reservation.setId(null);
        reservation.setType(type);
        reservation.setStatus(STATUS_WAIT);
        reservation.setCreateBy(String.valueOf(userId));
        return save(reservation) ? 1 : 0;
    }

    /**
     * 小程序取消预约
     *
     * @param id 预约信息主键
     * @return 结果
     */
    @Override
    public int cancelReservation(Long id)
    {
        Reservation reservation = getById(id);
        if (Objects.isNull(reservation))
        {
            throw new ServiceException("预约信息不存在");
        }

        Long userId = currentUserId();
        if (!String.valueOf(userId).equals(reservation.getCreateBy()))
        {
            throw new ServiceException("只能取消本人的预约");
        }
        if (!STATUS_WAIT.equals(reservation.getStatus()))
        {
            throw new ServiceException("当前预约状态不允许取消");
        }

        reservation.setStatus(STATUS_CANCELLED);
        reservation.setUpdateBy(String.valueOf(userId));
        return updateById(reservation) ? 1 : 0;
    }

    /**
     * 查询当前登录用户当天取消预约的次数
     *
     * @return 取消预约次数
     */
    @Override
    public int countCancelledToday()
    {
        return countCancelledToday(currentUserId());
    }

    /**
     * 查询每个时间段剩余预约次数
     *
     * @param time 查询的日期（时间戳，为空时查询当天）
     * @return 时间段剩余预约次数
     */
    @Override
    public List<ReservationTimeCountVo> selectTimeCountList(Long time)
    {
        LocalDate date = Objects.isNull(time) ? LocalDate.now()
                : Instant.ofEpochMilli(time).atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDateTime startTime = date.atStartOfDay();
        return reservationMapper.selectTimeCountList(startTime, startTime.plusDays(1), TYPE_VISIT, STATUS_CANCELLED,
                SystemConstants.RESERVATION_TIME_CAPACITY);
    }

    /**
     * 查询指定用户当天取消预约的次数（按取消时间统计）
     *
     * @param userId 用户ID
     * @return 取消预约次数
     */
    private int countCancelledToday(Long userId)
    {
        LocalDateTime startTime = LocalDate.now().atStartOfDay();
        Long count = reservationMapper.selectCount(Wrappers.<Reservation>lambdaQuery()
                .eq(Reservation::getCreateBy, String.valueOf(userId))
                .eq(Reservation::getStatus, STATUS_CANCELLED)
                .ge(Reservation::getUpdateTime, startTime)
                .lt(Reservation::getUpdateTime, startTime.plusDays(1)));
        return count.intValue();
    }

    /**
     * 查询指定时间段已预约的数量（不包含已取消的预约）
     *
     * @param time 预约时间
     * @param type 预约类型
     * @return 已预约数量
     */
    private Long bookedCount(LocalDateTime time, Integer type)
    {
        return reservationMapper.selectCount(Wrappers.<Reservation>lambdaQuery()
                .eq(Reservation::getTime, time)
                .eq(Reservation::getType, type)
                .ne(Reservation::getStatus, STATUS_CANCELLED));
    }

    /**
     * 获取当前登录的小程序用户ID
     *
     * @return 用户ID
     */
    private Long currentUserId()
    {
        Long userId = UserThreadLocal.getUserId();
        if (Objects.isNull(userId))
        {
            throw new ServiceException("认证失败");
        }
        return userId;
    }
}
