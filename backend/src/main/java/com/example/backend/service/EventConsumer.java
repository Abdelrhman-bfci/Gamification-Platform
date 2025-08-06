package com.example.backend.service;

import com.example.backend.dto.CreateEventDTO;
import org.slf4j.Logger;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.example.backend.config.RabbitMQConfig;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventConsumer {

    Logger logger = org.slf4j.LoggerFactory.getLogger(EventConsumer.class);
    @Autowired
    private PointEngineService pointEngineService;
    @Autowired
    private BadgeEngineService badgeEngineService;
    @Autowired
    private LevelEngineService levelEngineService;




    @RabbitListener(queues = "${spring.rabbitmq.template.default-receive-queue}")
    @Transactional
    public void handleEvent(CreateEventDTO event) {
        try {
            logger.info("Received event: {}", event);
            pointEngineService.processEvent(event.getUserId(), event.getEvent(), event.getTenant());
            badgeEngineService.checkAndGrantBadges(event.getUserId(), event.getTenant());
            levelEngineService.checkAndGrantLevel(event.getUserId(), event.getTenant());
        } catch (Exception e) {
            logger.error("Failed to process event", e);
            throw new AmqpRejectAndDontRequeueException("Failed - don't retry");
        }

    }
}
