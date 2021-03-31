package com.veraop.backend.api.service;

import com.veraop.backend.api.model.JobApplication;
import com.veraop.backend.api.repo.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public void saveJobApplication(JobApplication jobApplication){
        jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getAllJobApplications(){
        return jobApplicationRepository.findAll();
    }

    public JobApplication getJobApplication(int id){
        return jobApplicationRepository.findById(id).orElseThrow();
    }
}
