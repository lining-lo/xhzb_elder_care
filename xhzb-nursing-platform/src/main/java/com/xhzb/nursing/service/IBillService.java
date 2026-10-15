package com.xhzb.nursing.service;

import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.Bill;
import com.xhzb.nursing.domain.vo.MemberBillVo;

/**
 * 费用账单Service接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public interface IBillService extends IService<Bill>
{
    /**
     * 分页查询当前小程序用户的账单
     *
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param transactionStatus 支付状态
     * @param elderId 老人ID
     * @return 账单分页数据
     */
    public IPage<MemberBillVo> selectMemberBillPage(long pageNum, long pageSize, Integer transactionStatus, Long elderId);

    /**
     * 查询账单详情
     *
     * @param id 账单ID
     * @return 账单详情
     */
    public MemberBillVo selectMemberBillById(Long id);

    /**
     * 账单支付（返回支付参数）
     *
     * @param id 账单ID
     * @return 支付参数
     */
    public Map<String, Object> payBill(Long id);

    /**
     * 账单支付回调
     *
     * @param id 账单ID
     * @return 结果
     */
    public int payNotify(Long id);

    /**
     * 根据老人的入住配置生成月度费用账单
     *
     * @return 生成的账单数量
     */
    public int generateBill();
}
