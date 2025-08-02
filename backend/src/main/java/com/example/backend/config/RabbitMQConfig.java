package com.example.backend.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    public static final String EVENT_QUEUE = "eventQueue";

    @Bean
    public Queue eventQueue() {
        return new Queue(EVENT_QUEUE, false);
    }
}
