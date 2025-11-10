package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.ProdutoEstoqueDto;
import com.api.TechSafraApi.model.ProdutoEstoqueModel;
import com.api.TechSafraApi.service.ProdutoEstoqueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produtos-estoque")
public class ProdutoEstoqueController {

    private final ProdutoEstoqueService service;

    public ProdutoEstoqueController(ProdutoEstoqueService service) {
        this.service = service;
    }

    @GetMapping
    public List<ProdutoEstoqueModel> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public ProdutoEstoqueModel buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ProdutoEstoqueModel salvar(@RequestBody ProdutoEstoqueDto dto) {
        return service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
