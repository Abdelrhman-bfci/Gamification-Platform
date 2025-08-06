package com.example.backend.service;

import com.example.backend.dto.CreateEventDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.backend.config.RabbitMQConfig;

@Service
public class EventProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    @Value("${spring.rabbitmq.template.routing-key}") private String eventQueueKey;
    @Value("${spring.rabbitmq.template.exchange}") private String exchangeName;


    public void sendEvent(CreateEventDTO event) {
        rabbitTemplate.convertAndSend(exchangeName, eventQueueKey, event);
    }
}