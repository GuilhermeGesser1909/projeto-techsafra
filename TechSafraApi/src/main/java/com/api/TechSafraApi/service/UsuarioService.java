package com.api.TechSafraApi.service;

import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public String cadastrarUsuario(String nome, String email, String senha, String confirmarSenha) {
        if (!senha.equals(confirmarSenha)) {
            return "As senhas não coincidem!";
        }

        Optional<Usuario> existente = usuarioRepository.findByEmail(email);
        if (existente.isPresent()) {
            return "Email já cadastrado!";
        }

        Usuario usuario = new Usuario(nome, email, senha);
        usuarioRepository.save(usuario);
        return "Usuário cadastrado com sucesso!";
    }

    // NOVO: Método de login
    public String loginUsuario(String email, String senha) {
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);

        if (usuarioOptional.isEmpty()) {
            return "Email não cadastrado!";
        }

        Usuario usuario = usuarioOptional.get();

        if (!usuario.getSenha().equals(senha)) {
            return "Senha incorreta!";
        }

        return "Login realizado com sucesso!";
    }
}