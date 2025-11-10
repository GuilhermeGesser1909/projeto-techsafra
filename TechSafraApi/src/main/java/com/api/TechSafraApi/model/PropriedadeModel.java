package com.api.TechSafraApi.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TB_PROPRIEDADE")
public class PropriedadeModel implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 100)
    private String localizacao;

    @Column(nullable = false)
    private double areaHectares;

    // 🔹 Relacionamento com o usuário (muitas propriedades -> um usuário)
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    // 🔹 Construtores
    public PropriedadeModel() {}

    public PropriedadeModel(String nome, String localizacao, double areaHectares, Usuario usuario) {
        this.nome = nome;
        this.localizacao = localizacao;
        this.areaHectares = areaHectares;
        this.usuario = usuario;
    }

    // 🔹 Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public double getAreaHectares() { return areaHectares; }
    public void setAreaHectares(double areaHectares) { this.areaHectares = areaHectares; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

}
