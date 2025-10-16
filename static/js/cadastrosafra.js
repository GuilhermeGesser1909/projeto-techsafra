document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formSafra");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simula o salvamento da safra
    alert("Safra salva com sucesso!");

    // Limpa os campos após o envio
    form.reset();
  });
});
