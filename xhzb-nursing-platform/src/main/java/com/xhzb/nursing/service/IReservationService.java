package com.xhzb.nursing.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.Reservation;
import com.xhzb.nursing.domain.vo.ReservationTimeCountVo;

/**
 * 预约信息Service接口
 *
 * @author ruoyi
 * @date 2026-10-14
 */
public interface IReservationService extends IService<Reservation>
{
    /**
     * 查询预约信息列表
     *
     * @param reservation 预约信息
     * @return 预约信息集合
     */
    public List<Reservation> selectReservationList(Reservation reservation);

    /**
     * 查询预约信息
     *
     * @param id 预约信息主键
     * @return 预约信息
     */
    public Reservation selectReservationById(Long id);

    /**
     * 小程序新增预约
     *
     * @param reservation 预约信息
     * @return 结果
     */
    public int insertReservation(Reservation reservation);

    /**
     * 小程序取消预约
     *
     * @param id 预约信息主键
     * @return 结果
     */
    public int cancelReservation(Long id);

    /**
     * 查询当前登录用户当天取消预约的次数
     *
     * @return 取消预约次数
     */
    public int countCancelledToday();

    /**
     * 查询每个时间段剩余预约次数
     *
     * @param time 查询的日期（时间戳，为空时查询当天）
     * @return 时间段剩余预约次数
     */
    public List<ReservationTimeCountVo> selectTimeCountList(Long time);
}
