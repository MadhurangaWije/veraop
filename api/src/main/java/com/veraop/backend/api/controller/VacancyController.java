package com.veraop.backend.api.controller;

import com.veraop.backend.api.dto.VacancyDTO;
import com.veraop.backend.api.model.Vacancy;
import com.veraop.backend.api.service.VacancyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VacancyController {

    @Autowired
    private VacancyService vacancyService;

    @PostMapping("/vacancies")
    @CrossOrigin(origins = "*")
    public void createVacancy(@RequestBody VacancyDTO dto){
        vacancyService.createVacancy(dto);
    }

    @GetMapping("/vacancies")
    @CrossOrigin(origins = "*")
    public List<Vacancy> getAllVacancies(){
        return vacancyService.getAllVacancies();
    }

    @GetMapping("/vacancies/{id}")
    @CrossOrigin(origins = "*")
    public Vacancy getVacancy(@PathVariable int id){
        return vacancyService.getVacancy(id);
    }
}
