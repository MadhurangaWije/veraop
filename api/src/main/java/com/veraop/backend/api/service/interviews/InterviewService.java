package com.veraop.backend.api.service.interviews;

import com.veraop.backend.api.model.InterviewEntity;
import com.veraop.backend.api.repo.InterviewEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

@Service
public class InterviewService {

    @Autowired
    InterviewService interviewService;

    @Autowired
    InterviewEntityRepository interviewEntityRepository;

    public ResponseEntity saveData(String candidateName, String candidatePosition, String division ) throws ParseException {
        Random rand = new Random();
        int year = 2021;
        int month = rand.nextInt(12) + 0;
        int date = rand.nextInt(31) + 0;;
        int hourOfDay = rand.nextInt(24) + 0;;
        int minute = 2;
        int id = rand.nextInt(1000) + 0;

        UUID uuid = UUID.randomUUID();

        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month, date, hourOfDay, minute, 59);
        Date scheduledDate = calendar.getTime();

        InterviewEntity interviewEntity = interviewEntityRepository.save(
                new InterviewEntity(id, candidateName,uuid.toString(), candidatePosition, division, scheduledDate));

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

        List<InterviewEntity> scheduledInterviews = (List<InterviewEntity>) interviewEntityRepository.findByIsCompleted(1);

        return ResponseEntity.status(HttpStatus.OK).body(scheduledInterviews);

    }

    public ResponseEntity<CommonMessage> uploadInterviewVideo(InterviewVideo video) throws IOException {
        S3Upload.uploadFile(video.getCandidateId, video.getInterviewVideo);
        return ResponseEntity.ok(new CommonMessage("Interview video uploaded to S3"));

    }
}