package com.veraop.backend.api.dto;

import org.springframework.web.multipart.MultipartFile;
import lombok.Data;
/**
 * A DTO class to hold and transfer data to uplaod intevriew video
 */
@Data
public class InterviewVideo {
    private String candidateId;
    private MultipartFile interviewVideo;
}
