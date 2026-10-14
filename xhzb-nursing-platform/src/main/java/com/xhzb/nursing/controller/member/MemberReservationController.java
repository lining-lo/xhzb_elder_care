package com.xhzb.nursing.controller.member;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.nursing.domain.Reservation;
import com.xhzb.nursing.service.IReservationService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 小程序端参观预约Controller
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@RestController
@RequestMapping("/member/reservation")
@Tag(name = "小程序-参观预约相关接口")
public class MemberReservationController extends BaseController
{
    @Autowired
    private IReservationService reservationService;

    /**
     * 查询取消预约数量（当天取消预约次数达到3次后，当天不能再预约）
     */
    @GetMapping("/cancelled-count")
    @Operation(summary = "查询取消预约数量")
    public AjaxResult cancelledCount()
    {
        return success(reservationService.countCancelledToday());
    }

    /**
     * 查询每个时间段剩余预约次数
     */
    @GetMapping("/countByTime")
    @Operation(summary = "查询每个时间段剩余预约次数")
    public AjaxResult countByTime(@RequestParam(value = "time", required = false) Long time)
    {
        return success(reservationService.selectTimeCountList(time));
    }

    /**
     * 新增预约
     */
    @PostMapping(value = { "", "/" })
    @Operation(summary = "新增预约")
    public AjaxResult add(@RequestBody Reservation reservation)
    {
        return toAjax(reservationService.insertReservation(reservation));
    }

    /**
     * 分页查询预约（只查询当前登录用户的预约）
     */
    @GetMapping("/page")
    @Operation(summary = "分页查询预约")
    public AjaxResult page(Reservation reservation)
    {
        if (Objects.nonNull(UserThreadLocal.getUserId()))
        {
            reservation.setCreateBy(String.valueOf(UserThreadLocal.getUserId()));
        }
        startPage();
        List<Reservation> list = reservationService.selectReservationList(reservation);
        return success(getDataTable(list));
    }

    /**
     * 取消预约
     */
    @PutMapping("/{id}/cancel")
    @Operation(summary = "取消预约")
    public AjaxResult cancel(@Schema(name = "预约信息ID", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("id") Long id)
    {
        return toAjax(reservationService.cancelReservation(id));
    }
}
