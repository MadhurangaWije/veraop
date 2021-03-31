package com.veraop.backend.api.dto;

public class JobApplicationDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNumber;
    private String address;
    private String linkedInOrBlog;
    private String openSourceContributions;
    private int totalYearsOfWorkExperience;

    private String highestEduQualification;
    private String degree;
    private String university;
    private String yearOfGraduation;

    private String currentDesignation;
    private String companyName;
    private int workDuration;

    private String publications;
    private String achievements;
    private String fileName;
    private int vacancyId;

    private String status;

    public JobApplicationDTO() {
    }

    public JobApplicationDTO(String firstName, String lastName, String email, String mobileNumber, String address, String linkedInOrBlog, String openSourceContributions, int totalYearsOfWorkExperience, String highestEduQualification, String degree, String university, String yearOfGraduation, String currentDesignation, String companyName, int workDuration, String publications, String achievements, String fileName, int vacancyId, String status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.linkedInOrBlog = linkedInOrBlog;
        this.openSourceContributions = openSourceContributions;
        this.totalYearsOfWorkExperience = totalYearsOfWorkExperience;
        this.highestEduQualification = highestEduQualification;
        this.degree = degree;
        this.university = university;
        this.yearOfGraduation = yearOfGraduation;
        this.currentDesignation = currentDesignation;
        this.companyName = companyName;
        this.workDuration = workDuration;
        this.publications = publications;
        this.achievements = achievements;
        this.fileName = fileName;
        this.vacancyId = vacancyId;
        this.status = status;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getLinkedInOrBlog() {
        return linkedInOrBlog;
    }

    public void setLinkedInOrBlog(String linkedInOrBlog) {
        this.linkedInOrBlog = linkedInOrBlog;
    }

    public String getOpenSourceContributions() {
        return openSourceContributions;
    }

    public void setOpenSourceContributions(String openSourceContributions) {
        this.openSourceContributions = openSourceContributions;
    }

    public int getTotalYearsOfWorkExperience() {
        return totalYearsOfWorkExperience;
    }

    public void setTotalYearsOfWorkExperience(int totalYearsOfWorkExperience) {
        this.totalYearsOfWorkExperience = totalYearsOfWorkExperience;
    }

    public String getHighestEduQualification() {
        return highestEduQualification;
    }

    public void setHighestEduQualification(String highestEduQualification) {
        this.highestEduQualification = highestEduQualification;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getYearOfGraduation() {
        return yearOfGraduation;
    }

    public void setYearOfGraduation(String yearOfGraduation) {
        this.yearOfGraduation = yearOfGraduation;
    }

    public String getCurrentDesignation() {
        return currentDesignation;
    }

    public void setCurrentDesignation(String currentDesignation) {
        this.currentDesignation = currentDesignation;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public int getWorkDuration() {
        return workDuration;
    }

    public void setWorkDuration(int workDuration) {
        this.workDuration = workDuration;
    }

    public String getPublications() {
        return publications;
    }

    public void setPublications(String publications) {
        this.publications = publications;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getVacancyId() {
        return vacancyId;
    }

    public void setVacancyId(int vacancyId) {
        this.vacancyId = vacancyId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "JobApplicationDTO{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", address='" + address + '\'' +
                ", linkedInOrBlog='" + linkedInOrBlog + '\'' +
                ", openSourceContributions='" + openSourceContributions + '\'' +
                ", totalYearsOfWorkExperience=" + totalYearsOfWorkExperience +
                ", highestEduQualification='" + highestEduQualification + '\'' +
                ", degree='" + degree + '\'' +
                ", university='" + university + '\'' +
                ", yearOfGraduation='" + yearOfGraduation + '\'' +
                ", currentDesignation='" + currentDesignation + '\'' +
                ", companyName='" + companyName + '\'' +
                ", workDuration=" + workDuration +
                ", publications='" + publications + '\'' +
                ", achievements='" + achievements + '\'' +
                ", linkToCV='" + fileName + '\'' +
                '}';
    }
}
