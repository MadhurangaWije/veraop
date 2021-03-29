package com.veraop.backend.api.repo;

import com.veraop.backend.api.model.OnboardDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnboardDetailRepository extends JpaRepository<OnboardDetail, Long> {
}
