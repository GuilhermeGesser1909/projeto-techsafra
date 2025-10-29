package com.api.TechSafraApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public record PropriedadeDto(
        @NotBlank String nome,
        @NotBlank String localizacao,
        @Positive double areaHectares
) {}
