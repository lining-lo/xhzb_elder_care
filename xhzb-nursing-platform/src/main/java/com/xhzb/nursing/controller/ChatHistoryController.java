package com.xhzb.nursing.controller;

import com.xhzb.common.core.domain.AjaxResult;
import com.xhzb.common.utils.SecurityUtils;
import com.xhzb.nursing.service.ChatHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ai/history")
public class ChatHistoryController {

    @Autowired
    private ChatHistoryService chatHistoryService;

    @GetMapping
    public AjaxResult getChatIds(){

        //获取当前登录人的id
        Long userId = SecurityUtils.getUserId();
        List<String> ids = chatHistoryService.getChatIds(userId);
        return AjaxResult.success(ids);
    }


}