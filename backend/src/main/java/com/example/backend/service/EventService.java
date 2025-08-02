package com.example.backend.service;

import com.example.backend.dto.CreateEventDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {


    @Autowired private EventProducer eventProducer;

    public void createEvent(CreateEventDTO event) {

        eventProducer.sendEvent(event);

    }
}
