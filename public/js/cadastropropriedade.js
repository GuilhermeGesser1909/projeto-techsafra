document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPropriedade");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nomePropriedade = document.getElementById("nomePropriedade").value;
    const nomecidade = document.getElementById("nomecidade").value;
    const Estado = document.getElementById("Estado").value;
    const tamanhopropriedade = document.getElementById("tamanhopropriedade").value;
    resultado.innerHTML = `
<p><strong>Nome da Propriedade:</strong> ${nomePropriedade}</p>
<p><strong>Cidade:</strong> ${nomecidade}</p>
<p><strong>Estado:</strong> ${Estado}</p>
<p><strong>Tamanho: (hectare):</strong> ${tamanhopropriedade}</p>
       `;
    form.reset();
  });
});
