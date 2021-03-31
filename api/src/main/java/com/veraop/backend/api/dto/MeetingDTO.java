package com.veraop.backend.api.dto;

import com.amazonaws.services.chime.model.Attendee;
import com.amazonaws.services.chime.model.Meeting;
import lombok.Data;

@Data
public class MeetingDTO {
    private Meeting meetingObject;
    private Attendee attendeeObject;
}