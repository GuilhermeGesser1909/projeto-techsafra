document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAnaliseSolo");
  const resultado = document.getElementById("resultado");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = document.getElementById("data").value;
    const local = document.getElementById("local").value;
    const profundidade = document.getElementById("profundidade").value;
    const ph = document.getElementById("ph").value;
    const nutrientes = document.getElementById("nutrientes").value;
    const observacoes = document.getElementById("observacoes").value;
    resultado.innerHTML = `
<p><strong>Data da Coleta:</strong> ${data}</p>
<p><strong>Local:</strong> ${local}</p>
<p><strong>Profundidade:</strong> ${profundidade} cm</p>
<p><strong>pH:</strong> ${ph}</p>
<p><strong>Nutrientes:</strong> ${nutrientes}</p>
<p><strong>Observações:</strong> ${observacoes || "Nenhuma observação"}</p>
       `;
    form.reset();
  });
});
