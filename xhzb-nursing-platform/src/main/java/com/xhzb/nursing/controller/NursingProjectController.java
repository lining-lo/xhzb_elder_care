package com.xhzb.nursing.controller;

import java.util.List;

import com.xhzb.common.core.domain.R;
import com.xhzb.nursing.domain.NursingProjectVo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.xhzb.common.annotation.Log;
import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.common.enums.BusinessType;
import com.xhzb.nursing.domain.NursingProject;
import com.xhzb.nursing.service.INursingProjectService;
import com.xhzb.common.utils.poi.ExcelUtil;
import com.xhzb.common.core.page.TableDataInfo;

/**
 * 护理项目Controller
 *
 * @author lining
 * @date 2026-09-30
 */
@Tag(name = "护理项目")
@RestController
@RequestMapping("/nursing/project")
public class NursingProjectController extends BaseController {
    @Autowired
    private INursingProjectService nursingProjectService;

    /**
     * 查询护理项目列表
     */
    @Operation(summary = "查询护理项目列表")
    @PreAuthorize("@ss.hasPermi('nursing:project:list')")
    @GetMapping("/list")
    public TableDataInfo list(NursingProject nursingProject) {
        startPage();
        List<NursingProject> list = nursingProjectService.selectNursingProjectList(nursingProject);
        return getDataTable(list);
    }

    /**
     * 导出护理项目列表
     */
    @Operation(summary = "导出护理项目列表")
    @PreAuthorize("@ss.hasPermi('nursing:project:export')")
    @Log(title = "护理项目", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, NursingProject nursingProject) {
        List<NursingProject> list = nursingProjectService.selectNursingProjectList(nursingProject);
        ExcelUtil<NursingProject> util = new ExcelUtil<NursingProject>(NursingProject.class);
        util.exportExcel(response, list, "护理项目数据");
    }

    /**
     * 获取护理项目详细信息
     */
    @Operation(summary = "获取护理项目详细信息")
    @PreAuthorize("@ss.hasPermi('nursing:project:query')")
    @GetMapping(value = "/{id}")
    public R<NursingProject> getInfo(@Parameter(description = "护理项目ID") @PathVariable("id") Long id) {
        return R.ok(nursingProjectService.selectNursingProjectById(id));
    }

    /**
     * 新增护理项目
     */
    @Operation(summary = "新增护理项目")
    @PreAuthorize("@ss.hasPermi('nursing:project:add')")
    @Log(title = "护理项目", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@Parameter(description = "护理项目实体") @RequestBody NursingProject nursingProject) {
        return toAjax(nursingProjectService.insertNursingProject(nursingProject));
    }

    /**
     * 修改护理项目
     */
    @Operation(summary = "修改护理项目")
    @PreAuthorize("@ss.hasPermi('nursing:project:edit')")
    @Log(title = "护理项目", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@Parameter(description = "护理项目实体") @RequestBody NursingProject nursingProject) {
        return toAjax(nursingProjectService.updateNursingProject(nursingProject));
    }

    /**
     * 删除护理项目
     */
    @Operation(summary = "删除护理项目")
    @PreAuthorize("@ss.hasPermi('nursing:project:remove')")
    @Log(title = "护理项目", businessType = BusinessType.DELETE)
    @DeleteMapping("/{ids}")
    public AjaxResult remove(@Parameter(description = "护理项目ID列表") @PathVariable Long[] ids) {
        return toAjax(nursingProjectService.deleteNursingProjectByIds(ids));
    }

    /**
     * 查询护理项目列表
     */
    @GetMapping("/all")
    public AjaxResult listAll()
    {
        List<NursingProjectVo> list = nursingProjectService.selectAll();
        return success(list);
    }
}