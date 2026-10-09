package com.xhzb.nursing.service.impl;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.json.JSONUtil;
import com.xhzb.common.utils.DateUtils;
import com.xhzb.nursing.domain.*;
import com.xhzb.nursing.domain.vo.*;
import com.xhzb.nursing.domain.dto.CheckInApplyDto;
import com.xhzb.nursing.service.*;
import com.xhzb.nursing.util.CodeGenerator;
import com.xhzb.nursing.util.IDCardUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xhzb.nursing.mapper.CheckInMapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Objects;

/**
 * 入住Service业务层处理
 *
 * @author ruoyi
 * @date 2026-10-09
 */
@Service
public class CheckInServiceImpl extends ServiceImpl<CheckInMapper, CheckIn> implements ICheckInService {
    @Autowired
    private CheckInMapper checkInMapper;
    @Autowired
    private IHealthAssessmentService healthAssessmentService;
    @Autowired
    private IElderService elderService;
    @Autowired
    private IBedService bedService;
    @Autowired
    private IContractService contractService;
    @Autowired
    private ICheckInConfigService checkInConfigService;
    @Autowired
    private IHealthAssessmentReportService healthAssessmentReportService;

    /**
     * 查询入住
     *
     * @param id 入住主键
     * @return 入住
     */
    @Override
    public CheckIn selectCheckInById(Long id) {
        return getById(id);
    }

    /**
     * 查询入住列表
     *
     * @param checkIn 入住
     * @return 入住
     */
    @Override
    public List<CheckIn> selectCheckInList(CheckIn checkIn) {
        return checkInMapper.selectCheckInList(checkIn);
    }

    /**
     * 新增入住
     *
     * @param checkIn 入住
     * @return 结果
     */
    @Override
    public int insertCheckIn(CheckIn checkIn) {
        return save(checkIn) ? 1 : 0;
    }

    /**
     * 修改入住
     *
     * @param checkIn 入住
     * @return 结果
     */
    @Override
    public int updateCheckIn(CheckIn checkIn) {
        return updateById(checkIn) ? 1 : 0;
    }

    /**
     * 批量删除入住
     *
     * @param ids 需要删除的入住主键
     * @return 结果
     */
    @Override
    public int deleteCheckInByIds(Long[] ids) {
        return removeByIds(Arrays.asList(ids)) ? 1 : 0;
    }

