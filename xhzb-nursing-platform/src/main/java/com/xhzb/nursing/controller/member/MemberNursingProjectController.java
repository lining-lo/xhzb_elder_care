package com.xhzb.nursing.controller.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.nursing.domain.NursingProject;
import com.xhzb.nursing.service.INursingProjectService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 小程序端服务项Controller
 *
 * @author ruoyi
 * @date 2026-10-14
 */
@RestController
@RequestMapping("/member/orders/project")
@Tag(name = "小程序-服务项相关接口")
public class MemberNursingProjectController extends BaseController
{
    @Autowired
    private INursingProjectService nursingProjectService;

    /**
     * 分页查询护理项目列表
     */
    @GetMapping("/page")
    @Operation(summary = "分页查询护理项目列表")
    public AjaxResult page(NursingProject nursingProject)
    {
        startPage();
        List<NursingProject> list = nursingProjectService.selectNursingProjectList(nursingProject);
        return success(getDataTable(list));
    }

    /**
     * 根据编号查询护理项目信息
     */
    @GetMapping("/{id}")
    @Operation(summary = "根据编号查询护理项目信息")
    public AjaxResult getInfo(@Schema(name = "护理项目ID", requiredMode = Schema.RequiredMode.REQUIRED)
            @PathVariable("id") Long id)
    {
        return success(nursingProjectService.selectNursingProjectById(id));
    }
}
