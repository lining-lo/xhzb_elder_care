package com.xhzb.nursing.config;

import com.xhzb.nursing.constants.SystemConstants;
import com.xhzb.nursing.tools.WeatherTools;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringAIConfig {

    /**
     * 创建并返回一个ChatClient的Spring Bean实例。
     * @param openAiChatModel
     * @return
     */
    @Bean
    public ChatClient openAichatClient(OpenAiChatModel openAiChatModel, WeatherTools weatherTools) {
        return ChatClient
                .builder(openAiChatModel)
                .defaultSystem(SystemConstants.prompt)
                .defaultTools(weatherTools)
                .build();
    }
}