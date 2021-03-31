package com.veraop.backend.api.model;

import com.veraop.backend.api.dto.FeedbackDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String designation;
    private String feedback;
    private int applicationId;

    public Feedback() {
    }

    public Feedback(int id, String name, String designation, String feedback, int applicationId) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.feedback = feedback;
        this.applicationId = applicationId;
    }

    public Feedback(FeedbackDTO feedbackDTO) {
        this.name = feedbackDTO.getName();
        this.designation = feedbackDTO.getDesignation();
        this.feedback = feedbackDTO.getFeedback();
        this.applicationId = feedbackDTO.getApplicationId();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }
}
