document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formMaquinario");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const ano = document.getElementById("ano").value;
    const situacao = document.getElementById("situacao").value;
    resultado.innerHTML = `
<p><strong>Nome:</strong> ${nome}</p>
<p><strong>Tipo:</strong> ${tipo}</p>
<p><strong>Marca:</strong> ${marca}</p>
<p><strong>Modelo:</strong> ${modelo}</p>
<p><strong>Ano:</strong> ${ano}</p>
<p><strong>Situação:</strong> ${situacao}</p>
       `;
    form.reset();
  });
});
