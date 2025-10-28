document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio real do formulário

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (usuario && senha) {
      // redireciona para a home
      window.location.href = "./home.html";
    } else {
      alert("Por favor, preencha usuário e senha!");
    }
  });
});

function togglePassword() {
    const pw = document.getElementById('password');
    const btn = document.querySelector('.toggle-pass');
    if (pw.type === 'password') {
        pw.type = 'text';
        btn.textContent = 'Ocultar';
    } else {
        pw.type = 'password';
        btn.textContent = 'Mostrar';
    }
}
document.getElementById('year').textContent = new Date().getFullYear();
