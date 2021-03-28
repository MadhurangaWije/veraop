package com.veraop.backend.api.model;

import com.veraop.backend.api.dto.InterviewDto;
import lombok.Data;
import org.springframework.beans.BeanUtils;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;


@Data
@Entity
public class InterviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String candidateName;
    private String candidateId;
    private String position;
    private String division;
    private Date scheduledDate;

    public InterviewEntity(long id,String candidateName,String candidateId,String position, String division, Date scheduledDate){
        this.id = id;
        this.candidateName = candidateName;
        this.candidateId = candidateId;
        this.position = position;
        this.division = division;
        this.scheduledDate = scheduledDate;
    }

    public InterviewEntity(){

    }

    public InterviewDto toDto(){
        InterviewDto interviewDto = new InterviewDto();
        BeanUtils.copyProperties(this, interviewDto);
        return interviewDto;
    }



}
