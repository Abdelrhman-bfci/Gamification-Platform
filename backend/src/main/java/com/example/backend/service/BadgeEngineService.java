package com.example.backend.service;

import com.example.backend.dto.CreateBadgeDTO;
import com.example.backend.repository.TenantRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import com.example.backend.repository.BadgeRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.model.Badge;
import com.example.backend.model.User;

@Service
public class BadgeEngineService {

    @Autowired
    private BadgeRepository badgeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TenantRepository tenantRepository;

    public void checkAndGrantBadges(Long userId, String tenantId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return;
        int userPoints = user.getPoints() != null ? user.getPoints().stream().mapToInt(p -> p.getPoints()).sum() : 0;
        List<Badge> eligibleBadges = badgeRepository.fetchBadgesByTenantIdAndCumPoints(tenantId , userPoints);

        if (user.getBadges() == null) user.setBadges(new ArrayList<>());

        for (Badge badge : eligibleBadges) {
            if (!user.getBadges().contains(badge)) {
                user.getBadges().add(badge);
            }
        }
        userRepository.save(user);
    }

    public void saveBadge(CreateBadgeDTO badge) {
        Badge newBadge = new Badge();
        newBadge.setName(badge.getName());
        newBadge.setTenant(tenantRepository.findById(badge.getTenantId()).orElse(null));
        newBadge.setCumPoint(badge.getCumPoint());
        badgeRepository.save(newBadge);
    }


    public void update(Long badgeId , CreateBadgeDTO badge) {

        Badge fetchBadge =  badgeRepository.findById(badgeId).orElse(null);

        if (fetchBadge == null) {
            throw new IllegalArgumentException("Badge not found with id: " + badgeId);
        }

        fetchBadge.setName(badge.getName());
        fetchBadge.setTenant(tenantRepository.findById(badge.getTenantId()).orElse(null));
        fetchBadge.setCumPoint(badge.getCumPoint());

        badgeRepository.save(fetchBadge);
    }
}
