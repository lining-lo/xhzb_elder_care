package com.xhzb.nursing.controller.member;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.nursing.domain.dto.OrderRefundDto;
import com.xhzb.nursing.service.IProductOrderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 小程序端服务单（订单）Controller
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@RestController
@RequestMapping("/member/orders")
@Tag(name = "小程序-服务单相关接口")
public class MemberOrderController extends BaseController
{
    @Autowired
    private IProductOrderService productOrderService;

    /**
     * 下单前校验
     */
    @PostMapping("/check")
    @Operation(summary = "下单前校验")
    public AjaxResult check(@RequestBody Map<String, Object> body)
    {
        return toAjax(productOrderService.checkOrder(body) ? 1 : 0);
    }

    /**
     * 小程序下单（创建服务单并返回支付参数）
     */
    @PostMapping
    @Operation(summary = "小程序下单")
    public AjaxResult add(@RequestBody Map<String, Object> body)
    {
        return success(productOrderService.createOrder(body));
    }

    /**
     * 支付回调（支付成功后生成计划外护理任务）
     */
    @PostMapping("/payNotify")
    @Operation(summary = "服务单支付回调")
    public AjaxResult payNotify(@RequestParam("orderId") Long orderId)
    {
        return toAjax(productOrderService.payNotify(orderId));
    }

    /**
     * 分页查询服务单
     */
    @GetMapping("/order/page")
    @Operation(summary = "分页查询服务单")
    public AjaxResult page(@RequestParam(value = "pageNum", defaultValue = "1") long pageNum,
                           @RequestParam(value = "pageSize", defaultValue = "10") long pageSize,
                           @RequestParam(value = "status", required = false) Integer status)
    {
        return success(productOrderService.selectMemberOrderPage(pageNum, pageSize, status));
    }

    /**
     * 查询服务单详情
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询服务单详情")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return success(productOrderService.selectMemberOrderById(id));
    }

    /**
     * 取消服务单
     */
    @PostMapping("/{orderId}/cancel")
    @Operation(summary = "取消服务单")
    public AjaxResult cancel(@PathVariable("orderId") Long orderId,
                             @RequestParam(value = "reason", required = false) String reason)
    {
        return toAjax(productOrderService.cancelOrder(orderId, reason));
    }

    /**
     * 删除服务单
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "删除服务单")
    public AjaxResult remove(@PathVariable("id") Long id)
    {
        return toAjax(productOrderService.deleteOrder(id));
    }

    /**
     * 申请退款
     */
    @PostMapping("/refund")
    @Operation(summary = "申请退款")
    public AjaxResult refund(@RequestBody OrderRefundDto refundDto)
    {
        return toAjax(productOrderService.applyRefund(refundDto));
    }
}
