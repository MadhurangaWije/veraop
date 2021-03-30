package com.veraop.backend.api.controller;

import com.amazonaws.services.chime.model.Attendee;
import com.amazonaws.services.chime.model.Meeting;
import com.veraop.backend.api.dto.InterviewDto;
import com.veraop.backend.api.dto.InterviewReview;
import com.veraop.backend.api.dto.MeetingDTO;
import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.model.InterviewEntity;
import com.veraop.backend.api.service.SampleDataService;
import com.veraop.backend.api.service.interviews.InterviewService;
import com.veraop.backend.api.service.interviews.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
public class BaseController {

    @Autowired
    private SampleDataService dataService;

    @Autowired
    private InterviewService interviewService;

    @Autowired
    private MeetingService meetingService;


    @GetMapping("/")
    public ResponseEntity<CommonMessage> root(){
        return ResponseEntity.ok(new CommonMessage("VERAOP REST API"));
    }

    @GetMapping("/testdb")
    public void testDb(){
        dataService.saveData();
    }

    @GetMapping("/getAllInterviews")
    @CrossOrigin(origins = "*")
    ResponseEntity<List<InterviewEntity>>  getAllInterviews(){
        return interviewService.getAllInterviewSchedules();
    }

    @GetMapping("/getScheduledInterviews")
    @CrossOrigin(origins = "*")
    ResponseEntity<List<InterviewEntity>>  getScheduledInterviews(){
        return interviewService.getScheduledInterviews();
    }

    @GetMapping("/getCompletedInterviews")
    @CrossOrigin(origins = "*")
    ResponseEntity<List<InterviewEntity>>  getCompletedInterviews(){
        return interviewService.getCompletedInterviews();
    }

    @PostMapping("/addScheduledInterviews")
    @CrossOrigin(origins = "*")
    public ResponseEntity<InterviewEntity> addInterview(@RequestHeader Map<String, String> headers,
                                                             @RequestBody InterviewDto request) throws ParseException {
        return interviewService.createInterview(
                request.getCandidateName(),
                request.getCandidateEmailAddress(),
                request.getPosition(),
                request.getDivision(),
                request.getScheduledDate()
                );
    }

    @PostMapping(path = "uploadInterview")
    @CrossOrigin(origins = "*")
    public ResponseEntity<CommonMessage> uploadInterview(@ModelAttribute InterviewReview requestData) throws IOException {

        return interviewService.uploadInterviewVideo(requestData);
    }

    @GetMapping("/getChimeMeetingInfo")
    @CrossOrigin(origins = "*")
    MeetingDTO getMeetingInfo(){
        return (meetingService.createNewMeetingInfo());

    }



}
  