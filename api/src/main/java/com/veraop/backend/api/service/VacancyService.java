package com.veraop.backend.api.service;

import com.veraop.backend.api.dto.VacancyDTO;
import com.veraop.backend.api.model.Vacancy;
import com.veraop.backend.api.repo.VacancyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VacancyService {

    @Autowired
    private VacancyRepository vacancyRepository;

    public void createVacancy(VacancyDTO vacancy){
        Vacancy vacancyEntity = new Vacancy(vacancy.getTeam(),vacancy.getJobBand(), vacancy.getPositions());
        vacancyRepository.save(vacancyEntity);
    }

    public List<Vacancy> getAllVacancies(){
        return vacancyRepository.findAll();
    }

    public Vacancy getVacancy(int id){
        return vacancyRepository.findById(id).orElseThrow();
    }
}
