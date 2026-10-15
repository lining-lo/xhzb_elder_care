package com.xhzb.nursing.controller.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.nursing.service.IContractService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 小程序端合同Controller
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@RestController
@RequestMapping("/member/contract")
@Tag(name = "小程序-合同相关接口")
public class MemberContractController extends BaseController
{
    @Autowired
    private IContractService contractService;

    /**
     * 分页查询合同列表（当前登录用户绑定的老人）
     */
    @GetMapping("/list")
    @Operation(summary = "分页查询合同列表")
    public AjaxResult list(@RequestParam(value = "pageNum", defaultValue = "1") long pageNum,
                           @RequestParam(value = "pageSize", defaultValue = "10") long pageSize)
    {
        return success(contractService.selectMemberContractPage(pageNum, pageSize));
    }
}
