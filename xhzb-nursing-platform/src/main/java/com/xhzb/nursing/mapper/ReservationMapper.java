package com.xhzb.nursing.mapper;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xhzb.nursing.domain.Reservation;
import com.xhzb.nursing.domain.vo.ReservationTimeCountVo;

/**
 * 预约信息Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@Mapper
public interface ReservationMapper extends BaseMapper<Reservation>
{
    /**
     * 查询预约信息列表
     *
     * @param reservation 预约信息
     * @return 预约信息集合
     */
    public List<Reservation> selectReservationList(Reservation reservation);

    /**
     * 查询时间段已经预约的数量（用于计算剩余预约次数）
     *
     * @param startTime 时间段开始时间
     * @param endTime 时间段结束时间
     * @param type 预约类型
     * @param cancelStatus 已取消的预约状态（统计时排除）
     * @param capacity 每个时间段的最大预约次数
     * @return 剩余预约数量
     */
    public List<ReservationTimeCountVo> selectTimeCountList(@Param("startTime") LocalDateTime startTime,
                                                            @Param("endTime") LocalDateTime endTime,
                                                            @Param("type") Integer type,
                                                            @Param("cancelStatus") Integer cancelStatus,
                                                            @Param("capacity") Integer capacity);
}
