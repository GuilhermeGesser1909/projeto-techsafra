package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.dtos.PropriedadeDto;
import com.api.TechSafraApi.model.PropriedadeModel;
import com.api.TechSafraApi.service.PropriedadeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/propriedades")
public class PropriedadeController {

    private final PropriedadeService service;

    public PropriedadeController(PropriedadeService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id) {
        Optional<PropriedadeModel> propriedade = service.findById(id);
        return propriedade.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Propriedade não encontrada"));
    }

    @PostMapping
    public ResponseEntity<PropriedadeModel> save(@RequestBody @Valid PropriedadeDto dto) {
        PropriedadeModel propriedade = new PropriedadeModel();
        propriedade.setNome(dto.nome());
        propriedade.setLocalizacao(dto.localizacao());
        propriedade.setAreaHectares(dto.areaHectares());
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(propriedade));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        Optional<PropriedadeModel> propriedade = service.findById(id);
        if (propriedade.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Propriedade não encontrada");
        }
        service.delete(propriedade.get());
        return ResponseEntity.ok("Propriedade deletada com sucesso");
    }
}
