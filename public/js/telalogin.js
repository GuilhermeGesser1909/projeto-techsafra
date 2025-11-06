const formLogin = document.getElementById("login-form");
const mensagemLogin = document.getElementById("mensagemLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  // Captura os dados dos campos
  const email = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("password").value.trim();

  // Monta o objeto para enviar ao backend
  const usuario = { email, senha };

  try {
    // Faz a requisição para o backend
    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });

    if (response.ok) {
      const mensagem = await response.text();
      mostrarMensagemLogin("✅ " + mensagem, "sucesso");

      // Redireciona após 1,5 segundos
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 1500);
    } else {
      const erro = await response.text();
      mostrarMensagemLogin("❌ " + erro, "erro");
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    mostrarMensagemLogin("🚫 Falha ao conectar ao servidor. Verifique se o backend está rodando.", "erro");
  }
});

// Função para mostrar mensagens na tela de login
function mostrarMensagemLogin(texto, tipo) {
  mensagemLogin.textContent = texto;
  mensagemLogin.className = "mensagem " + tipo;
}


// ========================= MOSTRAR / OCULTAR SENHA =========================

function togglePassword(idCampo) {
  const campo = document.getElementById(idCampo);
  campo.type = campo.type === "password" ? "text" : "password";
}