package com.xhzb.nursing.controller.member;

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
import com.xhzb.common.utils.StringUtils;
import com.xhzb.nursing.domain.dto.ElderBindingDto;
import com.xhzb.nursing.domain.dto.UserLoginRequestDto;
import com.xhzb.nursing.domain.vo.LoginVo;
import com.xhzb.nursing.service.IDeviceDataService;
import com.xhzb.nursing.service.IFamilyElderService;
import com.xhzb.nursing.service.IFamilyMemberService;

import java.util.Map;
import java.util.Objects;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * 老人家属Controller
 *
 * @author ruoyi
 * @date 2024-09-02
 */
@RestController
@RequestMapping("/member/user")
@Tag(name = "老人家属相关接口")
public class FamilyMemberController extends BaseController {
    @Autowired
    private IFamilyMemberService familyMemberService;

    @Autowired
    private IFamilyElderService familyElderService;

    @Autowired
    private IDeviceDataService deviceDataService;

    @PostMapping("/login")
    @Operation(summary = "小程序登录")
    public AjaxResult login(@RequestBody UserLoginRequestDto userLoginRequestDto) {
        LoginVo loginVo = familyMemberService.login(userLoginRequestDto);
        return success(loginVo);
    }

    /**
     * 绑定家人
     */
    @PostMapping("/add")
    @Operation(summary = "绑定家人")
    public AjaxResult add(@RequestBody ElderBindingDto elderBindingDto) {
        return toAjax(familyElderService.bindElder(elderBindingDto));
    }

    /**
     * 查询家人列表
     */
    @GetMapping("/my")
    @Operation(summary = "查询家人列表")
    public AjaxResult my() {
        return success(familyElderService.selectMyElderList());
    }

    /**
     * 分页查询家人列表
     */
    @GetMapping("/list-by-page")
    @Operation(summary = "分页查询家人列表")
    public AjaxResult listByPage() {
        startPage();
        return success(familyElderService.selectMyElderDetailList());
    }

    /**
     * 解绑家人
     */
    @DeleteMapping("/deleteById")
    @Operation(summary = "解绑家人")
    public AjaxResult deleteById(@Schema(name = "绑定关系ID", requiredMode = Schema.RequiredMode.REQUIRED)
                                @RequestParam("id") Long id) {
        return toAjax(familyElderService.unbindElder(id));
    }

    /**
     * 查询健康数据（设备每个功能最新上报的数据）
     */
    @GetMapping("/queryServiceProperties/{iotId}")
    @Operation(summary = "查询健康数据")
    public AjaxResult queryServiceProperties(@Schema(name = "设备ID", requiredMode = Schema.RequiredMode.REQUIRED)
                                             @PathVariable("iotId") String iotId) {
        return success(deviceDataService.selectLatestPropertyList(iotId));
    }

    /**
     * 按天统计查询指标数据
     */
    @GetMapping("/queryDeviceDataListByDay")
    @Operation(summary = "按天统计查询指标数据")
    public AjaxResult queryDeviceDataListByDay(@RequestParam("iotId") String iotId,
                                               @RequestParam("functionId") String functionId,
                                               @RequestParam(value = "startTime", required = false) Long startTime,
                                               @RequestParam(value = "endTime", required = false) Long endTime) {
        return success(deviceDataService.selectDataListByDay(iotId, functionId, startTime, endTime));
    }

    /**
     * 按周统计查询指标数据
     */
    @GetMapping("/queryDeviceDataListByWeek")
    @Operation(summary = "按周统计查询指标数据")
    public AjaxResult queryDeviceDataListByWeek(@RequestParam("iotId") String iotId,
                                                @RequestParam("functionId") String functionId,
                                                @RequestParam(value = "startTime", required = false) Long startTime,
                                                @RequestParam(value = "endTime", required = false) Long endTime) {
        return success(deviceDataService.selectDataListByWeek(iotId, functionId, startTime, endTime));
    }

    /**
     * 分页查询设备上报数据（健康数据明细）
     */
    @GetMapping("/pageQueryAlertData")
    @Operation(summary = "分页查询设备上报数据")
    public AjaxResult pageQueryAlertData(@RequestParam(value = "pageNum", defaultValue = "1") long pageNum,
                                         @RequestParam(value = "pageSize", defaultValue = "10") long pageSize,
                                         @RequestParam(value = "iotId", required = false) String iotId,
                                         @RequestParam(value = "functionId", required = false) String functionId,
                                         @RequestParam(value = "startTime", required = false) Long startTime,
                                         @RequestParam(value = "endTime", required = false) Long endTime)
    {
        return success(deviceDataService.selectDeviceDataPage(pageNum, pageSize, iotId, functionId, startTime, endTime));
    }

    /**
     * 查询设备属性（设备最新上报的属性值）
     */
    @PostMapping("/QueryDevicePropertyStatus")
    @Operation(summary = "查询设备属性")
    public AjaxResult queryDevicePropertyStatus(@RequestBody(required = false) Map<String, Object> body,
                                                @RequestParam(value = "iotId", required = false) String iotId)
    {
        String deviceId = iotId;
        if (StringUtils.isEmpty(deviceId) && Objects.nonNull(body))
        {
            Object value = body.getOrDefault("iotId", body.get("deviceId"));
            deviceId = Objects.isNull(value) ? null : String.valueOf(value);
        }
        return success(deviceDataService.selectLatestPropertyList(deviceId));
    }
}
