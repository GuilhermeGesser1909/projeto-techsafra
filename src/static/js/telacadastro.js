function togglePassword(id) {
const input = document.getElementById(id);
input.type = input.type === "password" ? "text" : "password";
}

document.getElementById("year").innerText = new Date().getFullYear();

const form = document.getElementById("cadastroForm");
const mensagem = document.getElementById("mensagemCadastro");

// 🔧 Configure aqui o endpoint real do backend
const BASE_URL = "http://localhost:8080/api/usuarios/cadastrar"; // altere se necessário

form.addEventListener("submit", async (e) => {
e.preventDefault();

const nome = form.nome.value.trim();
const email = form.email.value.trim();
const senha = form.senha.value;
const confirmarSenha = form.confirmarSenha.value;

if (senha !== confirmarSenha) {
mostrarMensagem("As senhas não coincidem!", "erro");
return;
}

try {
const response = await fetch(BASE_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ nome, email, senha })
});

if (response.ok) {
  mostrarMensagem("Usuário cadastrado com sucesso!", "sucesso");

  // Armazena dados no sessionStorage para preencher login automaticamente
  //sessionStorage.setItem("emailCadastro", email);
  //sessionStorage.setItem("senhaCadastro", senha);

  // Redireciona após 2 segundos
  setTimeout(() => {
    window.location.href = "./telalogin.html";
  }, 2000);
} else {
  const erro = await response.text();
  mostrarMensagem("Erro ao cadastrar: " + erro, "erro");
}

} catch (err) {
mostrarMensagem("Falha ao conectar ao servidor.", "erro");
}
});

function mostrarMensagem(texto, tipo) {
mensagem.textContent = texto;
mensagem.className = "mensagem " + tipo;
}