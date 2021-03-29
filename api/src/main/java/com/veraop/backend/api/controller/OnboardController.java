package com.veraop.backend.api.controller;

import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.dto.OnboardRequestDataDTO;
import com.veraop.backend.api.service.onboard.OnboardHandlerService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * The controller class which will expose the REST API endpoint for operations related to onboard process
 */
@RestController
public class OnboardController {

    private final OnboardHandlerService onboardService;

    public OnboardController(OnboardHandlerService onboardService) {
        this.onboardService = onboardService;
    }

    /**
     * Listen to onboard request comes from the UI.
     *
     * @param requestData information of the user that needs to be onboarded.
     * @return
     * @throws IOException
     */
    @PostMapping(path = "onboard")
    @CrossOrigin(origins = "*")
    public CommonMessage intimateOnboard(@ModelAttribute OnboardRequestDataDTO requestData) throws IOException {

        onboardService.initiateOnboard(requestData);

        return new CommonMessage("Success");
    }
}
