package com.veraop.backend.api.repo;


import com.veraop.backend.api.model.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewEntityRepository extends JpaRepository<InterviewEntity, Long> {

    List<InterviewEntity> findByIsCompleted(int isCompleted);

    Optional<InterviewEntity> findByCandidateId(String candidateId);

    List<InterviewEntity> findByIsCompletedAndIsSelected(int isCompleted,int isSelected);
}
