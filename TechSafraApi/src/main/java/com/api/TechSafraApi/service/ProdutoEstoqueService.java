package com.api.TechSafraApi.service;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;

import java.util.List;

public interface ProdutoEstoqueService {
    List<ProdutoEstoqueModel> listarTodas();
    ProdutoEstoqueModel salvar(ProdutoEstoqueModel produto);
    ProdutoEstoqueModel buscarPorId(Long id);
    void deletar(Long id);
    ProdutoEstoqueModel salvar(ProdutoEstoqueDto dto);
}
