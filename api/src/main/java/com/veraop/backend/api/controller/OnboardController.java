package com.veraop.backend.api.controller;

import com.veraop.backend.api.dto.OnboardResponseDataDTO;
import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.dto.OnboardRequestDataDTO;
import com.veraop.backend.api.model.OnboardDetail;
import com.veraop.backend.api.service.onboard.OnboardHandlerService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping(path = "onboard")
    @CrossOrigin(origins = "*")
    public List<OnboardResponseDataDTO> getAllOnboard() {

        return onboardService.findAllOnboard().stream().map(OnboardDetail::toDTO).collect(Collectors.toList());
    }

    @GetMapping(path = "onboard/{userId}")
    @CrossOrigin(origins = "*")
    public OnboardDetail getOnboardDetailOf(@PathVariable(name = "userId") String userId) {

        return onboardService.findOnboardDetailOf(userId);
    }
}
