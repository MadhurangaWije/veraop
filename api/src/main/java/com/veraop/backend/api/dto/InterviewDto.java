package com.veraop.backend.api.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.veraop.backend.api.model.InterviewEntity;
import lombok.Data;

import org.springframework.beans.BeanUtils;

import java.util.Date;

@Data
public class InterviewDto {


   // @JsonProperty(value = "candidateName")
    private String candidateName;

    private String candidateEmailAddress;

    //@JsonProperty(value = "position")
    private String position;

    //@JsonProperty(value = "division")
    private String division;

    //@JsonProperty(value = "scheduledDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date scheduledDate;

    //@JsonProperty(value = "scheduledDate")
    private int isCompleted;

   // @JsonProperty(value = "result")
    private float result;

    private String candidateId;



    public InterviewEntity toInterviewEntity(){
        InterviewEntity interviewEntity = new InterviewEntity();
        BeanUtils.copyProperties(this, interviewEntity);
        return interviewEntity;
    }

}
