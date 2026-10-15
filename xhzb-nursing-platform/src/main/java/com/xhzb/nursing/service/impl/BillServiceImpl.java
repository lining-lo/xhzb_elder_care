package com.xhzb.nursing.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.xhzb.common.exception.ServiceException;
import com.xhzb.common.utils.UserThreadLocal;
import com.xhzb.nursing.domain.Bed;
import com.xhzb.nursing.domain.Bill;
import com.xhzb.nursing.domain.CheckIn;
import com.xhzb.nursing.domain.CheckInConfig;
import com.xhzb.nursing.domain.Elder;
import com.xhzb.nursing.domain.FamilyElder;
import com.xhzb.nursing.domain.Room;
import com.xhzb.nursing.domain.vo.BillCostVo;
import com.xhzb.nursing.domain.vo.MemberBillVo;
import com.xhzb.nursing.mapper.BillMapper;
import com.xhzb.nursing.mapper.FamilyElderMapper;
import com.xhzb.nursing.service.IBedService;
import com.xhzb.nursing.service.IBillService;
import com.xhzb.nursing.service.ICheckInConfigService;
import com.xhzb.nursing.service.ICheckInService;
import com.xhzb.nursing.service.IElderService;
import com.xhzb.nursing.service.IRoomService;

import cn.hutool.json.JSONUtil;

