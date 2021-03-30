package com.veraop.backend.api.service.interviews;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.chime.AmazonChime;
import com.amazonaws.services.chime.AmazonChimeClient;
import com.amazonaws.services.chime.model.*;
import com.veraop.backend.api.dto.MeetingDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.amazonaws.services.chime.AmazonChimeClientBuilder;

import java.util.*;

@Service
public class MeetingService {

    String getMeeting() {
        AmazonChime chime = AmazonChimeClientBuilder
                .standard().build();

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

        UUID uuid = UUID.randomUUID();
        createMeetingRequest.setClientRequestToken(uuid.toString());
        createMeetingRequest.setMediaRegion("us-east-1");
        createMeetingRequest.setMeetingHostId("veraop");

        CreateMeetingResult meetingResult = chime.createMeeting(createMeetingRequest);

        Meeting meeting = meetingResult.getMeeting();

        String meetingID = meeting.getMeetingId();

        System.out.println("Scheduled meeting ID is :" + meetingID);

        CreateAttendeeRequest createAttendeeRequest = new CreateAttendeeRequest().withMeetingId(meetingID);
        createAttendeeRequest.setExternalUserId(uuid.toString());

        CreateAttendeeResult createAttendeeResult = chime.createAttendee(createAttendeeRequest);

        String attendeeId = createAttendeeResult.getAttendee().getAttendeeId();
        String attendeeJoinToken = createAttendeeResult.getAttendee().getJoinToken();


        return meetingID;

    }

    public MeetingDTO createNewMeetingInfo() {

        AmazonChime chime = AmazonChimeClientBuilder
                .standard().build();

        CreateMeetingRequest createMeetingRequest = new CreateMeetingRequest();

        UUID uuid = UUID.randomUUID();
        createMeetingRequest.setClientRequestToken(uuid.toString());
        createMeetingRequest.setMediaRegion("us-east-1");
        createMeetingRequest.setMeetingHostId("veraop");

        CreateMeetingResult meetingResult = chime.createMeeting(createMeetingRequest);

        Meeting meeting = meetingResult.getMeeting();

        String meetingID = meeting.getMeetingId();

        System.out.println("Scheduled meeting ID is :" + meetingID);

        CreateAttendeeRequest createAttendeeRequest = new CreateAttendeeRequest().withMeetingId(meetingID);
        createAttendeeRequest.setExternalUserId(uuid.toString());

        CreateAttendeeResult createAttendeeResult = chime.createAttendee(createAttendeeRequest);

        Attendee attendee = createAttendeeResult.getAttendee();

        Map<Meeting, Attendee> meetingData = new HashMap<>();
        meetingData.put(meeting, attendee);

        MeetingDTO meetingDTO = new MeetingDTO();
        meetingDTO.setMeetingObject(meeting);
        meetingDTO.setAttendeeObject(attendee);

        return meetingDTO;
    }


}
