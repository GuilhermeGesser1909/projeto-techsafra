// ================================
// HOME.JS — TechSafra
// ================================

// 👋 Saudação personalizada
function saudacaoPersonalizada() {
  const agora = new Date();
  const hora = agora.getHours();
  let saudacao = "Bem-vindo 👋";

  if (hora >= 5 && hora < 12) saudacao = "Bom dia ☀️";
  else if (hora >= 12 && hora < 18) saudacao = "Boa tarde 🌿";
  else saudacao = "Boa noite 🌙";

  const nomeUser = JSON.parse(localStorage.getItem("loggedUser"))?.nome || "";
  const saudacaoEl = document.getElementById("saudacao");
  const mensagemDiaEl = document.getElementById("mensagem-dia");

  if (saudacaoEl) saudacaoEl.textContent = `${saudacao}${nomeUser ? ", " + nomeUser : ""}`;
  if (mensagemDiaEl) mensagemDiaEl.textContent = "Tenha um ótimo dia no campo!";
}

// 🌱 Carregar notícias simuladas (você pode futuramente integrar com API real)
function carregarNoticias() {
  const listaNoticias = document.getElementById("lista-noticias");
  if (!listaNoticias) return;

  const noticias = [
    {
      titulo: "🌾 Colheita recorde no interior de SP",
      texto: "Produtores comemoram uma das maiores safras da década."
    },
    {
      titulo: "🌱 Nova tecnologia auxilia irrigação inteligente",
      texto: "Solução promete reduzir o consumo de água em até 30%."
    },
    {
      titulo: "☀️ Previsão do tempo: clima seco favorece plantio",
      texto: "Especialistas apontam janela ideal para o cultivo de milho."
    }
  ];

  noticias.forEach((noticia, index) => {
    const item = document.createElement("div");
    item.classList.add("noticia-item");
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    item.innerHTML = `
      <h4>${noticia.titulo}</h4>
      <p>${noticia.texto}</p>
    `;

    listaNoticias.appendChild(item);

    // ⏳ Animação de entrada
    setTimeout(() => {
      item.style.transition = "all 0.4s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, 200 * index);
  });
}

// 🚪 Logout
function logout() {
  localStorage.removeItem("loggedUser");
  window.location.href = "/template/PaginaInicial.html";
}

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  saudacaoPersonalizada();
  carregarNoticias();
});
