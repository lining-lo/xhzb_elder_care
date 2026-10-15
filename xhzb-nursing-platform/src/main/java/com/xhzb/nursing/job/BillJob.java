package com.xhzb.nursing.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xhzb.nursing.service.IBillService;

import lombok.extern.slf4j.Slf4j;

/**
 * 费用账单生成定时任务
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Slf4j
@Component
public class BillJob
{
    @Autowired
    private IBillService billService;

    /**
     * 根据老人的入住配置生成月度费用账单
     */
    public void generateBill()
    {
        int count = billService.generateBill();
        log.info("费用账单生成定时任务，生成{}条账单", count);
    }
}
