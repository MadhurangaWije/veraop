package com.veraop.backend.api.controller;

import com.veraop.backend.api.model.CommonMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @GetMapping("/")
    public ResponseEntity<CommonMessage> root(){
        return ResponseEntity.ok(new CommonMessage("VERAOP REST API"));
    }
}
