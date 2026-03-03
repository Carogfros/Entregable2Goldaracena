// Función para calcular metabolismo basal (Harris-Benedict)
function calcularMetabolismoBasal(peso, altura, edad, sexo) {

    let metabolismo;

    if (sexo === "mujer") {
        metabolismo = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);
    } else {
        metabolismo = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad);
    }

    return metabolismo;
}

// Obtener usuarios guardados en LocalStorage o crear array vacío
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Seleccionamos elementos del DOM
const formulario = document.getElementById("formNutricional");
const resultadoDiv = document.getElementById("resultado");

// Evento submit
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Capturar valores
    const nombre = document.getElementById("nombre").value.trim();
    const edad = Number(document.getElementById("edad").value);
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);
    const sexo = document.getElementById("sexo").value;
    const actividad = Number(document.getElementById("actividad").value);

    // Validación básica
    if (!nombre || !edad || !peso || !altura || !sexo || !actividad) {
        resultadoDiv.innerHTML = `
            <p style="color:red;"><strong>Por favor completá todos los campos.</strong></p>
        `;
        return;
    }

    // Calcular metabolismo
    const metabolismo = calcularMetabolismoBasal(peso, altura, edad, sexo);
    const caloriasDiarias = metabolismo * actividad;

    // Crear objeto usuario
    const usuario = {
        nombre,
        edad,
        peso,
        altura,
        sexo,
        actividad,
        calorias: caloriasDiarias
    };

    // Guardar en array
    usuarios.push(usuario);

    // Guardar en LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mostrar resultado
    resultadoDiv.innerHTML = `
        <h2>Resultado</h2>
        <p>Hola <strong>${nombre}</strong></p>
        <p>Tu requerimiento energético diario es de 
        <strong>${caloriasDiarias.toFixed(2)} kcal</strong></p>
        <p>Total de usuarios guardados: <strong>${usuarios.length}</strong></p>
    `;

    // Resetear formulario
    formulario.reset();

});