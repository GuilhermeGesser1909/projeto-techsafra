document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPropriedade");
  const resultado = document.getElementById("resultado");
  const API_URL = "http://localhost:8080/propriedades";

  // 🔹 Pega o ID do usuário logado salvo no localStorage
  const usuarioId = localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Usuário não autenticado! Faça login primeiro.");
    window.location.href = "/template/telalogin.html";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nomePropriedade").value.trim();
    const localizacao = document.getElementById("nomecidade").value.trim();
    const areaHectares = parseFloat(document.getElementById("tamanhopropriedade").value);

    if (!nome || !localizacao || isNaN(areaHectares)) {
      resultado.innerHTML = `<p style="color:red;">❌ Preencha todos os campos corretamente.</p>`;
      return;
    }

    const novaPropriedade = { nome, localizacao, areaHectares, usuarioId: parseInt(usuarioId) };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPropriedade),
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro || "Erro ao cadastrar propriedade.");
      }

      const propriedadeCriada = await response.json();

      resultado.innerHTML = `
        <p style="color:green;"><strong>✅ Propriedade cadastrada com sucesso!</strong></p>
        <p><strong>Nome:</strong> ${propriedadeCriada.nome}</p>
        <p><strong>Localização:</strong> ${propriedadeCriada.localizacao}</p>
        <p><strong>Área:</strong> ${propriedadeCriada.areaHectares} ha</p>
      `;

      form.reset();

      // 🔹 Redireciona pro dashboard após 2 segundos
      setTimeout(() => {
        window.location.href = "/template/home.html";
      }, 2000);
    } catch (error) {
      console.error(error);
      resultado.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    }
  });
});
