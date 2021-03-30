package com.veraop.backend.api.service.onboard;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class S3Upload {

    public static final String BUCKET_NAME = "completed-interviews";

    public void uploadFile(String userId, MultipartFile file) throws IOException {

        AmazonS3 s3Client = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        s3Client.putObject(BUCKET_NAME, userId + "/" + file.getOriginalFilename(),
                file.getInputStream(), metadata);

        
    }
}
