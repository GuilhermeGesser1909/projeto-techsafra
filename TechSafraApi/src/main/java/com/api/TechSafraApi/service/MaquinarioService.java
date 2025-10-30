package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.MaquinarioDto;
import com.api.TechSafraApi.model.MaquinarioModel;

import java.util.List;

public interface MaquinarioService {
    List<MaquinarioModel> listarTodas();
    MaquinarioModel salvar(MaquinarioModel maquinario);
    MaquinarioModel buscarPorId(Long id);
    void deletar(Long id);
    MaquinarioModel salvar(MaquinarioDto dto);
}