/**
 * 费用账单Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Service
public class BillServiceImpl extends ServiceImpl<BillMapper, Bill> implements IBillService
{
    /** 支付状态：待支付 / 已支付 */
    private static final Integer STATUS_UNPAID = 0;

    private static final Integer STATUS_PAID = 1;

    /** 账单类型：月度账单 */
    private static final Integer BILL_TYPE_MONTH = 0;

    /** 老人状态：已入住 */
    private static final Integer ELDER_STATUS_CHECKED_IN = 1;

    private static final DateTimeFormatter BILL_NO_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");

    private static final DateTimeFormatter BILL_MONTH_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM");

    /** 每月按 30 天折算 */
    private static final BigDecimal MONTH_DAYS = new BigDecimal("30");

    /** 是否使用模拟支付（账单支付后直接置为已支付，演示用） */
    @Value("${pay.mock:true}")
    private boolean payMock;

    @Autowired
    private BillMapper billMapper;

    @Autowired
    private IElderService elderService;

    @Autowired
    private IBedService bedService;

    @Autowired
    private IRoomService roomService;

    @Autowired
    private ICheckInService checkInService;

    @Autowired
    private ICheckInConfigService checkInConfigService;

    @Autowired
    private FamilyElderMapper familyElderMapper;

    /**
     * 分页查询当前小程序用户的账单
     */
    @Override
    public IPage<MemberBillVo> selectMemberBillPage(long pageNum, long pageSize, Integer transactionStatus, Long elderId)
    {
        IPage<MemberBillVo> page = billMapper.selectMemberBillList(new Page<>(pageNum, pageSize), currentUserId(),
                transactionStatus, elderId);
        page.getRecords().forEach(bill -> bill.setCheckInConfigVo(buildBillCostVo(bill)));
        return page;
    }

    /**
     * 查询账单详情
     */
    @Override
    public MemberBillVo selectMemberBillById(Long id)
    {
        MemberBillVo bill = billMapper.selectMemberBillById(id);
        if (Objects.isNull(bill))
        {
            throw new ServiceException("账单不存在");
        }
        bill.setCheckInConfigVo(buildBillCostVo(bill));
        return bill;
    }

    /**
     * 账单支付（返回支付参数）
     * 说明：真实微信支付需要商户号、apiKey、证书与回调地址，这里返回占位参数，
     * 配置好商户信息后替换为微信支付的 JSAPI 下单返回即可。
     */
    @Override
    public Map<String, Object> payBill(Long id)
    {
        Bill bill = getMemberBill(id);
        if (!STATUS_UNPAID.equals(bill.getTransactionStatus()))
        {
            throw new ServiceException("当前账单不需要支付");
        }
        // 模拟支付：直接置为已支付；关闭 pay.mock 后需等待支付回调
        if (payMock)
        {
            payNotify(id);
        }

        Map<String, Object> payParams = new LinkedHashMap<>();
        payParams.put("timeStamp", String.valueOf(System.currentTimeMillis() / 1000));
        payParams.put("nonceStr", bill.getBillNo());
        payParams.put("package", "prepay_id=" + bill.getBillNo());
        payParams.put("signType", "RSA");
        payParams.put("paySign", "");
        payParams.put("amount", bill.getPayableAmount());

        Map<String, Object> tradingVo = new LinkedHashMap<>();
        tradingVo.put("tradingOrderNo", bill.getBillNo());
        tradingVo.put("placeOrderJson", JSONUtil.toJsonStr(payParams));
        return tradingVo;
    }

    /**
     * 账单支付回调
     */
    @Override
    public int payNotify(Long id)
    {
        Bill bill = getMemberBill(id);
        if (!STATUS_UNPAID.equals(bill.getTransactionStatus()))
        {
            throw new ServiceException("当前账单状态不需要支付");
        }
        bill.setTransactionStatus(STATUS_PAID);
        bill.setTransactionTime(LocalDateTime.now());
        return updateById(bill) ? 1 : 0;
    }

    /**
     * 根据老人的入住配置生成月度费用账单（未来账单不会重复生成）
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int generateBill()
    {
        int count = 0;
        List<Elder> elderList = elderService.lambdaQuery().eq(Elder::getStatus, ELDER_STATUS_CHECKED_IN).list();
        for (Elder elder : elderList)
        {
            CheckIn checkIn = checkInService.lambdaQuery()
                    .eq(CheckIn::getElderId, elder.getId())
                    .orderByDesc(CheckIn::getId)
                    .last("limit 1").one();
            if (Objects.isNull(checkIn))
            {
                continue;
            }
            CheckInConfig config = checkInConfigService.lambdaQuery()
                    .eq(CheckInConfig::getCheckInId, checkIn.getId())
                    .orderByDesc(CheckInConfig::getId)
                    .last("limit 1").one();
            if (Objects.isNull(config) || Objects.isNull(config.getFeeStartDate()))
            {
                continue;
            }
            if (billExists(elder.getId(), config.getFeeStartDate()))
            {
                continue;
            }
            save(buildBill(elder, config));
            count++;
        }
        return count;
    }

    /**
     * 组装账单数据
     */
    private Bill buildBill(Elder elder, CheckInConfig config)
    {
        LocalDateTime startTime = config.getFeeStartDate();
        LocalDateTime endTime = Objects.isNull(config.getFeeEndDate()) ? startTime.plusDays(30) : config.getFeeEndDate();
        int totalDays = (int) Math.max(1L, ChronoUnit.DAYS.between(startTime.toLocalDate(), endTime.toLocalDate()));

        BigDecimal bedCost = nullToZero(config.getBedFee());
        BigDecimal nursingCost = nullToZero(config.getNursingFee());
        BigDecimal otherCost = nullToZero(config.getOtherFees());
        BigDecimal insurance = nullToZero(config.getInsurancePayment());
        BigDecimal subsidy = nullToZero(config.getGovernmentSubsidy());
        BigDecimal deposit = nullToZero(config.getDeposit());
        // 每月应付 = 床位费 + 护理费 + 其他费用 - 医保支付 - 政府补贴
        BigDecimal monthCost = bedCost.add(nursingCost).add(otherCost).subtract(insurance).subtract(subsidy);
        // 本期应付 = 每月应付按天折算
        BigDecimal currentCost = monthCost.multiply(new BigDecimal(totalDays)).divide(MONTH_DAYS, 2, RoundingMode.HALF_UP);
        // 账单金额 = 本期应付 + 押金；应付金额 = 账单金额 - 预缴款
        BigDecimal billAmount = currentCost.add(deposit).setScale(2, RoundingMode.HALF_UP);
        BigDecimal prepaidAmount = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

        Bill bill = new Bill();
        bill.setBillNo(buildBillNo());
        bill.setBillType(BILL_TYPE_MONTH);
        bill.setElderId(elder.getId());
        bill.setCheckInConfigId(config.getId());
        bill.setBillMonth(startTime.format(BILL_MONTH_FORMATTER));
        bill.setBillStartTime(startTime);
        bill.setBillEndTime(endTime);
        bill.setTotalDays(totalDays);
        bill.setLname(config.getNursingLevelName());
        bill.setTypeName(getRoomTypeName(elder));
        bill.setBedCost(bedCost);
        bill.setNursingCost(nursingCost);
        bill.setOtherCost(otherCost);
        bill.setMedicalInsurancePayment(insurance);
        bill.setGovernmentSubsidy(subsidy);
        bill.setMonthCost(monthCost.setScale(2, RoundingMode.HALF_UP));
        bill.setCurrentCost(currentCost);
        bill.setDepositAmount(deposit);
        bill.setBillAmount(billAmount);
        bill.setPrepaidAmount(prepaidAmount);
        bill.setPayableAmount(billAmount.subtract(prepaidAmount));
        bill.setTransactionStatus(STATUS_UNPAID);
        bill.setPaymentDeadline(startTime.plusDays(30));
        bill.setCreateBy("admin");
        return bill;
    }

    /**
     * 查询老人所在房间的房型
     */
    private String getRoomTypeName(Elder elder)
    {
        if (Objects.isNull(elder.getBedId()))
        {
            return null;
        }
        Bed bed = bedService.getById(elder.getBedId());
        if (Objects.isNull(bed) || Objects.isNull(bed.getRoomId()))
        {
            return null;
        }
        Room room = roomService.getById(bed.getRoomId());
        return Objects.isNull(room) ? null : room.getTypeName();
    }

    /**
     * 判断账单是否已经生成过
     */
    private boolean billExists(Long elderId, LocalDateTime billStartTime)
    {
        Long count = billMapper.selectCount(Wrappers.<Bill>lambdaQuery()
                .eq(Bill::getElderId, elderId)
                .eq(Bill::getBillStartTime, billStartTime));
        return count > 0;
    }

    /**
     * 获取当前小程序用户的账单
     */
    private Bill getMemberBill(Long id)
    {
        if (Objects.isNull(id))
        {
            throw new ServiceException("账单ID不能为空");
        }
        Bill bill = getById(id);
        if (Objects.isNull(bill))
        {
            throw new ServiceException("账单不存在");
        }
        Long count = familyElderMapper.selectCount(Wrappers.<FamilyElder>lambdaQuery()
                .eq(FamilyElder::getFamilyMemberId, currentUserId())
                .eq(FamilyElder::getElderId, bill.getElderId()));
        if (count == 0)
        {
            throw new ServiceException("只能查看本人家人的账单");
        }
        return bill;
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

    private String buildBillNo()
    {
        return "ZD" + LocalDateTime.now().format(BILL_NO_FORMATTER)
                + String.format("%04d", ThreadLocalRandom.current().nextInt(10000));
    }

    private BigDecimal nullToZero(BigDecimal value)
    {
        return Objects.isNull(value) ? BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP) : value;
    }

    /**
     * 组装账单费用明细对象
     */
    private BillCostVo buildBillCostVo(MemberBillVo bill)
    {
        BillCostVo costVo = new BillCostVo();
        costVo.setId(bill.getCheckInConfigId());
        costVo.setNursingLevelName(bill.getLname());
        costVo.setBedCost(bill.getBedCost());
        costVo.setNursingCost(bill.getNursingCost());
        costVo.setOtherCost(bill.getOtherCost());
        costVo.setMedicalInsurancePayment(bill.getMedicalInsurancePayment());
        costVo.setGovernmentSubsidy(bill.getGovernmentSubsidy());
        costVo.setMonthCost(bill.getMonthCost());
        return costVo;
    }
}
