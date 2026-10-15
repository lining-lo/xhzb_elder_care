package com.xhzb.nursing.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;

import cn.hutool.json.JSONUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.StringUtils;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.nursing.domain.FamilyElder;
import com.xhzb.nursing.domain.NursingProject;
import com.xhzb.nursing.domain.NursingTask;
import com.xhzb.nursing.domain.ProductOrder;
import com.xhzb.nursing.domain.RefundRecord;
import com.xhzb.nursing.domain.dto.OrderRefundDto;
import com.xhzb.nursing.domain.vo.MemberOrderVo;
import com.xhzb.nursing.mapper.FamilyElderMapper;
import com.xhzb.nursing.mapper.NursingTaskMapper;
import com.xhzb.nursing.mapper.ProductOrderMapper;
import com.xhzb.nursing.mapper.RefundRecordMapper;
import com.xhzb.nursing.service.INursingProjectService;
import com.xhzb.nursing.service.IProductOrderService;
import com.xhzb.nursing.util.DateTimeParserUtils;

/**
 * 服务单（订单）Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Service
public class ProductOrderServiceImpl extends ServiceImpl<ProductOrderMapper, ProductOrder> implements IProductOrderService
{
    /** 订单状态：待支付 */
    private static final Integer STATUS_UNPAID = 0;

    /** 订单状态：待执行（已支付） */
    private static final Integer STATUS_WAIT = 1;

    /** 订单状态：已取消 */
    private static final Integer STATUS_CANCELLED = 4;

    /** 订单状态：退款中 */
    private static final Integer STATUS_REFUNDING = 5;

    /** 退款状态：退款中 */
    private static final Integer REFUND_STATUS_ING = 1;

    /** 护理任务状态：待执行 / 已取消 */
    private static final Integer TASK_STATUS_WAIT = 1;

    private static final Integer TASK_STATUS_CANCELLED = 3;

    /** 任务类型：护理计划外 */
    private static final Integer TASK_TYPE_OUTER = 1;

    private static final DateTimeFormatter ORDER_NO_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    /** 是否使用模拟支付（下单后直接置为已支付，演示用） */
    @Value("${pay.mock:true}")
    private boolean payMock;

    @Autowired
    private ProductOrderMapper productOrderMapper;

    @Autowired
    private RefundRecordMapper refundRecordMapper;

    @Autowired
    private NursingTaskMapper nursingTaskMapper;

    @Autowired
    private FamilyElderMapper familyElderMapper;

    @Autowired
    private INursingProjectService nursingProjectService;

    /**
     * 分页查询当前小程序用户的服务单
     */
    @Override
    public IPage<MemberOrderVo> selectMemberOrderPage(long pageNum, long pageSize, Integer status)
    {
        return productOrderMapper.selectMemberOrderList(new Page<>(pageNum, pageSize), currentUserId(), status);
    }

    /**
     * 查询服务单详情
     */
    @Override
    public MemberOrderVo selectMemberOrderById(Long id)
    {
        MemberOrderVo order = productOrderMapper.selectMemberOrderById(id);
        if (Objects.isNull(order))
        {
            throw new ServiceException("服务单不存在");
        }
        return order;
    }

    /**
     * 下单前校验
     */
    @Override
    public boolean checkOrder(Map<String, Object> body)
    {
        checkOrderParam(body, true);
        return true;
    }

    /**
     * 小程序下单（创建服务单并返回支付参数）
     */
    @Override
    public MemberOrderVo createOrder(Map<String, Object> body)
    {
        NursingProject project = checkOrderParam(body, true);
        Long elderId = toLong(body.get("elderId"));
        LocalDateTime estimatedArrivalTime = DateTimeParserUtils.parseDateTime(toStr(body.get("estimatedArrivalTime")), null);

        ProductOrder order = new ProductOrder();
        order.setOrderNo(buildOrderNo());
        order.setElderId(elderId);
        order.setProjectId(project.getId());
        order.setFamilyMemberId(currentUserId());
        order.setEstimatedArrivalTime(estimatedArrivalTime);
        order.setAmount(Objects.isNull(project.getPrice()) ? BigDecimal.ZERO : project.getPrice());
        order.setStatus(STATUS_UNPAID);
        order.setRemark(toStr(body.get("remark")));
        order.setCreateBy(String.valueOf(currentUserId()));
        save(order);

        // 模拟支付：下单后直接置为待执行并生成计划外护理任务；关闭 pay.mock 后需等待支付回调
        if (payMock)
        {
            payNotify(order.getId());
        }

        MemberOrderVo orderVo = productOrderMapper.selectMemberOrderById(order.getId());
        orderVo.setTradingVo(buildTradingVo(order.getOrderNo(), order.getAmount()));
        return orderVo;
    }

    /**
     * 支付回调：支付成功后订单进入待执行，并生成计划外护理任务
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int payNotify(Long orderId)
    {
        ProductOrder order = getOrder(orderId);
        if (!STATUS_UNPAID.equals(order.getStatus()))
        {
            throw new ServiceException("当前服务单状态不需要支付");
        }
        order.setStatus(STATUS_WAIT);
        order.setPayTime(LocalDateTime.now());
        order.setTradingOrderNo("T" + order.getOrderNo());
        updateById(order);

        // 计划外护理任务：护理员在执行任务时可以记录执行情况
        NursingTask task = new NursingTask();
        task.setElderId(order.getElderId());
        task.setProjectId(order.getProjectId());
        task.setOrderId(order.getId());
        task.setTaskType(TASK_TYPE_OUTER);
        task.setEstimatedServerTime(order.getEstimatedArrivalTime());
        task.setPlanServerTime(order.getEstimatedArrivalTime());
        task.setStatus(TASK_STATUS_WAIT);
        task.setRemark("服务单：" + order.getOrderNo());
        nursingTaskMapper.insert(task);
        return 1;
    }

    /**
     * 取消服务单（同时取消未执行的计划外护理任务）
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int cancelOrder(Long orderId, String reason)
    {
        ProductOrder order = getOrder(orderId);
        checkMember(order);
        if (!STATUS_UNPAID.equals(order.getStatus()) && !STATUS_WAIT.equals(order.getStatus()))
        {
            throw new ServiceException("当前服务单状态不允许取消");
        }
        if (StringUtils.isEmpty(reason))
        {
            throw new ServiceException("取消原因不能为空");
        }
        order.setStatus(STATUS_CANCELLED);
        order.setCancelReason(reason);
        cancelOrderTask(order.getId());
        return updateById(order) ? 1 : 0;
    }

    /**
     * 删除服务单
     */
    @Override
    public int deleteOrder(Long orderId)
    {
        ProductOrder order = getOrder(orderId);
        checkMember(order);
        if (STATUS_UNPAID.equals(order.getStatus()) || STATUS_WAIT.equals(order.getStatus()))
        {
            throw new ServiceException("待支付或待执行的服务单不能删除");
        }
        return removeById(orderId) ? 1 : 0;
    }

    /**
     * 申请退款
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int applyRefund(OrderRefundDto refundDto)
    {
        Long orderId = Objects.nonNull(refundDto.getProductOrderNo()) ? refundDto.getProductOrderNo() : null;
        ProductOrder order = Objects.nonNull(orderId) ? getById(orderId)
                : (StringUtils.isNotEmpty(refundDto.getOrderNo())
                        ? getOne(Wrappers.<ProductOrder>lambdaQuery().eq(ProductOrder::getOrderNo, refundDto.getOrderNo()))
                        : null);
        if (Objects.isNull(order))
        {
            throw new ServiceException("服务单不存在");
        }
        checkMember(order);
        if (!STATUS_WAIT.equals(order.getStatus()))
        {
            throw new ServiceException("当前服务单状态不允许退款");
        }

        RefundRecord refundRecord = new RefundRecord();
        refundRecord.setOrderId(order.getId());
        refundRecord.setOrderNo(order.getOrderNo());
        refundRecord.setTradingOrderNo(StringUtils.isNotEmpty(refundDto.getTradingOrderNo())
                ? refundDto.getTradingOrderNo() : order.getTradingOrderNo());
        refundRecord.setTradingChannel(refundDto.getTradingChannel());
        refundRecord.setRefundAmount(Objects.nonNull(refundDto.getRefundAmount()) ? refundDto.getRefundAmount() : order.getAmount());
        // 真实退款需要支付平台回调后更新为退款成功/失败，这里先记录为退款中
        refundRecord.setRefundStatus(REFUND_STATUS_ING);
        refundRecord.setCreateBy(String.valueOf(currentUserId()));
        refundRecordMapper.insert(refundRecord);

        order.setStatus(STATUS_REFUNDING);
        cancelOrderTask(order.getId());
        return updateById(order) ? 1 : 0;
    }

    /**
     * 取消服务单对应的未执行护理任务
     */
    private void cancelOrderTask(Long orderId)
    {
        NursingTask task = nursingTaskMapper.selectOne(Wrappers.<NursingTask>lambdaQuery()
                .eq(NursingTask::getOrderId, orderId)
                .eq(NursingTask::getStatus, TASK_STATUS_WAIT)
                .last("limit 1"));
        if (Objects.nonNull(task))
        {
            task.setStatus(TASK_STATUS_CANCELLED);
            task.setCancelReason("服务单取消");
            nursingTaskMapper.updateById(task);
        }
    }

    /**
     * 校验下单参数，返回护理项目
     */
    private NursingProject checkOrderParam(Map<String, Object> body, boolean checkElder)
    {
        if (Objects.isNull(body))
        {
            throw new ServiceException("下单参数不能为空");
        }
        Long projectId = toLong(body.get("projectId"));
        if (Objects.isNull(projectId))
        {
            throw new ServiceException("护理项目不能为空");
        }
        NursingProject project = nursingProjectService.getById(projectId);
        if (Objects.isNull(project) || !Integer.valueOf(1).equals(project.getStatus()))
        {
            throw new ServiceException("护理项目不存在或已停用");
        }
        LocalDateTime estimatedArrivalTime = DateTimeParserUtils.parseDateTime(toStr(body.get("estimatedArrivalTime")), null);
        if (estimatedArrivalTime.isBefore(LocalDateTime.now()))
        {
            throw new ServiceException("期望服务时间需大于当前时间");
        }
        if (checkElder)
        {
            Long elderId = toLong(body.get("elderId"));
            if (Objects.isNull(elderId))
            {
                throw new ServiceException("请选择家人");
            }
            Long count = familyElderMapper.selectCount(Wrappers.<FamilyElder>lambdaQuery()
                    .eq(FamilyElder::getFamilyMemberId, currentUserId())
                    .eq(FamilyElder::getElderId, elderId));
            if (count == 0)
            {
                throw new ServiceException("只能为已绑定的家人下单");
            }
        }
        return project;
    }

    /**
     * 校验服务单是否属于当前小程序用户
     */
    private void checkMember(ProductOrder order)
    {
        if (!Objects.equals(currentUserId(), order.getFamilyMemberId()))
        {
            throw new ServiceException("只能操作本人的服务单");
        }
    }

    /**
     * 获取服务单
     */
    private ProductOrder getOrder(Long orderId)
    {
        if (Objects.isNull(orderId))
        {
            throw new ServiceException("服务单ID不能为空");
        }
        ProductOrder order = getById(orderId);
        if (Objects.isNull(order))
        {
            throw new ServiceException("服务单不存在");
        }
        return order;
    }

    /**
     * 组装支付参数
     * 说明：真实微信支付需要商户号、apiKey、证书与回调地址，这里返回占位参数，
     * 配置好商户信息后替换为微信支付的 JSAPI 下单返回即可。
     */
    private Map<String, Object> buildTradingVo(String orderNo, BigDecimal amount)
    {
        Map<String, Object> payParams = new LinkedHashMap<>();
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", orderNo);
        payParams.put("package", "prepay_id=" + orderNo);
        payParams.put("signType", "RSA");
        payParams.put("paySign", "");
        payParams.put("amount", amount);

        Map<String, Object> tradingVo = new LinkedHashMap<>();
        tradingVo.put("tradingOrderNo", orderNo);
        tradingVo.put("placeOrderJson", JSONUtil.toJsonStr(payParams));
        return tradingVo;
    }

    /**
     * 生成订单号
     */
    private String buildOrderNo()
    {
        return "SF" + LocalDateTime.now().format(ORDER_NO_FORMATTER)
                + String.format("%04d", ThreadLocalRandom.current().nextInt(10000));
    }

    /**
     * 获取当前小程序用户ID
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

    private Long toLong(Object value)
    {
        if (Objects.isNull(value) || StringUtils.isEmpty(String.valueOf(value)))
        {
            return null;
        }
        try
        {
            return Long.valueOf(String.valueOf(value).trim());
        }
        catch (NumberFormatException e)
        {
            return null;
        }
    }

    private String toStr(Object value)
    {
        return Objects.isNull(value) ? null : String.valueOf(value);
    }
}
