package com.xhzb.nursing.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.xhzb.nursing.domain.ProductOrder;
import com.xhzb.nursing.domain.vo.MemberElderVo;
import com.xhzb.nursing.domain.vo.MemberOrderVo;

/**
 * 服务单（订单）Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Mapper
public interface ProductOrderMapper extends BaseMapper<ProductOrder>
{
    /**
     * 分页查询小程序用户的服务单
     *
     * @param page 分页参数
     * @param familyMemberId 小程序用户ID
     * @param status 状态
     * @return 服务单分页数据
     */
    public IPage<MemberOrderVo> selectMemberOrderList(IPage<MemberOrderVo> page,
                                                      @Param("familyMemberId") Long familyMemberId,
                                                      @Param("status") Integer status);

    /**
     * 查询小程序用户的服务单详情
     *
     * @param id 服务单ID
     * @return 服务单详情
     */
    public MemberOrderVo selectMemberOrderById(Long id);

    /**
     * 查询老人信息（服务单内嵌）
     *
     * @param elderId 老人ID
     * @return 老人信息
     */
    public MemberElderVo selectMemberElderVo(Long elderId);
}
