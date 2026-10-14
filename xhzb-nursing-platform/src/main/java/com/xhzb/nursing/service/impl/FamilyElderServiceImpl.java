package com.xhzb.nursing.service.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.nursing.domain.Elder;
import com.xhzb.nursing.domain.FamilyElder;
import com.xhzb.nursing.domain.dto.ElderBindingDto;
import com.xhzb.nursing.domain.vo.FamilyElderDetailVo;
import com.xhzb.nursing.domain.vo.FamilyElderVo;
import com.xhzb.nursing.mapper.FamilyElderMapper;
import com.xhzb.nursing.service.IElderService;
import com.xhzb.nursing.service.IFamilyElderService;

/**
 * 家属老人绑定Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Service
public class FamilyElderServiceImpl extends ServiceImpl<FamilyElderMapper, FamilyElder> implements IFamilyElderService
{
    @Autowired
    private FamilyElderMapper familyElderMapper;

    @Autowired
    private IElderService elderService;

    /**
     * 小程序绑定家人
     *
     * @param elderBindingDto 绑定家人参数
     * @return 结果
     */
    @Override
    public int bindElder(ElderBindingDto elderBindingDto)
    {
        if (StringUtils.isEmpty(elderBindingDto.getName()) || StringUtils.isEmpty(elderBindingDto.getIdCard()))
        {
            throw new ServiceException("老人姓名和身份证号不能为空");
        }

        // 根据姓名与身份证号查询老人（老人表有 name + id_card_no 的唯一索引）
        Elder elder = elderService.lambdaQuery()
                .eq(Elder::getName, elderBindingDto.getName())
                .eq(Elder::getIdCardNo, elderBindingDto.getIdCard())
                .one();
        if (Objects.isNull(elder))
        {
            throw new ServiceException("未找到老人信息，请核对姓名与身份证号");
        }

        Long userId = currentUserId();
        Long count = lambdaQuery()
                .eq(FamilyElder::getFamilyMemberId, userId)
                .eq(FamilyElder::getElderId, elder.getId())
                .count();
        if (count > 0)
        {
            throw new ServiceException("该老人已绑定，无需重复绑定");
        }

        FamilyElder familyElder = new FamilyElder();
        familyElder.setFamilyMemberId(userId);
        familyElder.setElderId(elder.getId());
        familyElder.setRemark(elderBindingDto.getRemark());
        familyElder.setCreateBy(String.valueOf(userId));
        return save(familyElder) ? 1 : 0;
    }

    /**
     * 查询当前登录用户绑定的家人列表
     *
     * @return 家人列表
     */
    @Override
    public List<FamilyElderVo> selectMyElderList()
    {
        return familyElderMapper.selectFamilyElderList(currentUserId());
    }

    /**
     * 查询当前登录用户绑定的家人列表（分页，包含老人床位、房型、设备信息）
     *
     * @return 家人列表
     */
    @Override
    public List<FamilyElderDetailVo> selectMyElderDetailList()
    {
        return familyElderMapper.selectFamilyElderDetailList(currentUserId());
    }

    /**
     * 小程序解绑家人
     *
     * @param id 绑定关系ID
     * @return 结果
     */
    @Override
    public int unbindElder(Long id)
    {
        FamilyElder familyElder = getById(id);
        if (Objects.isNull(familyElder))
        {
            throw new ServiceException("绑定关系不存在");
        }

        Long userId = currentUserId();
        if (!Objects.equals(userId, familyElder.getFamilyMemberId()))
        {
            throw new ServiceException("只能解除本人的绑定关系");
        }
        return removeById(id) ? 1 : 0;
    }

    /**
     * 获取当前登录的小程序用户ID
     *
     * @return 用户ID
     */
    private Long currentUserId()
    {
        Long userId = UserThreadLocal.getUserId();
        if (Objects.isNull(userId))
        {
            throw new ServiceException("认证失败");
        }
        return userId;
    }
}
