package com.veraop.backend.api.repo;

import com.veraop.backend.api.model.SampleDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SampleDataEntityRepository extends JpaRepository<SampleDataEntity, Long> {
}
