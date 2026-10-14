package com.xhzb.nursing.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xhzb.nursing.domain.FamilyElder;
import com.xhzb.nursing.domain.vo.FamilyElderDetailVo;
import com.xhzb.nursing.domain.vo.FamilyElderVo;

/**
 * 家属老人绑定Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Mapper
public interface FamilyElderMapper extends BaseMapper<FamilyElder>
{
    /**
     * 查询家属绑定的家人列表
     *
     * @param familyMemberId 家属ID
     * @return 家人列表
     */
    public List<FamilyElderVo> selectFamilyElderList(@Param("familyMemberId") Long familyMemberId);

    /**
     * 查询家属绑定的家人列表（包含老人床位、房型、设备信息）
     *
     * @param familyMemberId 家属ID
     * @return 家人列表
     */
    public List<FamilyElderDetailVo> selectFamilyElderDetailList(@Param("familyMemberId") Long familyMemberId);
}
