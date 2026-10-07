package com.xhzb.nursing.service;

public interface ChatHistoryService {


    /**
     * 保存聊天历史
     * @param userId
     * @param chatId
     */
    public void save(String userId,String chatId);

}