    /**
     * 删除入住信息
     *
     * @param id 入住主键
     * @return 结果
     */
    @Override
    public int deleteCheckInById(Long id) {
        return removeById(id) ? 1 : 0;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void applyCheckIn(CheckInApplyDto dto) {
        // 判断评估是否完成
        HealthAssessment healthAssessment = healthAssessmentService.lambdaQuery()
                .eq(HealthAssessment::getId, dto.getHealthAssessmentId())
                .eq(HealthAssessment::getEvaluationProgress, 1)
                .one();
        if (Objects.isNull(healthAssessment)) {
            throw new IllegalArgumentException("评估未完成, 无法入住");
        }

        // 判断老人是否已入住
        Elder elder = elderService.lambdaQuery()
                .eq(Elder::getIdCardNo, dto.getCheckInElderDto().getIdCardNo())
                .in(Elder::getStatus, 0, 1, 2)
                .one();
        if (Objects.nonNull(elder)) {
            throw new IllegalArgumentException("老人已入住, 无法重复入住");
        }

        // 更新床位状态为已入住
        Bed bed = bedService.lambdaQuery()
                .eq(Bed::getId, dto.getCheckInConfigDto().getBedId()).one();
        if (Objects.isNull(bed)) {
            throw new IllegalArgumentException("床位不存在");
        }
        bed.setBedStatus(1);
        bedService.updateById(bed);

        // 新增或更新老人信息
        elder = saveOrderUpdateElder(dto, bed);

        // 新增签约办理
        insertContract(dto, elder);

        // 新增入住信息
        CheckIn checkIn = insertCheckIn(dto, elder);

        // 新增入住配置
        insertCheckInConfig(dto, checkIn);

        // 更新评估数据 : 关联老人Id 和 入住状态
        healthAssessment.setElderId(elder.getId());
        healthAssessment.setCheckInStatus(1);
        healthAssessmentService.updateById(healthAssessment);

        // 更新评估报告 : 入住状态
        healthAssessmentReportService.lambdaUpdate()
                .eq(HealthAssessmentReport::getHealthAssessmentId, healthAssessment.getId())
                .set(HealthAssessmentReport::getCheckInStatus, 1)
                .update();
    }

    /**
     * 查询申请入住详情
     *
     * @param id 入住主键
     * @return 入住详情
     */
    @Override
    public CheckInDetailVo getCheckInDetail(Long id) {
        CheckIn checkIn = getById(id);
        if (Objects.isNull(checkIn)) {
            throw new IllegalArgumentException("入住信息不存在");
        }

        CheckInDetailVo detailVo = new CheckInDetailVo();

        // 老人信息
        Elder elder = elderService.getById(checkIn.getElderId());
        if (Objects.nonNull(elder)) {
            CheckInElderVo elderVo = BeanUtil.toBean(elder, CheckInElderVo.class);
            elderVo.setAge(getAge(elder));
            detailVo.setCheckInElderVo(elderVo);
        }

        // 家属信息（申请入住时以JSON形式保存在入住记录的备注字段中）
        if (checkIn.getRemark() != null && !checkIn.getRemark().isEmpty()) {
            try {
                detailVo.setElderFamilyVoList(JSONUtil.toList(checkIn.getRemark(), ElderFamilyVo.class));
            } catch (Exception ignored) {
                // 备注不是家属信息JSON时忽略
            }
        }

        // 入住配置
        CheckInConfig checkInConfig = checkInConfigService.lambdaQuery()
                .eq(CheckInConfig::getCheckInId, Math.toIntExact(id))
                .one();
        if (Objects.nonNull(checkInConfig)) {
            CheckInConfigVo configVo = BeanUtil.toBean(checkInConfig, CheckInConfigVo.class);
            configVo.setStartDate(checkIn.getStartDate());
            configVo.setEndDate(checkIn.getEndDate());
            configVo.setBedNumber(checkIn.getBedNumber());
            detailVo.setCheckInConfigVo(configVo);
        }

        // 签约办理
        Contract contract = contractService.lambdaQuery()
                .eq(Contract::getElderId, checkIn.getElderId())
                .orderByDesc(Contract::getId)
                .last("limit 1")
                .one();
        detailVo.setContract(contract);

        return detailVo;
    }

    /**
     * 根据身份证号（优先）或出生日期计算年龄
     */
    private Integer getAge(Elder elder) {
        try {
            if (elder.getIdCardNo() != null && !elder.getIdCardNo().isEmpty()) {
                return IDCardUtils.getAgeByIdCard(elder.getIdCardNo());
            }
        } catch (Exception ignored) {
            // 身份证号不合法时回退到出生日期计算
        }
        try {
            if (elder.getBirthday() != null && !elder.getBirthday().isEmpty()) {
                LocalDate birthday = LocalDate.parse(elder.getBirthday());
                return Period.between(birthday, LocalDate.now()).getYears();
            }
        } catch (Exception ignored) {
            // 忽略无法解析的出生日期
        }
        return null;
    }

    /**
     * @param dto
     * @param checkIn
     * @return
     * @discription 新增入住配置
     * @Param
     * @author qingshan
     * @date 2026/5/15 下午4:48
     */
    private void insertCheckInConfig(CheckInApplyDto dto, CheckIn checkIn) {
        CheckInConfig checkInConfig = BeanUtil.toBean(dto.getCheckInConfigDto(), CheckInConfig.class);
        checkInConfig.setCheckInId(Math.toIntExact(checkIn.getId()));
        checkInConfigService.save(checkInConfig);
    }

    /**
     * @param dto
     * @param elder
     * @return
     * @discription 新增入住信息
     * @Param
     * @author qingshan
     * @date 2026/5/15 下午4:48
     */
    private CheckIn insertCheckIn(CheckInApplyDto dto, Elder elder) {
        CheckIn checkIn = new CheckIn();
        checkIn.setElderId(elder.getId());
        checkIn.setElderName(elder.getName());
        checkIn.setIdCardNo(elder.getIdCardNo());
        checkIn.setStartDate(dto.getCheckInConfigDto().getStartDate());
        checkIn.setEndDate(dto.getCheckInConfigDto().getEndDate());
        checkIn.setNursingLevelName(dto.getCheckInConfigDto().getNursingLevelName());
        checkIn.setBedNumber(elder.getBedNumber());
        checkIn.setStatus(1);
        checkIn.setRemark(JSONUtil.toJsonStr(dto.getElderFamilyDtoList()));
        checkInMapper.insert(checkIn);
        return checkIn;
    }

    /**
     * @param dto
     * @param elder
     * @return
     * @discription 新增签约办理
     * @Param
     * @author qingshan
     * @date 2026/5/15 下午4:48
     */
    private void insertContract(CheckInApplyDto dto, Elder elder) {
        Contract contract = BeanUtil.toBean(dto.getCheckInContractDto(), Contract.class);
        contract.setElderId(elder.getId());
        contract.setElderName(elder.getName());
        String contractNumber = CodeGenerator.generateContractNumber();
        contract.setContractNumber("HT" + contractNumber);
        contract.setStartDate(dto.getCheckInConfigDto().getStartDate());
        contract.setEndDate(dto.getCheckInConfigDto().getEndDate());
        contract.setStatus(LocalDateTime.now().isAfter(contract.getStartDate()) ? 1 : 0);
        contractService.save(contract);
    }

    /**
     * @param dto
     * @param bed
     * @return
     * @discription 新增或更新老人信息
     * @Param
     * @author qingshan
     * @date 2026/5/15 下午4:48
     */
    private Elder saveOrderUpdateElder(CheckInApplyDto dto, Bed bed) {
        Elder elder = BeanUtil.toBean(dto.getCheckInElderDto(), Elder.class);
        elder.setStatus(1);
        elder.setBedId(Math.toIntExact(bed.getId()));
        elder.setBedNumber(bed.getBedNumber());

        Elder elderdb = elderService.lambdaQuery()
                .eq(Elder::getIdCardNo, dto.getCheckInElderDto().getIdCardNo())
                .eq(Elder::getStatus, 3)
                .one();
        if (Objects.nonNull(elderdb)) {
            elder.setId(elderdb.getId());
            elderService.updateById(elder);
        } else {
            elderService.save(elder);
        }
        return elder;
    }
}
