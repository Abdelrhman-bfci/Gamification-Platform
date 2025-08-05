package com.example.backend.controller;

import com.example.backend.dto.CreateEventDTO;
import com.example.backend.service.BadgeEngineService;
import com.example.backend.service.EventService;
import com.example.backend.service.LevelEngineService;
import com.example.backend.service.PointEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventService eventService;


    @Operation(
        summary = "Create a new event",
        description = "Creates a new event and triggers the gamification workflow.",
        requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
            required = true,
            content = @Content(
                schema = @Schema(implementation = CreateEventDTO.class)
            )
        ),
        responses = {
            @ApiResponse(responseCode = "200", description = "Event created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input", content = @Content)
        }
    )
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody @Valid CreateEventDTO event) {

        eventService.createEvent(event);

        return ResponseEntity.ok("Event processed successfully");
    }
}