/* dashboard.js
 - gerencia troca de seções, modais, inicializa gráficos (Chart.js)
 - mantém todo conteúdo do dashboard (sem alterar dados estáticos)
*/

/* --- Seletor de seções via sidebar --- */
document.addEventListener("DOMContentLoaded", () => {
  // sidebar links
  const links = document.querySelectorAll(".sidebar nav a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      const target = link.getAttribute("data-target");
      if (target) showSection(target);
    });
  });

  // show initial section (section1)
  showSection("section1");

  // init charts
  initCharts();

  // hook search form (weather) - placeholder behavior
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const city = document.getElementById("city_Name").value || "Blumenau";
      // placeholder: update title only (your previsao.js can replace)
      document.getElementById("title").textContent = city + ", BR";
      // optionally, call real API here
      showSection("section2");
    });
  }

  // modal close on Esc
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") closeAllModals();
  });
});

/* mostre apenas a seção com id = name e oculte as demais */
function showSection(name) {
  const sections = document.querySelectorAll("main .card-section");
  sections.forEach((s) => {
    if (s.id === name) {
      s.removeAttribute("hidden");
      s.style.display = "block";
    } else {
      s.setAttribute("hidden", "");
      s.style.display = "none";
    }
  });
  // scroll to top of main
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- Modais ---------- */
function abrirModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function fecharModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function closeAllModals() {
  document
    .querySelectorAll('.modal[aria-hidden="false"]')
    .forEach((m) => m.setAttribute("aria-hidden", "true"));
  document.body.style.overflow = "";
}
function confirmarExclusao() {
  // placeholder: implementa lógica real no backend
  alert("Item excluído (exemplo).");
  fecharModal("modalExcluir");
}

/* ---------- Charts (Chart.js) ---------- */
function initCharts() {
  const ctx = document.getElementById("graficoSafra");
  if (!ctx) return;
  const labels = [
    "Nov",
    "Dez",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Produção (ton)",
        data: [120, 130, 125, 150, 160, 155, 170, 165, 180, 190, 200, 210],
        fill: true,
        backgroundColor: "rgba(99,194,98,0.12)",
        borderColor: "rgba(63,162,77,0.95)",
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: "Rendimento (kg/ha)",
        data: [3.2, 3.3, 3.1, 3.4, 3.6, 3.5, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3],
        fill: false,
        borderColor: "rgba(228,185,60,0.95)",
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  new Chart(ctx, {
    type: "line",
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
      },
      scales: {
        y: { beginAtZero: false },
      },
    },
  });
}

/* ---------- Small helpers for forms (placeholders) ---------- */
function salvarSafra() {
  alert("Salvando safra (demo).");
  fecharModal("modalEditarSafra");
}
function salvarAnalise() {
  alert("Salvando análise (demo).");
  fecharModal("modalEditarAnalise");
}

function updateWeatherBackground(description) {
  const card = document.querySelector(".weather-card");
  card.classList.remove(
    "sunny",
    "partly-cloudy",
    "cloudy",
    "rainy",
    "clear-night"
  );

  const desc = description.toLowerCase();

  if (desc.includes("sol") || desc.includes("limpo")) {
    card.classList.add("sunny");
  } else if (
    desc.includes("nuvens dispersas") ||
    desc.includes("poucas nuvens")
  ) {
    card.classList.add("partly-cloudy");
  } else if (desc.includes("nublado")) {
    card.classList.add("cloudy");
  } else if (desc.includes("chuva") || desc.includes("tempestade")) {
    card.classList.add("rainy");
  } else {
    card.classList.add("clear-night");
  }
}

// Exemplo:
updateWeatherBackground(document.getElementById("temp_description").innerText);
