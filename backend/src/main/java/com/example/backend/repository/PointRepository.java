package com.example.backend.repository;

import com.example.backend.dto.StatisticsInterfaceProjection;
import com.example.backend.model.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {

    @Query(value = "SELECT CASE WHEN :period = 'daily' THEN DATE(p.timestamp) WHEN :period = 'weekly' THEN CONCAT(YEAR(p.timestamp), '-', WEEK(p.timestamp)) WHEN :period = 'monthly' THEN CONCAT(YEAR(p.timestamp), '-', MONTH(p.timestamp)) END as period, SUM(p.points) as totalPoints FROM point p GROUP BY period ORDER BY period DESC", nativeQuery = true)
    List<StatisticsInterfaceProjection> getPointsStatistics(@Param("period") String period);

    @Query("SELECT DATE(p.timestamp) as day, SUM(p.points) as totalPoints FROM Point p GROUP BY day ORDER BY day DESC")
    List<Object[]> getPointsByDay();

    @Query("SELECT FUNCTION('YEAR', p.timestamp) as year, FUNCTION('WEEK', p.timestamp) as week, SUM(p.points) as totalPoints FROM Point p GROUP BY year, week ORDER BY year DESC, week DESC")
    List<Object[]> getPointsByWeek();

    @Query("SELECT FUNCTION('YEAR', p.timestamp) as year, FUNCTION('MONTH', p.timestamp) as month, SUM(p.points) as totalPoints FROM Point p GROUP BY year, month ORDER BY year DESC, month DESC")
    List<Object[]> getPointsByMonth();
}
