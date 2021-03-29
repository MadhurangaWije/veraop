package com.veraop.backend.api.service.onboard;

import com.veraop.backend.api.model.BankDetailDTO;
import com.veraop.backend.api.model.OnboardRequestDataDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class OnboardHandlerService {

    private final TextExtractorService textService;
    private final S3Service s3Client;
    private final EmailService emailClient;
    private final DatabaseService database;

    public OnboardHandlerService(TextExtractorService textService,
                                 S3Service s3Client,
                                 EmailService emailClient,
                                 DatabaseService database) {
        this.textService = textService;
        this.s3Client = s3Client;
        this.emailClient = emailClient;
        this.database = database;
    }

    public void initiateOnboard(OnboardRequestDataDTO request) throws IOException {

        BankDetailDTO bankDetails = textService.identifyBankDetails(request.getBankDetailImage());
        bankDetails.setUserId(request.getUserId());

//        BankDetailDTO bankDetails = new BankDetailDTO();
//        bankDetails.setBank("People's Bank");
//        bankDetails.setBranchCode("Branch Code");
//        bankDetails.setBranch("Branch Name");
//        bankDetails.setAccountNo("Account No");
//        bankDetails.setUserId(request.getUserId());

        database.saveOnboardDetails(bankDetails, request);

        s3Client.uploadFiles(request.getUserId(), request.getNicImage(), request.getBankDetailImage());

        emailClient.sendEmail(request);
    }

}
