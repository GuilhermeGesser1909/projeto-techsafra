document.addEventListener("DOMContentLoaded", () => {
  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const mensagem = document.getElementById("mensagem");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  const btnEnviarCodigo = document.getElementById("btnEnviarCodigo");
  const btnRedefinirSenha = document.getElementById("btnRedefinirSenha");

  btnEnviarCodigo.addEventListener("click", () => {
    const email = document.getElementById("emailRecuperacao").value.trim();

    if (!email) {
      mensagem.textContent = "Por favor, insira seu e-mail.";
      mensagem.style.color = "red";
      return;
    }

    mensagem.textContent = "Um código de verificação foi enviado para " + email;
    mensagem.style.color = "green";

    // Transição suave
    step1.style.opacity = 0;
    setTimeout(() => {
      step1.style.display = "none";
      step2.style.display = "block";
      step2.style.opacity = 1;
    }, 400);
  });

  btnRedefinirSenha.addEventListener("click", () => {
    const codigo = document.getElementById("codigoVerificacao").value.trim();
    const novaSenha = document.getElementById("novaSenha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    if (!codigo || !novaSenha || !confirmarSenha) {
      mensagem.textContent = "Preencha todos os campos.";
      mensagem.style.color = "red";
      return;
    }

    if (novaSenha !== confirmarSenha) {
      mensagem.textContent = "As senhas não coincidem.";
      mensagem.style.color = "red";
      return;
    }

    mensagem.textContent = "Senha redefinida com sucesso! Redirecionando...";
    mensagem.style.color = "green";

    setTimeout(() => {
      window.location.href = "telalogin.html";
    }, 2000);
  });
});
