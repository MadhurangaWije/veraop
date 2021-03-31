package com.veraop.backend.api.dto;

import lombok.Data;

@Data
public class OnboardResponseDataDTO {

    private Long id;

    private String firstName;
    private String lastName;
    private String address;
    private String bank;
    private String branch;
    private String branchCode;
    private String accountNo;
    private String userId;
    private String emailAddress;
}
