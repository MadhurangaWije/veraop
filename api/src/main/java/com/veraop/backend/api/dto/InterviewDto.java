package com.veraop.backend.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import com.veraop.backend.api.model.InterviewEntity;
import lombok.Data;

import org.springframework.beans.BeanUtils;

import java.util.Date;

@Data
public class InterviewDto {


    @JsonProperty(value = "candidateName")
    private String candidateName;


    @JsonProperty(value = "position")
    private String position;


    @JsonProperty(value = "division")
    private String division;

    @JsonProperty(value = "scheduledDate")
    private Date scheduledDate;

    public InterviewEntity toInterviewEntity(){
        InterviewEntity interviewEntity = new InterviewEntity();
        BeanUtils.copyProperties(this, interviewEntity);
        return interviewEntity;
    }

}
