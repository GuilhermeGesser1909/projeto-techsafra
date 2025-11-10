document.addEventListener("DOMContentLoaded", async () => {
  // ==========================
  // 🌐 CONTROLE DA SIDEBAR (NAV)
  // ==========================
  const links = document.querySelectorAll(".sidebar nav a");
  const sections = document.querySelectorAll(".card-section");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Remove destaque de todos
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Esconde todas as seções
      sections.forEach((section) => (section.hidden = true));

      // Mostra a clicada
      const targetId = link.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.hidden = false;

        // 🔹 Se for a seção de propriedades, recarrega a lista
        if (targetId === "section4") {
          listarPropriedades();
        }
      }
    });
  });

  // ==========================
  // 🌱 CRUD DE PROPRIEDADES
  // ==========================
  const API_URL = "http://localhost:8080/propriedades";
  const usuarioId = localStorage.getItem("usuarioId");
  const lista = document.getElementById("listaPropriedades");

  if (!lista) return; // segurança, se não estiver no dashboard

  if (!usuarioId) {
    lista.innerHTML = `<p style="color:red;">Usuário não autenticado! Faça login novamente.</p>`;
    setTimeout(() => (window.location.href = "/telalogin.html"), 1500);
    return;
  }

  // 🔹 FUNÇÃO: Listar propriedades do usuário logado
  async function listarPropriedades() {
    try {
      const resp = await fetch(API_URL);
      if (!resp.ok) throw new Error("Erro ao buscar propriedades");

      const propriedades = await resp.json();
      const minhas = propriedades.filter(
        (p) => p.usuarioId === parseInt(usuarioId)
      );

      if (minhas.length === 0) {
        lista.innerHTML = "<p>Nenhuma propriedade cadastrada ainda.</p>";
        return;
      }

      lista.innerHTML = minhas
        .map(
          (p) => `
        <div class="property-item" data-id="${p.id}">
          <div class="property-info">
            <h4>${p.nome}</h4>
            <p>${p.localizacao} • ${p.areaHectares} hectares</p>
          </div>
          <div class="property-actions">
            <button class="btn edit-btn" onclick="editarPropriedade(${p.id})">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="btn delete-btn" onclick="excluirPropriedade(${p.id})">
              <i class="fas fa-trash"></i> Excluir
            </button>
          </div>
        </div>`
        )
        .join("");
    } catch (error) {
      console.error(error);
      lista.innerHTML = `<p style="color:red;">Erro ao carregar propriedades.</p>`;
    }
  }

  // 🔹 ABRIR MODAL DE EDIÇÃO
  window.editarPropriedade = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/${id}`);
      if (!resp.ok) throw new Error("Erro ao buscar propriedade");
      const prop = await resp.json();

      // Preenche os campos do modal
      document.getElementById("nomePropriedade").value = prop.nome;
      document.getElementById("localizacaoPropriedade").value =
        prop.localizacao;
      document.getElementById("areaPropriedade").value = prop.areaHectares;

      // Guarda o ID dentro do modal
      document.getElementById("modalEditarPropriedade").dataset.id = id;
      abrirModal("modalEditarPropriedade");
    } catch (error) {
      alert("Erro ao carregar propriedade para edição!");
      console.error(error);
    }
  };

  // 🔹 SALVAR ALTERAÇÕES (PUT)
  document
    .getElementById("salvarEdicaoBtn")
    ?.addEventListener("click", async () => {
      const id = document.getElementById("modalEditarPropriedade").dataset.id;
      const nome = document.getElementById("nomePropriedade").value;
      const localizacao =
        document.getElementById("localizacaoPropriedade").value;
      const areaHectares = parseFloat(
        document.getElementById("areaPropriedade").value
      );

      const dadosAtualizados = {
        nome,
        localizacao,
        areaHectares,
        usuarioId: parseInt(usuarioId),
      };

      try {
        const resp = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosAtualizados),
        });

        if (resp.ok) {
          alert("Propriedade atualizada com sucesso!");
          fecharModal("modalEditarPropriedade");
          listarPropriedades();
        } else {
          alert("Erro ao atualizar propriedade!");
        }
      } catch (error) {
        console.error(error);
        alert("Falha ao atualizar.");
      }
    });

  // 🔹 ABRIR MODAL DE EXCLUSÃO
  window.excluirPropriedade = (id) => {
    document.getElementById("modalExcluir").dataset.id = id;
    abrirModal("modalExcluir");
  };

  // 🔹 CONFIRMAR EXCLUSÃO (DELETE)
  document
    .getElementById("confirmarExclusaoBtn")
    ?.addEventListener("click", async () => {
      const id = document.getElementById("modalExcluir").dataset.id;
      try {
        const resp = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (resp.ok) {
          alert("Propriedade excluída com sucesso!");
          fecharModal("modalExcluir");
          listarPropriedades();
        } else {
          alert("Erro ao excluir propriedade!");
        }
      } catch (error) {
        console.error(error);
        alert("Falha ao excluir.");
      }
    });

  // 🔹 Carrega propriedades automaticamente ao abrir o dashboard
  listarPropriedades();
});
