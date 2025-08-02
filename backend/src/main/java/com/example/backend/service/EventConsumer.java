package com.example.backend.service;

import com.example.backend.dto.CreateEventDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.config.RabbitMQConfig;

@Service
public class EventConsumer {

    @Autowired
    private PointEngineService pointEngineService;
    @Autowired
    private BadgeEngineService badgeEngineService;
    @Autowired
    private LevelEngineService levelEngineService;

    @RabbitListener(queues = RabbitMQConfig.EVENT_QUEUE)
    public void handleEvent(CreateEventDTO event) {
        pointEngineService.processEvent(event.getUserId(), event.getEvent(), event.getTenant());
        badgeEngineService.checkAndGrantBadges(event.getUserId(), event.getTenant());
        levelEngineService.checkAndGrantLevel(event.getUserId(), event.getTenant());
    }
}


