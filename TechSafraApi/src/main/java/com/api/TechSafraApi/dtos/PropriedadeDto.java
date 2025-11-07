package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

// DTO para criação de propriedade vinculada a um usuário
public record PropriedadeDto(
        @NotBlank String nome,
        @NotBlank String localizacao,
        @Positive double areaHectares,
        @NotNull Long usuarioId
) { }
