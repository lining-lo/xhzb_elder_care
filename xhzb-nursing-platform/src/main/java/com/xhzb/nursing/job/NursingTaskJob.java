package com.xhzb.nursing.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xhzb.nursing.service.INursingTaskService;

import lombok.extern.slf4j.Slf4j;

/**
 * 护理任务生成定时任务
 *
 * @author ruoyi
 * @date 2026-10-15
 */
@Slf4j
@Component
public class NursingTaskJob
{
    @Autowired
    private INursingTaskService nursingTaskService;

    /**
     * 按老人的护理计划生成未来一周的护理任务
     */
    public void generateNursingTask()
    {
        int count = nursingTaskService.generateNursingTask();
        log.info("护理任务生成定时任务，生成{}条护理任务", count);
    }
}
