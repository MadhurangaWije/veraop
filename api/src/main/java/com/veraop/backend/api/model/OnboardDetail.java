package com.veraop.backend.api.model;

import com.veraop.backend.api.dto.OnboardResponseDataDTO;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entity class to represent onboard details table
 */
@Entity
public class OnboardDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    public OnboardDetail() {
    }

    public OnboardDetail(String firstName, String lastName, String address, String bank, String branch,
                         String branchCode, String accountNo, String userId, String emailAddress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.bank = bank;
        this.branch = branch;
        this.branchCode = branchCode;
        this.accountNo = accountNo;
        this.userId = userId;
        this.emailAddress = emailAddress;
    }

    public OnboardResponseDataDTO toDTO() {
        OnboardResponseDataDTO dto = new OnboardResponseDataDTO();
        dto.setId(this.id);
        dto.setFirstName(this.firstName);
        dto.setLastName(this.lastName);
        dto.setAddress(this.address);
        dto.setBank(this.bank);
        dto.setBranch(this.branch);
        dto.setBranchCode(this.branchCode);
        dto.setAccountNo(this.accountNo);
        dto.setUserId(this.userId);
        dto.setEmailAddress(this.emailAddress);

        return dto;
    }
}
