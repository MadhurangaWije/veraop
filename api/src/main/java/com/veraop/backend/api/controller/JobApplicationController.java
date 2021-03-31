package com.veraop.backend.api.controller;

import com.veraop.backend.api.dto.JobApplicationDTO;
import com.veraop.backend.api.dto.JobApplicationResponseDTO;
import com.veraop.backend.api.model.JobApplication;
import com.veraop.backend.api.model.Vacancy;
import com.veraop.backend.api.service.JobApplicationService;
import com.veraop.backend.api.service.VacancyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class JobApplicationController {

    @Autowired
    private JobApplicationService jobApplicationService;
    @Autowired
    private VacancyService vacancyService;

    @PostMapping("/applications")
    @CrossOrigin(origins = "*")
    public void saveJobApplication(@RequestBody JobApplicationDTO jobApplicationDTO){
        JobApplication jobApplication=new JobApplication(jobApplicationDTO);
        jobApplicationService.saveJobApplication(jobApplication);
    }

    @GetMapping("/applications")
    @CrossOrigin(origins = "*")
    public List<JobApplicationResponseDTO> getAllJobApplications(){
        List<JobApplication> allJobApplications = jobApplicationService.getAllJobApplications();
        List<JobApplicationResponseDTO> response = new ArrayList<>();
        for(JobApplication jobApplication: allJobApplications){
            Vacancy vacancy = vacancyService.getVacancy(jobApplication.getVacancyId());
            response.add(new JobApplicationResponseDTO(jobApplication, vacancy));
        }
        return response;
    }

    @GetMapping("/applications/{id}")
    @CrossOrigin(origins = "*")
    public JobApplicationResponseDTO getJobApplication(@PathVariable int id){
        JobApplication jobApplication = jobApplicationService.getJobApplication(id);
        Vacancy vacancy = vacancyService.getVacancy(jobApplication.getVacancyId());
        JobApplicationResponseDTO responseDTO = new JobApplicationResponseDTO(jobApplication, vacancy);
        return responseDTO;
    }

    @GetMapping("/applications/{id}/status")
    @CrossOrigin(origins = "*")
    public void updateApplicationStatus(@PathVariable int id, @RequestParam("status") String status){
        JobApplication jobApplication = jobApplicationService.getJobApplication(id);
        jobApplication.setStatus(status);
        jobApplicationService.saveJobApplication(jobApplication);
    }
}
