window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const botoes = document.querySelectorAll(".sidebar button");
  const secoes = document.querySelectorAll('section[id^="section"]');

  function mostrarSecao(idBotao, idSecao) {
    secoes.forEach((secao) => (secao.style.display = "none"));
    botoes.forEach((b) => b.classList.remove("ativo"));
    document.querySelector(idSecao).style.display = "block";
    document.querySelector(idBotao).classList.add("ativo");
  }
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const id = botao.getAttribute("id");
      const numero = id.replace("botao", "");
      mostrarSecao(`#${id}`, `#section${numero}`);
    });
  });

  mostrarSecao("#botao1", "#section1");
});

// =============================================================
// 🌿 CONTROLE DE MODAIS DE EDIÇÃO — TechSafra Dashboard
// =============================================================

// Abre um modal específico
function abrirModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // bloqueia scroll do fundo
  }
}

// Fecha um modal específico
function fecharModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Fecha modal se clicar fora do conteúdo
window.addEventListener("click", (e) => {
  const modais = document.querySelectorAll(".modal");
  modais.forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});

// =============================================================
// 🌾 Funções de preenchimento simuladas (exemplo)
// =============================================================

function preencherModalPropriedade(dados) {
  document.getElementById("nomePropriedade").value = dados.nome || "";
  document.getElementById("localizacaoPropriedade").value =
    dados.localizacao || "";
  document.getElementById("areaPropriedade").value = dados.area || "";
  document.getElementById("culturaPropriedade").value = dados.cultura || "";
  document.getElementById("obsPropriedade").value = dados.obs || "";
}

function preencherModalEstoque(dados) {
  document.getElementById("produtoEstoque").value = dados.produto || "";
  document.getElementById("quantidadeEstoque").value = dados.quantidade || "";
  document.getElementById("valorUnitarioEstoque").value =
    dados.valorUnitario || "";
  document.getElementById("fornecedorEstoque").value = dados.fornecedor || "";
  document.getElementById("obsEstoque").value = dados.obs || "";
}

function preencherModalFuncionario(dados) {
  document.getElementById("nomeFuncionario").value = dados.nome || "";
  document.getElementById("cargoFuncionario").value = dados.cargo || "";
  document.getElementById("cpfFuncionario").value = dados.cpf || "";
  document.getElementById("admissaoFuncionario").value = dados.admissao || "";
  document.getElementById("desempenhoFuncionario").value =
    dados.desempenho || "";
}

function preencherModalMaquinario(dados) {
  document.getElementById("tipoMaquinario").value = dados.tipo || "";
  document.getElementById("modeloMaquinario").value = dados.modelo || "";
  document.getElementById("anoMaquinario").value = dados.ano || "";
  document.getElementById("estadoMaquinario").value = dados.estado || "";
  document.getElementById("obsMaquinario").value = dados.obs || "";
}

// =============================================================
// 🧩 Exemplo de uso — abrir modal já com dados
// =============================================================

// Exemplo: botão no HTML -> onclick="editarEstoque(id)"
function editarEstoque(id) {
  // Simula dados vindos do backend
  const dadosExemplo = {
    produto: "Sementes de Milho Premium",
    quantidade: 120,
    valorUnitario: 78.5,
    fornecedor: "AgroMix Ltda",
    obs: "Último lote recebido em 22/10/2025",
  };
  preencherModalEstoque(dadosExemplo);
  abrirModal("modalEditarEstoque");
}

function editarPropriedade(id) {
  const dados = {
    nome: "Fazenda Esperança",
    localizacao: "Chapecó - SC",
    area: 185,
    cultura: "Milho e Soja",
    obs: "Próxima colheita em dezembro",
  };
  preencherModalPropriedade(dados);
  abrirModal("modalEditarPropriedade");
}

function editarFuncionario(id) {
  const dados = {
    nome: "Carlos Lima",
    cargo: "Técnico Agrícola",
    cpf: "123.456.789-00",
    admissao: "2023-03-12",
    desempenho: "Excelente",
  };
  preencherModalFuncionario(dados);
  abrirModal("modalEditarFuncionario");
}

function editarMaquinario(id) {
  const dados = {
    tipo: "Colheitadeira",
    modelo: "New Holland TC5070",
    ano: 2019,
    estado: "Bom",
    obs: "Revisão completa em setembro",
  };
  preencherModalMaquinario(dados);
  abrirModal("modalEditarMaquinario");
}
// Abrir modal
function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

// Fechar modal
function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}

// Fechar clicando fora do modal
window.onclick = function (event) {
  const modais = document.querySelectorAll(".modal");
  modais.forEach((modal) => {
    if (event.target == modal) modal.style.display = "none";
  });
};

// Salvar Safra
function salvarSafra() {
  alert("Alterações da Safra salvas!");
  fecharModal("modalEditarSafra");
}

// Salvar Análise do Solo
function salvarAnalise() {
  alert("Alterações da Análise do Solo salvas!");
  fecharModal("modalEditarAnalise");
}

// Confirmar exclusão
function confirmarExclusao() {
  alert("Item excluído!");
  fecharModal("modalExcluir");
}
