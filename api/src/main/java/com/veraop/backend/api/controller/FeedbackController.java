package com.veraop.backend.api.controller;

import com.veraop.backend.api.dto.FeedbackDTO;
import com.veraop.backend.api.model.Feedback;
import com.veraop.backend.api.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/feedbacks")
    @CrossOrigin(origins = "*")
    public void saveFeedback(@RequestBody FeedbackDTO feedbackDTO){
        feedbackService.saveFeedback(feedbackDTO);
    }

    @GetMapping("/feedbacks/{id}")
    @CrossOrigin(origins = "*")
    public Feedback getFeedbackById(@PathVariable int id){
        return feedbackService.getFeedback(id);
    }

    @GetMapping("/feedbacks/application/{id}")
    @CrossOrigin(origins = "*")
    public List<Feedback> getFeedbackByApplicationId(@PathVariable int id){
        return feedbackService.getFeedbackByApplicationId(id);
    }
}
