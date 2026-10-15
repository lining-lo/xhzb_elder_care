package com.xhzb.nursing.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xhzb.common.core.domain.entity.SysUser;
import com.xhzb.nursing.domain.NursingElder;

/**
 * 护理员老人关联Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Mapper
public interface NursingElderMapper extends BaseMapper<NursingElder>
{
    /**
     * 根据老人ID查询护理员（负责老人页面查询床位护理员使用）
     *
     * @param elderId 老人ID
     * @return 护理员列表
     */
    public List<SysUser> selectUserByElderId(Long elderId);
}
