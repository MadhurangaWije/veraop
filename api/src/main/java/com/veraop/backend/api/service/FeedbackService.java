package com.veraop.backend.api.service;

import com.veraop.backend.api.dto.FeedbackDTO;
import com.veraop.backend.api.model.Feedback;
import com.veraop.backend.api.repo.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public void saveFeedback(FeedbackDTO feedbackDTO){
        Feedback feedback = new Feedback(feedbackDTO);
        feedbackRepository.save(feedback);
    }

    public Feedback getFeedback(int id){
        return feedbackRepository.findById(id).orElseThrow();
    }

    public List<Feedback> getFeedbackByApplicationId(int id) {
        return feedbackRepository.findFeedbackByApplicationId(id);
    }
}
