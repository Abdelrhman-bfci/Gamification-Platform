package com.example.backend.repository;

import com.example.backend.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActionRepository extends JpaRepository<Action, Long> {

    @Query("SELECT a FROM Action a WHERE a.name = :eventType and  a.tenant.name = :tenantName")
    Optional<Action> findByNameAndTenantName( String eventType , String tenantName);
}

