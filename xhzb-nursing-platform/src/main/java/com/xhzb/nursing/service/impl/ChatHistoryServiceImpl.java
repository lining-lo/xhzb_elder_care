package com.xhzb.nursing.service.impl;

import com.xhzb.nursing.service.ChatHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Service
public class ChatHistoryServiceImpl implements ChatHistoryService {


    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    private static final String CHAT_HISTORY_PREFIX = "chat:history:";

    /**
     * 保存聊天历史
     * @param userId
     * @param chatId
     */
    @Override
    public void save(String userId, String chatId) {
        redisTemplate.opsForSet().add(CHAT_HISTORY_PREFIX+userId,chatId);
    }

}