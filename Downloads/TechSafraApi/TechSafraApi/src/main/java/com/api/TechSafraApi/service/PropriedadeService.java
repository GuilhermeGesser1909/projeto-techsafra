package com.api.TechSafraApi.service;

import com.api.TechSafraApi.model.PropriedadeModel;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PropriedadeService {
    List<PropriedadeModel> findAll();
    Optional<PropriedadeModel> findById(UUID id);
    PropriedadeModel save(PropriedadeModel propriedade);
    void delete(PropriedadeModel propriedade);
}
