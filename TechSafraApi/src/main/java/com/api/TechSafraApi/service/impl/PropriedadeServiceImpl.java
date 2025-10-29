package com.api.TechSafraApi.service.impl;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.repository.PropriedadeRepository;
import com.api.TechSafraApi.service.PropriedadeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropriedadeServiceImpl implements PropriedadeService {

    private final PropriedadeRepository repository;

    public PropriedadeServiceImpl(PropriedadeRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<PropriedadeModel> listarTodas() {
        return repository.findAll();
    }

    @Override
    public PropriedadeModel salvar(PropriedadeModel propriedade) {
        return repository.save(propriedade);
    }

    @Override
    public PropriedadeModel buscarPorId(Long id) {
        Optional<PropriedadeModel> propriedade = repository.findById(id);
        return propriedade.orElse(null);
    }

    @Override
    public void deletar(Long id) {
        repository.deleteById(id);
    }
    
    @Override
    public PropriedadeModel salvar(PropriedadeDto dto) {
        PropriedadeModel model = new PropriedadeModel();
        model.setNome(dto.getNome());
        model.setLocalizacao(dto.getLocalizacao());
        model.setArea(dto.getArea());
        return repository.save(model);
    }
}
