package com.veraop.backend.api.controller;

import com.veraop.backend.api.dto.InterviewDto;
import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.model.InterviewEntity;
import com.veraop.backend.api.service.SampleDataService;
import com.veraop.backend.api.service.interviews.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
public class BaseController {

    @Autowired
    private SampleDataService dataService;

    @Autowired
    private InterviewService interviewService;


    @GetMapping("/")
    public ResponseEntity<CommonMessage> root(){
        return ResponseEntity.ok(new CommonMessage("VERAOP REST API"));
    }

    @GetMapping("/testdb")
    public void testDb(){
        dataService.saveData();
    }

    @GetMapping("/getAllInterviews")
    ResponseEntity<List<InterviewEntity>>  getAllInterviews(){
        return interviewService.getAllInterviewSchedules();
    }

    @GetMapping("/getScheduledInterviews")
    ResponseEntity<List<InterviewEntity>>  getScheduledInterviews(){
        return interviewService.getScheduledInterviews();
    }

    @GetMapping("/getCompletedInterviews")
    ResponseEntity<List<InterviewEntity>>  getCompletedInterviews(){
        return interviewService.getCompletedInterviews();
    }

    @PostMapping("/addScheduledInterviews")
    public ResponseEntity<InterviewEntity> addInterview(@RequestHeader Map<String, String> headers,
                                                             @RequestBody InterviewDto request) throws ParseException {
        return interviewService.saveData(
                request.getCandidateName(),
                request.getCandidateName(),
                request.getDivision()
                );
    }

    @PostMapping(path = "uploadInterview")
    @CrossOrigin(origins = "*")
    public ResponseEntity<CommonMessage> uploadInterview(@ModelAttribute InterviewReview requestData) throws IOException {

        return interviewService.uploadInterviewVideo(requestData);
    }


}
  