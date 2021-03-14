package com.veraop.backend.api.model;

public class CommonMessage {
    private String message;

    public CommonMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
