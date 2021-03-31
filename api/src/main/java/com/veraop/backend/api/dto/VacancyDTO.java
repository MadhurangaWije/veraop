package com.veraop.backend.api.dto;

public class VacancyDTO {
    private String team;
    private String jobBand;
    private int positions;

    public VacancyDTO() {
    }

    public VacancyDTO(String team, String jobBand, int positions) {
        this.team = team;
        this.jobBand = jobBand;
        this.positions = positions;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getJobBand() {
        return jobBand;
    }

    public void setJobBand(String jobBand) {
        this.jobBand = jobBand;
    }

    public int getPositions() {
        return positions;
    }

    public void setPositions(int positions) {
        this.positions = positions;
    }
}
