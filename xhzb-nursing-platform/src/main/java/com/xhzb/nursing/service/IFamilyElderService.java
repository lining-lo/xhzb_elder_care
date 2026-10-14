package com.xhzb.nursing.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.FamilyElder;
import com.xhzb.nursing.domain.dto.ElderBindingDto;
import com.xhzb.nursing.domain.vo.FamilyElderDetailVo;
import com.xhzb.nursing.domain.vo.FamilyElderVo;

/**
 * 家属老人绑定Service接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public interface IFamilyElderService extends IService<FamilyElder>
{
    /**
     * 小程序绑定家人
     *
     * @param elderBindingDto 绑定家人参数
     * @return 结果
     */
    public int bindElder(ElderBindingDto elderBindingDto);

    /**
     * 查询当前登录用户绑定的家人列表
     *
     * @return 家人列表
     */
    public List<FamilyElderVo> selectMyElderList();

    /**
     * 查询当前登录用户绑定的家人列表（分页，包含老人床位、房型、设备信息）
     *
     * @return 家人列表
     */
    public List<FamilyElderDetailVo> selectMyElderDetailList();

    /**
     * 小程序解绑家人
     *
     * @param id 绑定关系ID
     * @return 结果
     */
    public int unbindElder(Long id);
}
