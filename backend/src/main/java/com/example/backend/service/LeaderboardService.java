package com.example.backend.service;

import com.example.backend.dto.LeaderBoardDTO;
import com.example.backend.model.User;
import com.example.backend.model.Level;
import com.example.backend.model.Badge;
import com.example.backend.model.Point;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.LevelRepository;
import com.example.backend.repository.BadgeRepository;
import com.example.backend.repository.PointRepository;
import com.example.backend.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaderboardService {
    @Autowired
    private UserRepository userRepository;



    public List<LeaderBoardDTO> getLeaderboard(String tenantId, String period) {
        List<User> users = userRepository.findByTenantName(tenantId);

        List<LeaderBoardDTO> leaderboard = new java.util.ArrayList<>();

        for (User user : users) {
            int cumPoints = user.getPoints().stream().mapToInt(Point::getPoints).sum();
            Level level = user.getLevel();
            List<Badge> badges = user.getBadges();
            LeaderBoardDTO dto = new LeaderBoardDTO();
            dto.setUserId(user.getId());
            dto.setLevel(level != null ? level.getName() : null);
            dto.setPoints(cumPoints);
            dto.setBadges(badges.stream().map(Badge::getName).toList());
            leaderboard.add(dto);
        }
        return leaderboard;
    }

    public LeaderBoardDTO getUserLeaderboard(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        int cumPoints = user.getPoints().stream().mapToInt(Point::getPoints).sum();
        Level level = user.getLevel();
        List<Badge> badges = user.getBadges();
        LeaderBoardDTO dto = new LeaderBoardDTO();
        dto.setUserId(user.getId());
        dto.setLevel(level != null ? level.getName() : null);
        dto.setPoints(cumPoints);
        dto.setBadges(badges.stream().map(Badge::getName).toList());
        return dto;
    }
}
