package com.veraop.backend.api.dto;

import com.veraop.backend.api.model.JobApplication;
import com.veraop.backend.api.model.Vacancy;

public class JobApplicationResponseDTO {
    private int id;

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

    private String status;

    private Vacancy vacancy;

    public JobApplicationResponseDTO() {
    }

    public JobApplicationResponseDTO(int id, String firstName, String lastName, String email, String mobileNumber, String address, String linkedInOrBlog, String openSourceContributions, int totalYearsOfWorkExperience, String highestEduQualification, String degree, String university, String yearOfGraduation, String currentDesignation, String companyName, int workDuration, String publications, String achievements, String fileName, String status, Vacancy vacancy) {
        this.id = id;
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
        this.status = status;
        this.vacancy = vacancy;
    }

    public JobApplicationResponseDTO(JobApplication jobApplication, Vacancy vacancy){
        this.id = jobApplication.getId();
        this.firstName = jobApplication.getFirstName();
        this.lastName = jobApplication.getLastName();
        this.email = jobApplication.getEmail();
        this.mobileNumber = jobApplication.getMobileNumber();
        this.address = jobApplication.getAddress();
        this.linkedInOrBlog = jobApplication.getLinkedInOrBlog();
        this.openSourceContributions = jobApplication.getOpenSourceContributions();
        this.totalYearsOfWorkExperience = jobApplication.getTotalYearsOfWorkExperience();
        this.highestEduQualification = jobApplication.getHighestEduQualification();
        this.degree = jobApplication.getDegree();
        this.university = jobApplication.getUniversity();
        this.yearOfGraduation = jobApplication.getYearOfGraduation();
        this.currentDesignation = jobApplication.getCurrentDesignation();
        this.companyName = jobApplication.getCompanyName();
        this.workDuration = jobApplication.getWorkDuration();
        this.publications = jobApplication.getPublications();
        this.achievements = jobApplication.getAchievements();
        this.fileName = jobApplication.getFileName();
        this.vacancy = vacancy;
        this.status = jobApplication.getStatus();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Vacancy getVacancy() {
        return vacancy;
    }

    public void setVacancy(Vacancy vacancy) {
        this.vacancy = vacancy;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
