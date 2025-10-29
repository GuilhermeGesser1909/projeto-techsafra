package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.service.PropriedadeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/propriedades")
public class PropriedadeController {

    private final PropriedadeService service;

    public PropriedadeController(PropriedadeService service) {
        this.service = service;
    }

    @GetMapping
    public List<PropriedadeModel> listar() {
        return service.listarTodas();
    }

    @GetMapping("/{id}")
    public PropriedadeModel buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public PropriedadeModel salvar(@RequestBody PropriedadeDto dto) {
        return service.salvar(dto);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}
