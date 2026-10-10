package com.xhzb.nursing.service.impl;

import java.util.*;

import com.xhzb.common.utils.DateUtils;
import com.xhzb.framework.web.service.TokenService;
import com.xhzb.nursing.domain.dto.UserLoginRequestDto;
import com.xhzb.nursing.domain.vo.LoginVo;
import com.xhzb.nursing.service.WechatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.FamilyMemberMapper;
import com.xhzb.nursing.domain.FamilyMember;
import com.xhzb.nursing.service.IFamilyMemberService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

/**
 * 老人家属Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-10
 */
@Service
public class FamilyMemberServiceImpl extends ServiceImpl<FamilyMemberMapper, FamilyMember> implements IFamilyMemberService {
    @Autowired
    private FamilyMemberMapper familyMemberMapper;

    @Autowired
    private WechatService wechatService;

    @Autowired
    private TokenService tokenService;

    /**
     * 查询老人家属
     *
     * @param id 老人家属主键
     * @return 老人家属
     */
    @Override
    public FamilyMember selectFamilyMemberById(Long id) {
        return getById(id);
    }

    /**
     * 查询老人家属列表
     *
     * @param familyMember 老人家属
     * @return 老人家属
     */
    @Override
    public List<FamilyMember> selectFamilyMemberList(FamilyMember familyMember) {
        return familyMemberMapper.selectFamilyMemberList(familyMember);
    }

    /**
     * 新增老人家属
     *
     * @param familyMember 老人家属
     * @return 结果
     */
    @Override
    public int insertFamilyMember(FamilyMember familyMember) {
        return save(familyMember) ? 1 : 0;
    }

    /**
     * 修改老人家属
     *
     * @param familyMember 老人家属
     * @return 结果
     */
    @Override
    public int updateFamilyMember(FamilyMember familyMember) {
        return updateById(familyMember) ? 1 : 0;
    }

    /**
     * 批量删除老人家属
     *
     * @param ids 需要删除的老人家属主键
     * @return 结果
     */
    @Override
    public int deleteFamilyMemberByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除老人家属信息
     *
     * @param id 老人家属主键
     * @return 结果
     */
    @Override
    public int deleteFamilyMemberById(Long id) {
        return removeById(id) ? 1 : 0;
    }

    static List<String> DEFAULT_NICKNAME_PREFIX = Arrays.asList("生活更美好",
            "大桔大利",
            "日富一日",
            "好柿开花",
            "柿柿如意",
            "一椰暴富",
            "大柚所为",
            "杨梅吐气",
            "天生荔枝"
    );


    /**
     * 小程序登录
     *
     * @param dto
     * @return
     */
    @Override
    public LoginVo login(UserLoginRequestDto dto) {

        // get openId
        String openId = wechatService.getOpenid(dto.getCode());

        // get phone
        String phone = wechatService.getPhone(dto.getPhoneCode());

        // 根据openId查询老人家属是否存在
        FamilyMember familyMember = this.lambdaQuery().eq(FamilyMember::getOpenId, openId).one();
        if (Objects.isNull(familyMember)) {
            // 新增

            // 随机字符串 + 手机号后四位作为昵称
            Collections.shuffle(DEFAULT_NICKNAME_PREFIX);
            String name = DEFAULT_NICKNAME_PREFIX.get(0) + phone.substring(phone.length() - 4);

            familyMember = FamilyMember.builder()
                    .phone(phone)
                    .name(name)
                    .openId(openId)
                    .build();
            save(familyMember);
        } else if (!Objects.equals(familyMember.getPhone(), phone)) {
            // 更新手机号
            familyMember.setPhone(phone);
            updateById(familyMember);
        }

        // 生成token返回

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", familyMember.getId());
        claims.put("name", familyMember.getName());

        String token = tokenService.createToken(claims);

        LoginVo loginVo = new LoginVo();
        loginVo.setToken(token);
        loginVo.setNickName(familyMember.getName());

        return loginVo;
    }
}
