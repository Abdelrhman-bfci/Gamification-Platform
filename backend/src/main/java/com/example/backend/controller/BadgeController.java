package com.example.backend.controller;

import com.example.backend.dto.CreateBadgeDTO;
import com.example.backend.service.BadgeEngineService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/badge")
public class BadgeController {
    @Autowired
    private BadgeEngineService badgeEngineService;

    @Operation(summary = "Create a new badge", description = "Saves a new badge to the system.")
    @ApiResponse(responseCode = "200", description = "Badge saved successfully", content = @Content(schema = @Schema(implementation = String.class)))
    @PutMapping
    public ResponseEntity<?> saveBadge(@RequestBody CreateBadgeDTO badge) {
        badgeEngineService.saveBadge(badge);
        return ResponseEntity.ok("Badge saved successfully");
    }

    @Operation(summary = "Update an existing badge", description = "Updates the badge with the given ID.")
    @ApiResponse(responseCode = "200", description = "Badge updated successfully", content = @Content(schema = @Schema(implementation = String.class)))
    @PutMapping("/{badgeId}")
    public ResponseEntity<?> update(@PathVariable Long badgeId , @RequestBody CreateBadgeDTO badge) {
        badgeEngineService.update(badgeId , badge);
        return ResponseEntity.ok("Badge saved successfully");
    }

}
