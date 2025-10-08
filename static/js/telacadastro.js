function togglePassword(idCampo) {
    const campo = document.getElementById(idCampo);
    if (campo.type === "password") {
        campo.type = "text";
    } else {
        campo.type = "password";
    }
}

document.getElementById('year').textContent = new Date().getFullYear();