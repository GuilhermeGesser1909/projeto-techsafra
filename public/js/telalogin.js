
const formLogin = document.getElementById("login-form");

// Evento de envio do formulário
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede o comportamento padrão do formulário

  // Captura os dados dos campos
  const email = document.getElementById("usuario").value.trim();
  const senha = document.getElementById("password").value.trim();

  // Monta o objeto para enviar ao backend
  const usuario = { email, senha };

  try {
    // Faz a requisição para o backend (ajuste a URL se seu backend estiver em outro lugar)
    const response = await fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    // Se o login for bem-sucedido
    if (response.ok) {
      const mensagem = await response.text();

      // Exibe uma mensagem rápida antes do redirecionamento
      alert("✅ " + mensagem);

      // Redireciona para a tela home
      window.location.href = "./home.html";
    } else {
      // Caso o login falhe
      const erro = await response.text();
      alert("❌ " + erro);
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    alert("🚫 Falha ao conectar ao servidor. Verifique se o backend está rodando.");
  }
});

// Função para mostrar/ocultar senha
function togglePassword(idCampo) {
  const campo = document.getElementById(idCampo);
  const tipo = campo.getAttribute("type") === "password" ? "text" : "password";
  campo.setAttribute("type", tipo);
}

