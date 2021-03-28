package com.veraop.backend.api.service;

import com.veraop.backend.api.model.SampleDataEntity;
import com.veraop.backend.api.repo.SampleDataEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SampleDataService {

    @Autowired
    private SampleDataEntityRepository sampleDataEntityRepository;

    public void saveData(){
        sampleDataEntityRepository.save(new SampleDataEntity(1231, "Kanishka", "Wijesekara"));
    }
}
