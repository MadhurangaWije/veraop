package com.veraop.backend.api.repo;


import com.veraop.backend.api.model.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewEntityRepository extends JpaRepository<InterviewEntity, Long> {
}
