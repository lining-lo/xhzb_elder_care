package com.xhzb.nursing.service;

import java.util.List;

import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.NursingElder;
import com.xhzb.common.core.domain.entity.SysUser;
import com.xhzb.nursing.domain.dto.ElderNursingDto;

/**
 * 护理员老人关联Service接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public interface INursingElderService extends IService<NursingElder>
{
    /**
     * 给老人设置护理员（先清空老人原有的护理员，再保存本次选择的护理员）
     *
     * @param elderNursingList 老人与护理员对应关系
     * @return 结果
     */
    public boolean setNursing(List<ElderNursingDto> elderNursingList);

    /**
     * 查询护理员列表（按「护理员」角色查询，不依赖写死的部门）
     *
     * @return 护理员列表
     */
    public List<SysUser> listNursingUser();
}
