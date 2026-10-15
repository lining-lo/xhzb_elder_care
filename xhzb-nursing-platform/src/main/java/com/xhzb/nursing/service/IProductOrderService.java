package com.xhzb.nursing.service;

import java.util.Map;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;
import com.xhzb.nursing.domain.ProductOrder;
import com.xhzb.nursing.domain.dto.OrderRefundDto;
import com.xhzb.nursing.domain.vo.MemberOrderVo;

/**
 * 服务单（订单）Service接口
 *
 * @author ruoyi
 * @date 2026-10-15
 */
public interface IProductOrderService extends IService<ProductOrder>
{
    /**
     * 分页查询当前小程序用户的服务单
     *
     * @param pageNum 页码
     * @param pageSize 每页数量
     * @param status 状态
     * @return 服务单分页数据
     */
    public IPage<MemberOrderVo> selectMemberOrderPage(long pageNum, long pageSize, Integer status);

    /**
     * 查询服务单详情
     *
     * @param id 服务单ID
     * @return 服务单详情
     */
    public MemberOrderVo selectMemberOrderById(Long id);

    /**
     * 下单前校验
     *
     * @param body 下单参数
     * @return 结果
     */
    public boolean checkOrder(Map<String, Object> body);

    /**
     * 小程序下单（创建服务单并返回支付参数）
     *
     * @param body 下单参数
     * @return 服务单信息
     */
    public MemberOrderVo createOrder(Map<String, Object> body);

    /**
     * 支付回调（支付成功后生成计划外护理任务）
     *
     * @param orderId 服务单ID
     * @return 结果
     */
    public int payNotify(Long orderId);

    /**
     * 取消服务单
     *
     * @param orderId 服务单ID
     * @param reason 取消原因
     * @return 结果
     */
    public int cancelOrder(Long orderId, String reason);

    /**
     * 删除服务单
     *
     * @param orderId 服务单ID
     * @return 结果
     */
    public int deleteOrder(Long orderId);

    /**
     * 申请退款
     *
     * @param refundDto 退款参数
     * @return 结果
     */
    public int applyRefund(OrderRefundDto refundDto);
}
