package com.example.backend.controller;

import com.example.backend.dto.LeaderBoardDTO;
import com.example.backend.service.LeaderboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/leaderboard")
public class LeaderboardController {
    @Autowired
    private LeaderboardService leaderboardService;

    @Operation(
        summary = "Get leaderboard for a tenant",
        description = "Returns the leaderboard for a given tenant and period (global, weekly, monthly)",
        parameters = {
            @Parameter(name = "tenantId", description = "Tenant ID", required = true),
            @Parameter(name = "period", description = "Leaderboard period (global, weekly, monthly)", required = false)
        },
        responses = {
            @ApiResponse(responseCode = "200", description = "Leaderboard data returned",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = LeaderBoardDTO.class))),
            @ApiResponse(responseCode = "404", description = "Tenant not found", content = @Content)
        }
    )
    @GetMapping("/{tenantId}")
    public ResponseEntity<List<LeaderBoardDTO>> getLeaderboard(@PathVariable String tenantId, @RequestParam(defaultValue = "global") String period) {
        List<LeaderBoardDTO> data =  leaderboardService.getLeaderboard(tenantId, period);
        return ResponseEntity.ok(data);
    }

    @Operation(
        summary = "Get leaderboard entry for a user",
        description = "Returns the leaderboard entry for a specific user",
        parameters = {
            @Parameter(name = "userId", description = "User ID", required = true)
        },
        responses = {
            @ApiResponse(responseCode = "200", description = "User leaderboard entry returned",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = LeaderBoardDTO.class))),
            @ApiResponse(responseCode = "404", description = "User not found", content = @Content)
        }
    )
    @GetMapping("/user/{userId}")
    public ResponseEntity<LeaderBoardDTO> getUserLeaderboard(@PathVariable Long userId) {
        LeaderBoardDTO data = leaderboardService.getUserLeaderboard(userId);
        return ResponseEntity.ok(data);
    }
}
