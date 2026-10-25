
const formulario = document.getElementById("formulario");
const campoCedula = document.getElementById("cedula");
const resultado = document.getElementById("resultado");

// Aplica el formato 000-0000000-0 mientras se escribe.
campoCedula.addEventListener("input", () => {
    let numeros = campoCedula.value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 10) {
        numeros = numeros.slice(0, 3) + "-" +
                  numeros.slice(3, 10) + "-" +
                  numeros.slice(10);
    } else if (numeros.length > 3) {
        numeros = numeros.slice(0, 3) + "-" +
                  numeros.slice(3);
    }

    campoCedula.value = numeros;
});

function validarCedula(cedula) {
    const numeros = cedula.replace(/\D/g, "");

    if (!/^\d{11}$/.test(numeros)) {
        return false;
    }

    let suma = 0;

    // Se procesan los primeros diez dígitos.
    for (let i = 0; i < 10; i++) {
        let digito = Number(numeros[i]);

        // Posiciones pares: multiplicar por 1.
        // Posiciones impares: multiplicar por 2.
        const peso = i % 2 === 0 ? 1 : 2;

        let producto = digito * peso;

        // Sumar las cifras del producto.
        if (producto > 9) {
            producto = Math.floor(producto / 10) +
                       (producto % 10);
        }

        suma += producto;
    }

    const digitoVerificador = (10 - (suma % 10)) % 10;

    return digitoVerificador === Number(numeros[10]);
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const cedula = campoCedula.value.trim();
    const numeros = cedula.replace(/\D/g, "");

    resultado.className = "";

    if (!/^\d{11}$/.test(numeros)) {
        resultado.textContent =
            "Ingresa una cédula con exactamente 11 dígitos.";
        resultado.classList.add("invalida");
        return;
    }

    if (validarCedula(cedula)) {
        resultado.textContent =
            "✓ La cédula cumple con el algoritmo de módulo 10.";
        resultado.classList.add("valida");
    } else {
        resultado.textContent =
            "✗ La cédula no cumple con el algoritmo de módulo 10.";
        resultado.classList.add("invalida");
    }
});
