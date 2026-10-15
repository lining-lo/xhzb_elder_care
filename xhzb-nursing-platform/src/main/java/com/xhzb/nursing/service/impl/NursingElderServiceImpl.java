package com.xhzb.nursing.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.core.domain.entity.SysUser;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.nursing.domain.NursingElder;
import com.xhzb.nursing.domain.dto.ElderNursingDto;
import com.xhzb.nursing.mapper.NursingElderMapper;
import com.xhzb.nursing.constants.SystemConstants;
import com.xhzb.nursing.service.INursingElderService;
import com.xhzb.system.service.ISysUserService;

/**
 * 护理员老人关联Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Service
public class NursingElderServiceImpl extends ServiceImpl<NursingElderMapper, NursingElder> implements INursingElderService
{
    @Autowired
    private ISysUserService userService;

    /**
     * 给老人设置护理员（先清空老人原有的护理员，再保存本次选择的护理员）
     *
     * @param elderNursingList 老人与护理员对应关系
     * @return 结果
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean setNursing(List<ElderNursingDto> elderNursingList)
    {
        if (Objects.isNull(elderNursingList) || elderNursingList.isEmpty())
        {
            throw new ServiceException("请选择需要设置护理员的老人");
        }

        for (ElderNursingDto elderNursing : elderNursingList)
        {
            if (Objects.isNull(elderNursing.getElderId()))
            {
                throw new ServiceException("老人ID不能为空");
            }

            // 先删除老人原有的护理员
            remove(Wrappers.<NursingElder>lambdaQuery().eq(NursingElder::getElderId, elderNursing.getElderId()));

            // 护理员可以为空（表示清空该老人的护理员），去重后保存
            List<Long> nursingIds = Objects.isNull(elderNursing.getNursingIds()) ? new ArrayList<>()
                    : elderNursing.getNursingIds().stream().filter(Objects::nonNull).distinct().collect(Collectors.toList());
            if (nursingIds.isEmpty())
            {
                continue;
            }

            List<NursingElder> nursingElderList = nursingIds.stream().map(nursingId -> {
                NursingElder nursingElder = new NursingElder();
                nursingElder.setElderId(elderNursing.getElderId());
                nursingElder.setNursingId(nursingId);
                return nursingElder;
            }).collect(Collectors.toList());

            saveBatch(nursingElderList);
        }
        return true;
    }

    /**
     * 查询护理员列表（按「护理员」角色查询，不依赖写死的部门）
     *
     * @return 护理员列表
     */
    @Override
    public List<SysUser> listNursingUser()
    {
        return userService.selectUserListByRoleKey(SystemConstants.NURSING_ROLE_KEY);
    }
}
