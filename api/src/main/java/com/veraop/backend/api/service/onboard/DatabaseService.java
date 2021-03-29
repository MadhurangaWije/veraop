package com.veraop.backend.api.service.onboard;

import com.veraop.backend.api.dto.BankDetailDTO;
import com.veraop.backend.api.model.OnboardDetail;
import com.veraop.backend.api.dto.OnboardRequestDataDTO;
import com.veraop.backend.api.repo.OnboardDetailRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * A service class to manage functionality related to database operations related to onboard process.
 * Acts as a middleman between another service class and database layer.
 */
@Service
@Transactional
public class DatabaseService {

    private final OnboardDetailRepository onboardDetailRepository;

    public DatabaseService(OnboardDetailRepository onboardDetailRepository) {
        this.onboardDetailRepository = onboardDetailRepository;
    }

    /**
     * Saves given onboard information in database
     *
     * @param bankDetails bank details of the given user
     * @param requestData data from onboard request
     */
    public void saveOnboardDetails(BankDetailDTO bankDetails, OnboardRequestDataDTO requestData) {

        OnboardDetail onboardDetail = new OnboardDetail(
                requestData.getFirstName(),
                requestData.getLastName(),
                requestData.getAddress(),
                bankDetails.getBank(),
                bankDetails.getBranch(),
                bankDetails.getBranchCode(),
                bankDetails.getAccountNo(),
                requestData.getUserId(),
                requestData.getEmailAddress()
        );

        onboardDetailRepository.save(onboardDetail);
    }
}
