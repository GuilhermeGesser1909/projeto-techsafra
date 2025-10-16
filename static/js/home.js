// Saudação com nome do usuário e horário do dia
document.addEventListener("DOMContentLoaded", () => {
  const saudacao = document.getElementById("saudacao");
  const mensagemDia = document.getElementById("mensagem-dia");
  const nomeUsuario = localStorage.getItem("usuario");
  const hora = new Date().getHours();

  let saudacaoTexto = "Bem-vindo";
  if (hora >= 5 && hora < 12) saudacaoTexto = "Bom dia";
  else if (hora >= 12 && hora < 18) saudacaoTexto = "Boa tarde";
  else saudacaoTexto = "Boa noite";

  if (nomeUsuario && nomeUsuario.trim() !== "") {
    saudacao.textContent = `${saudacaoTexto}, ${nomeUsuario} 👋`;
  } else {
    saudacao.textContent = `${saudacaoTexto} 👋`;
  }

  // Mensagem do dia dinâmica
  const frases = [
    "🌾 Que sua safra seja próspera hoje!",
    "☀️ Clima estável favorece o plantio!",
    "🚜 Lembre-se de revisar o maquinário.",
    "🌱 O campo agradece bons cuidados.",
  ];
  mensagemDia.textContent =
    frases[Math.floor(Math.random() * frases.length)];

  carregarNoticias();
});

// Função para simular notícias da região
function carregarNoticias() {
  const container = document.getElementById("lista-noticias");
  const noticias = [
    {
      titulo: "Produtores comemoram boas chuvas",
      texto: "Chuvas regulares impulsionam a produtividade de soja e milho nesta semana.",
      data: "14/10/2025",
    },
    {
      titulo: "Feira AgroTech movimenta o setor",
      texto: "Evento reúne produtores e empresas de tecnologia agrícola com foco em sustentabilidade.",
      data: "13/10/2025",
    },
    {
      titulo: "Clima deve favorecer colheita",
      texto: "Previsão indica dias secos e ensolarados ideais para avanço da colheita.",
      data: "12/10/2025",
    },
  ];

  noticias.forEach((noticia) => {
    const card = document.createElement("div");
    card.classList.add("card-noticia");
    card.innerHTML = `
      <h4>${noticia.titulo}</h4>
      <p>${noticia.texto}</p>
      <div class="data">📅 ${noticia.data}</div>
    `;
    container.appendChild(card);
  });
}

// Função de logout — limpa nome salvo e volta para página inicial
function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "/PaginaInicial.html";
}
