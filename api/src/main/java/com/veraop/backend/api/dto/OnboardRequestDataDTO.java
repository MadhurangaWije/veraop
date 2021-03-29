package com.veraop.backend.api.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * A DTO class to hold and transfer data from the onboard API request.
 */
public class OnboardRequestDataDTO {
    private String userId;
    private String firstName;
    private String lastName;
    private String address;
    private String emailAddress;
    private MultipartFile bankDetailImage;
    private MultipartFile nicImage;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public MultipartFile getNicImage() {
        return nicImage;
    }

    public void setNicImage(MultipartFile nicImage) {
        this.nicImage = nicImage;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public MultipartFile getBankDetailImage() {
        return bankDetailImage;
    }

    public void setBankDetailImage(MultipartFile bankDetailImage) {
        this.bankDetailImage = bankDetailImage;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
