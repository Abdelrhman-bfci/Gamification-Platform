

package com.example.backend.repository;

import com.example.backend.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BadgeRepository extends JpaRepository<Badge, Long> {


    @Query("select b from Badge b  where b.tenant.name = :tenantId and b.cumPoint <= :cumPoints")
    List<Badge> fetchBadgesByTenantIdAndCumPoints(String tenantId, int cumPoints);
}

