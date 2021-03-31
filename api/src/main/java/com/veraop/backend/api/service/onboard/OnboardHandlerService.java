package com.veraop.backend.api.service.onboard;

import com.veraop.backend.api.dto.BankDetailDTO;
import com.veraop.backend.api.dto.OnboardRequestDataDTO;
import com.veraop.backend.api.model.OnboardDetail;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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

    public List<OnboardDetail> findAllOnboard() {

        return database.findAllOnboard();
    }

    public OnboardDetail findOnboardDetailOf(String userId) {

        return database.findOnboardDetailsOf(userId);
    }
}
