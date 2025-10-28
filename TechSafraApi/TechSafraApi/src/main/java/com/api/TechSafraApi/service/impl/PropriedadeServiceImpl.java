package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import com.api.TechSafraApi.service.PropriedadeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PropriedadeServiceImpl implements PropriedadeService {

    private final PropriedadeRepository repository;

    public PropriedadeServiceImpl(PropriedadeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<PropriedadeModel> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<PropriedadeModel> findById(UUID id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public PropriedadeModel save(PropriedadeModel propriedade) {
        return repository.save(propriedade);
    }

    @Override
    @Transactional
    public void delete(PropriedadeModel propriedade) {
        repository.delete(propriedade);
    }
}
