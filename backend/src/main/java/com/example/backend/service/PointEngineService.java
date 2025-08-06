package com.example.backend.service;

import com.example.backend.dto.StatisticsInterfaceProjection;
import com.example.backend.model.Point;
import com.example.backend.model.User;
import com.example.backend.model.Action;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.PointRepository;
import com.example.backend.repository.ActionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class PointEngineService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PointRepository pointRepository;
    @Autowired
    private ActionRepository actionRepository;

    private static final Logger logger = LoggerFactory.getLogger(PointEngineService.class);

    @Transactional
    public void processEvent(Long userId, String eventType, String tenantId) {
        User user = userRepository.findById(userId).orElse(null);
        
        if (user == null) {
            logger.error("User not found: {}", userId);
            throw new RuntimeException("User not found");
        }
        
        Action action = actionRepository.findByNameAndTenantName(eventType, tenantId).orElse(null);

        int points = (action != null && action.getPoints() != null) ? action.getPoints() : 0;
        Point point = new Point();
        point.setUser(user);
        point.setEventType(eventType);
        point.setPoints(points);
        point.setTimestamp(LocalDateTime.now());
        pointRepository.save(point);
        logger.info("Event processed for user {}: event={}, points={}", userId, eventType, points);
    }


    public List<StatisticsInterfaceProjection> getStatistics(String period){
        return pointRepository.getPointsStatistics(period);
    }
}
