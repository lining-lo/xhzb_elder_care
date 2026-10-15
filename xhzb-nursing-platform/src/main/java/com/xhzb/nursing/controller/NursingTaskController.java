package com.xhzb.nursing.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.common.core.page.TableDataInfo;
import com.xhzb.nursing.domain.dto.NursingTaskOperateDto;
import com.xhzb.nursing.domain.dto.NursingTaskQueryDto;
import com.xhzb.nursing.domain.vo.NursingTaskVo;
import com.xhzb.nursing.service.INursingTaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 护理任务Controller（任务安排）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@RestController
@RequestMapping("/nursing/nursingTask")
@Tag(name = "护理任务相关接口")
public class NursingTaskController extends BaseController
{
    @Autowired
    private INursingTaskService nursingTaskService;

    /**
     * 查询护理任务列表
     */
    @GetMapping("/list")
    @Operation(summary = "查询护理任务列表")
    public TableDataInfo list(NursingTaskQueryDto query)
    {
        startPage();
        List<NursingTaskVo> list = nursingTaskService.selectNursingTaskList(query);
        return getDataTable(list);
    }

    /**
     * 查询护理任务详情
     */
    @GetMapping("/{id}")
    @Operation(summary = "查询护理任务详情")
    public AjaxResult getInfo(@Schema(name = "护理任务ID", requiredMode = Schema.RequiredMode.REQUIRED)
                              @PathVariable("id") Long id)
    {
        return success(nursingTaskService.selectNursingTaskById(id));
    }

    /**
     * 取消护理任务
     */
    @PutMapping("/cancel")
    @Operation(summary = "取消护理任务")
    public AjaxResult cancel(@RequestBody NursingTaskOperateDto operateDto)
    {
        return toAjax(nursingTaskService.cancelNursingTask(operateDto));
    }

    /**
     * 执行护理任务
     */
    @PutMapping("/do")
    @Operation(summary = "执行护理任务")
    public AjaxResult doTask(@RequestBody NursingTaskOperateDto operateDto)
    {
        return toAjax(nursingTaskService.executeNursingTask(operateDto));
    }

    /**
     * 修改护理任务的期望服务时间（改期）
     */
    @PutMapping("/updateTime")
    @Operation(summary = "修改护理任务的期望服务时间")
    public AjaxResult updateTime(@RequestBody NursingTaskOperateDto operateDto)
    {
        return toAjax(nursingTaskService.updateNursingTaskTime(operateDto));
    }
}
