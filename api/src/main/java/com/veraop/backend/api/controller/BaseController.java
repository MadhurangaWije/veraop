package com.veraop.backend.api.controller;

import com.veraop.backend.api.model.CommonMessage;
import com.veraop.backend.api.service.SampleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BaseController {

    @Autowired
    private SampleDataService dataService;

    @GetMapping("/")
    public ResponseEntity<CommonMessage> root(){
        return ResponseEntity.ok(new CommonMessage("VERAOP REST API"));
    }

    @GetMapping("/testdb")
    public void testDb(){
        dataService.saveData();
    }
}
