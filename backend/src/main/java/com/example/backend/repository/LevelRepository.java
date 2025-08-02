package com.example.backend.repository;

import com.example.backend.model.Level;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LevelRepository extends JpaRepository<Level, Long> {


    @Query("SELECT l FROM Level l WHERE l.tenant.name = :tenantName AND l.points <= :cumPoints  ORDER BY l.points DESC LIMIT 1")
    Level findTopLevelByTenantIdAndCumPoints(String tenantName, int cumPoints);
}
