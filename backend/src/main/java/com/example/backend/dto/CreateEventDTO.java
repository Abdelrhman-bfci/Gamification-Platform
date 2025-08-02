package com.example.backend.dto;

import jakarta.validation.constraints.NotNull;

public class CreateEventDTO {

    @NotNull
    private Long userId;
    @NotNull
    private String event;
    @NotNull
    private String tenant;

    // Getters and setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }
    public String getTenant() { return tenant; }
    public void setTenant(String tenant) { this.tenant = tenant; }
}
