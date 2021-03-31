package com.veraop.backend.api.repo;

import com.veraop.backend.api.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    public List<Feedback> findFeedbackByApplicationId(int applicationId);
}
