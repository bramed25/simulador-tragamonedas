// ==========================
// VARIABLES
// ==========================

const imagen = document.getElementById("imagenJuego");

const diferencias = document.querySelectorAll(".diferencia");

const contador = document.getElementById("contador");

const botonVerificar = document.getElementById("btnVerificar");

const mensaje = document.getElementById("mensaje");

// ==========================
// IMÁGENES DISPONIBLES
// ==========================

const imagenes = [

    "imagenes/diferencia1.png",
    "imagenes/diferencia2.png",
    "imagenes/diferencia3.png"

];

// ==========================
// VARIABLES DEL JUEGO
// ==========================

let encontradas = 0;

// ==========================
// CAMBIAR IMAGEN
// ==========================

function cambiarImagen(){

    const aleatorio = Math.floor(Math.random() * imagenes.length);

    imagen.src = imagenes[aleatorio];

}

// ==========================
// INICIAR JUEGO
// ==========================

cambiarImagen();

// ==========================
// DETECTAR DIFERENCIAS
// ==========================

diferencias.forEach(diferencia => {

    diferencia.addEventListener("click", () => {

        // Evita repetir clic
        if(diferencia.classList.contains("encontrada")){
            return;
        }

        diferencia.classList.add("encontrada");

        encontradas++;

        contador.textContent = encontradas;

    });

});

// ==========================
// VERIFICAR
// ==========================

botonVerificar.addEventListener("click", () => {

    // Solo funciona si encontró las 3
    if(encontradas !== 3){

        return;

    }

    // Obtener créditos actuales
    let creditos = localStorage.getItem("creditosTragamonedas");

    // Si no existen
    if(creditos === null){

        creditos = 0;

    }else{

        creditos = parseInt(creditos);

    }

    // Sumar 3 tiros
    creditos += 3;

    // Guardar créditos
    localStorage.setItem("creditosTragamonedas", creditos);

    mensaje.innerHTML = `
        🎉 Ganaste 3 tiros para la tragamonedas 🎰
    `;

    botonVerificar.disabled = true;

});