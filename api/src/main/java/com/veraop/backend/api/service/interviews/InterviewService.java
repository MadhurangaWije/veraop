package com.veraop.backend.api.service.interviews;

import com.veraop.backend.api.dto.InterviewReview;
import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.model.InterviewEntity;
import com.veraop.backend.api.repo.InterviewEntityRepository;
import com.veraop.backend.api.service.onboard.S3Upload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;

@Service
public class InterviewService {

    @Autowired
    SendInterviewService sendInterviewService;

    @Autowired
    MeetingService meetingService;

    @Autowired
    S3Upload s3Upload;

    @Autowired
    InterviewEntityRepository interviewEntityRepository;

    public ResponseEntity createInterview(String candidateName, String candidateEmailAddress, String candidatePosition,
                                          String division, Date scheduledDate) throws ParseException {
        Random rand = new Random();
        int year = 2021;
        int month = rand.nextInt(12) + 0;
        int date = rand.nextInt(31) + 0;
        ;
        int hourOfDay = rand.nextInt(24) + 0;
        ;
        int minute = 2;
        int id = rand.nextInt(1000) + 0;
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, date, hourOfDay, minute, 59);
        Date scheduleDDate = calendar.getTime();

        UUID uuid = UUID.randomUUID();

        //GEt meetingID calling Amazon Chime SDK
        String meetingId = meetingService.getMeeting();

        //Send Email with interview data
        sendInterviewService.sendInterviewInvitation(candidateName, candidateEmailAddress, scheduledDate, meetingId);

        //Save data in to the RDS
        InterviewEntity interviewEntity = interviewEntityRepository.save(
                new InterviewEntity(id, candidateName, candidateEmailAddress, uuid.toString(),
                        candidatePosition, division, scheduledDate));

        return ResponseEntity.status(HttpStatus.OK).body(interviewEntity.toDto());
    }

    public ResponseEntity<List<InterviewEntity>> getAllInterviewSchedules() {

        List<InterviewEntity> scheduledInterviews = (List<InterviewEntity>) interviewEntityRepository.findAll();

//        if (!scheduledInterviews.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.OK).body(scheduledInterviews);
//        } else {
//
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body("");
//        }
        return ResponseEntity.status(HttpStatus.OK).body(scheduledInterviews);

    }

    public ResponseEntity<List<InterviewEntity>> getScheduledInterviews() {

        List<InterviewEntity> scheduledInterviews = (List<InterviewEntity>) interviewEntityRepository.findByIsCompleted(0);

        return ResponseEntity.status(HttpStatus.OK).body(scheduledInterviews);

    }

    public ResponseEntity<List<InterviewEntity>> getCompletedInterviews() {

        List<InterviewEntity> scheduledInterviews =
                (List<InterviewEntity>) interviewEntityRepository.findByIsCompletedAndIsSelected(1,0);

        return ResponseEntity.status(HttpStatus.OK).body(scheduledInterviews);

    }

    public ResponseEntity<CommonMessage> uploadInterviewVideo(InterviewReview reviewData) throws IOException {

        if(reviewData.getInterviewVideo() != null){
            s3Upload.uploadFile(reviewData.getCandidateId(), reviewData.getInterviewVideo());
        }

        Optional<InterviewEntity> oldInterviewEntity = interviewEntityRepository.findByCandidateId(reviewData.getCandidateId());

        if (!oldInterviewEntity.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new CommonMessage("Invalid Candidate ID"));
        }

        //send candidate onboard interview
        if (reviewData.getSelected() == 1) {
            sendInterviewService.sendOnboardInvitation(oldInterviewEntity.get().getCandidateName(),
                    oldInterviewEntity.get().getCandidateEmailAddress(), oldInterviewEntity.get().getCandidateId());
        }


        InterviewEntity newInterviewEntity = oldInterviewEntity.get();
        newInterviewEntity.setResult(reviewData.getResult());
        newInterviewEntity.setIsCompleted(1);
        newInterviewEntity.setIsSelected(reviewData.getSelected());

        InterviewEntity updatedInterviewEntity = interviewEntityRepository.save(newInterviewEntity);
        return ResponseEntity.ok(new CommonMessage("Interview video uploaded to S3"));

    }
}
