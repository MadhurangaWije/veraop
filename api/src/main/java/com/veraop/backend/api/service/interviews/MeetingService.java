package com.veraop.backend.api.service.interviews;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.chime.AmazonChime;
import com.amazonaws.services.chime.model.CreateMeetingRequest;
import com.amazonaws.services.chime.model.CreateMeetingResult;
import com.amazonaws.services.chime.model.Meeting;
import org.springframework.stereotype.Service;
import com.amazonaws.services.chime.AmazonChimeClientBuilder;

import java.util.Date;

@Service
public class MeetingService
{

    String getMeeting(){
        AmazonChime chime = AmazonChimeClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

//    String meetingId = "abc123";
//    String externalId = "extabc123";
//    String parentId = "";
//    Boolean record = false;
//    Integer durationInMinutes = 20;
//    String name = "Breakout room 1";
//    String voiceConfId = "851153";
//    Boolean autoStartRecording = false;
//    Boolean allowStartStopRecording = false;
//    Boolean webcamsOnlyForModerator = false;
//    Boolean isBreakout = true;
//    Integer sequence = 4;
//    String viewerPassword = "vp";
//    String moderatorPassword = "mp";
//    long createTime = System.currentTimeMillis();
//    String createDate = new Date(createTime).toString();
//    CreateMeetingRequestPayload payload = new CreateMeetingRequestPayload(meetingId, externalId, parentId, name,
//            record, voiceConfId, durationInMinutes, autoStartRecording, allowStartStopRecording,
//            webcamsOnlyForModerator, moderatorPassword, viewerPassword, createTime, createDate, isBreakout, sequence);

        CreateMeetingRequest createMeetingRequest = new CreateMeetingRequest();

        createMeetingRequest.setClientRequestToken("1234");
        createMeetingRequest.setMediaRegion("us-east-1");
        createMeetingRequest.setMeetingHostId("");

        CreateMeetingResult meetingResult =  chime.createMeeting(createMeetingRequest);

        Meeting meeting =  meetingResult.getMeeting();

        String meetingID = meeting.getMeetingId();

        System.out.println("Scheduled meeting ID is :"+meetingID);

        return meetingID;

    }




}
