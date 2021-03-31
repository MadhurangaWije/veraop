package com.veraop.backend.api.dto;

public class FeedbackDTO {

    private String name;
    private String designation;
    private String feedback;
    private int applicationId;

    public FeedbackDTO(int applicationId) {
        this.applicationId = applicationId;
    }

    public FeedbackDTO(String name, String designation, String feedback, int applicationId) {
        this.name = name;
        this.designation = designation;
        this.feedback = feedback;
        this.applicationId = applicationId;
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
