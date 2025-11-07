package com.api.TechSafraApi.controller;

import com.api.TechSafraApi.model.Usuario;
import com.api.TechSafraApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // libera para o front acessar
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Autowired
    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 🔹 Cadastrar novo usuário
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrar(@RequestBody Map<String, String> body) {
        String nome = body.get("nome");
        String email = body.get("email");
        String senha = body.get("senha");
        String confirmarSenha = body.get("confirmarSenha");

        String resultado = usuarioService.cadastrarUsuario(nome, email, senha, confirmarSenha);

        if (resultado.equals("Usuário cadastrado com sucesso!")) {
            return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resultado);
        }
    }

    // 🔹 Login de usuário
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

    // 🔹 (Opcional) Buscar todos os usuários - útil pra testar
    @GetMapping
    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    // 🔹 (Opcional) Buscar usuário por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarPorId(id);
        return ResponseEntity.ok(usuario);
    }
}
