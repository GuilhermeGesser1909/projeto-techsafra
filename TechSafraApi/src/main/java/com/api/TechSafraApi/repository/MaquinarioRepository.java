package com.api.TechSafraApi.repository;

import com.api.TechSafraApi.model.MaquinarioModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MaquinarioRepository extends JpaRepository<MaquinarioModel, UUID> {

    void deleteById(Long id);

    Optional<MaquinarioModel> findById(Long id);
}
