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