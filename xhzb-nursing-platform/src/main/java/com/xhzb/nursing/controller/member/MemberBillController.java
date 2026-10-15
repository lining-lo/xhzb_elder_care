package com.xhzb.nursing.controller.member;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.nursing.service.IBillService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 小程序端账单Controller
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@RestController
@RequestMapping("/member/bill")
@Tag(name = "小程序-账单相关接口")
public class MemberBillController extends BaseController
{
    @Autowired
    private IBillService billService;

    /**
     * 分页查询账单列表
     */
    @GetMapping("/page/")
    @Operation(summary = "分页查询账单列表")
    public AjaxResult page(@RequestParam(value = "pageNum", defaultValue = "1") long pageNum,
                           @RequestParam(value = "pageSize", defaultValue = "10") long pageSize,
                           @RequestParam(value = "transactionStatus", required = false) Integer transactionStatus,
                           @RequestParam(value = "elderId", required = false) Long elderId)
    {
        return success(billService.selectMemberBillPage(pageNum, pageSize, transactionStatus, elderId));
    }

    /**
     * 查询账单详情
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询账单详情")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return success(billService.selectMemberBillById(id));
    }

    /**
     * 账单支付（返回支付参数）
     */
    @PutMapping
    @Operation(summary = "账单支付")
    public AjaxResult pay(@RequestBody Map<String, Object> body)
    {
        Object id = body.get("id");
        if (id == null)
        {
            return error("账单ID不能为空");
        }
        return success(billService.payBill(Long.valueOf(String.valueOf(id))));
    }

    /**
     * 账单支付回调
     */
    @PostMapping("/payNotify")
    @Operation(summary = "账单支付回调")
    public AjaxResult payNotify(@RequestParam("billId") Long billId)
    {
        return toAjax(billService.payNotify(billId));
    }
}
