package com.xhzb.nursing.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.xhzb.nursing.domain.Bill;
import com.xhzb.nursing.domain.vo.MemberBillVo;

/**
 * 费用账单Mapper接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Mapper
public interface BillMapper extends BaseMapper<Bill>
{
    /**
     * 分页查询小程序用户的账单
     *
     * @param page 分页参数
     * @param familyMemberId 小程序用户ID
     * @param transactionStatus 支付状态
     * @param elderId 老人ID
     * @return 账单分页数据
     */
    public IPage<MemberBillVo> selectMemberBillList(IPage<MemberBillVo> page,
                                                    @Param("familyMemberId") Long familyMemberId,
                                                    @Param("transactionStatus") Integer transactionStatus,
                                                    @Param("elderId") Long elderId);

    /**
     * 查询小程序用户的账单详情
     *
     * @param id 账单ID
     * @return 账单详情
     */
    public MemberBillVo selectMemberBillById(Long id);
}
