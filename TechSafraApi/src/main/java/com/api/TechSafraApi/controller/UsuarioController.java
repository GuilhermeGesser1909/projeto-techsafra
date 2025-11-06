package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public String cadastrar(@RequestBody Map<String, String> body) {
        String nome = body.get("nome");
        String email = body.get("email");
        String senha = body.get("senha");
        String confirmarSenha = body.get("confirmarSenha");

        return usuarioService.cadastrarUsuario(nome, email, senha, confirmarSenha);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        String resultado = usuarioService.loginUsuario(email, senha);

        switch (resultado) {
            case "E-mail e senha são obrigatórios!":
            case "E-mail não cadastrado!":
            case "Senha incorreta!":
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resultado);
            default:
                return ResponseEntity.ok(resultado);
        }
    }
}