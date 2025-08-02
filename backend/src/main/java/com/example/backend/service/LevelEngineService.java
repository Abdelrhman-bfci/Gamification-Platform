package com.example.backend.service;

import com.example.backend.model.Level;
import com.example.backend.model.User;
import com.example.backend.repository.LevelRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LevelEngineService {

    @Autowired
    private LevelRepository levelRepository;
    @Autowired
    private UserRepository userRepository;

    public void checkAndGrantLevel(Long userId, String tenantId) {

        User user = userRepository.findById(userId).orElse(null);

        if (user == null) return;

        int userPoints = user.getPoints() != null ? user.getPoints().stream().mapToInt(p -> p.getPoints()).sum() : 0;

        Level eligibleLevels = levelRepository.findTopLevelByTenantIdAndCumPoints(tenantId, userPoints);

        user.setLevel(eligibleLevels);
        userRepository.save(user);
    }
}
