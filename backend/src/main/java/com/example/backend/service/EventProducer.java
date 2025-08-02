package com.example.backend.service;

import com.example.backend.dto.CreateEventDTO;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.config.RabbitMQConfig;

@Service
public class EventProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendEvent(CreateEventDTO event) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EVENT_QUEUE, event);
    }
}