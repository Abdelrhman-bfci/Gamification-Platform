package com.example.backend.service;

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
}
