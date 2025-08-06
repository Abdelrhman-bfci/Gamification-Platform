package com.example.backend.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {



    @Value("${spring.rabbitmq.template.routing-key}") private String eventRoutingKey;
    @Value("${spring.rabbitmq.template.exchange}") private String exchangeName;
    @Value("${spring.rabbitmq.template.default-receive-queue}") private String eventQueueName;

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Queue eventQueue() {
        return new Queue(eventQueueName, false);
    }

    @Bean
    public DirectExchange gamificationExchange() {
        return new DirectExchange(exchangeName, true, false); // durable, not auto-delete
    }

    @Bean
    public Binding eventBinding() {
        return BindingBuilder.bind(eventQueue())
                .to(gamificationExchange())
                .with(eventRoutingKey);
    }
}
