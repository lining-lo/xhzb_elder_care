package com.xhzb.nursing.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xhzb.common.core.controller.BaseController;
import com.xhzb.common.core.domain.R;
import com.xhzb.common.core.domain.entity.SysUser;
import com.xhzb.nursing.domain.dto.ElderNursingDto;
import com.xhzb.nursing.service.INursingElderService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 护理员老人关联Controller（负责老人）
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@RestController
@RequestMapping("/elder/nursingElder")
@Tag(name = "负责老人相关接口")
public class ElderNursingController extends BaseController
{
    @Autowired
    private INursingElderService nursingElderService;

    /**
     * 设置护理员
     */
    @PostMapping("/setNursing")
    @Operation(summary = "设置护理员")
    public R<Boolean> setNursing(@RequestBody List<ElderNursingDto> elderNursingList)
    {
        return R.ok(nursingElderService.setNursing(elderNursingList));
    }

    /**
     * 查询护理员列表（负责老人-设置护理员的下拉数据）
     */
    @GetMapping("/listNursing")
    @Operation(summary = "查询护理员列表")
    public R<List<SysUser>> listNursing()
    {
        return R.ok(nursingElderService.listNursingUser());
    }
}
