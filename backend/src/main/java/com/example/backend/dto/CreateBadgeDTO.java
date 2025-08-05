package com.example.backend.dto;

import com.example.backend.model.Tenant;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public class CreateBadgeDTO implements Serializable {

    @NotNull
    private String name;

    @NotNull
    private Long tenantId;

    @NotNull
    private Integer cumPoint;

    public @NotNull String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public @NotNull Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(@NotNull Long tenantId) {
        this.tenantId = tenantId;
    }

    public @NotNull Integer getCumPoint() {
        return cumPoint;
    }

    public void setCumPoint(@NotNull Integer cumPoint) {
        this.cumPoint = cumPoint;
    }
}
