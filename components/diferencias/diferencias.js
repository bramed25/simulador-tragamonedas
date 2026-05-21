// ==========================
// VARIABLES
// ==========================

const imagen = document.getElementById("imagenJuego");

const diferencias = document.querySelectorAll(".diferencia");

const contador = document.getElementById("contador");

const botonReclamar =
    document.getElementById("btnReclamar");

const mensaje = document.getElementById("mensaje");

// ==========================
// JUEGOS
// ==========================

const juegos = [

    // IMAGEN 1
    {
        imagen: "imagenes/diferencias1.png",

        diferencias: [

            { top: "23%", left: "29%" },

            { top: "42%", left: "11%" },

            { top: "83%", left: "33%" }

        ]
    },

    // IMAGEN 2
    {
        imagen: "imagenes/diferencias2.png",

        diferencias: [

            { top: "20%", left: "94%" },

            { top: "42%", left: "50%" },

            { top: "40%", left: "77%" }

        ]
    },

    // IMAGEN 3
    {
        imagen: "imagenes/diferencias3.png",

        diferencias: [

            { top: "85%", left: "48%" },

            { top: "10%", left: "60%" },

            { top: "65%", left: "32%" }

        ]
    }

];

// ==========================
// VARIABLES DEL JUEGO
// ==========================

let encontradas = 0;

// ==========================
// CAMBIAR IMAGEN
// ==========================

function cambiarImagen(){

    const aleatorio = Math.floor(Math.random() * juegos.length);

    const juegoActual = juegos[aleatorio];

    imagen.src = juegoActual.imagen;

    // Reiniciar diferencias
    encontradas = 0;

    contador.textContent = encontradas;

    mensaje.innerHTML = "";

    // Mover diferencias
    diferencias.forEach((diferencia, index) => {

        diferencia.style.top =
            juegoActual.diferencias[index].top;

        diferencia.style.left =
            juegoActual.diferencias[index].left;

        diferencia.classList.remove("encontrada");

    });

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

        // Evita repetir
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

botonReclamar.addEventListener("click", () => {

    // Solo funciona si encontró las 3
    if(encontradas !== 3){

        mensaje.innerHTML =
            "❌ Encuentra las 3 diferencias primero";

        return;

    }

    // Obtener créditos actuales
    let creditos =
        localStorage.getItem("creditosTragamonedas");

    // Si no existen
    if(creditos === null){

        creditos = 0;

    }else{

        creditos = parseInt(creditos);

    }

    // Sumar 3 tiros
    creditos += 3;

    // Guardar créditos
    localStorage.setItem(
        "creditosTragamonedas",
        creditos
    );

    mensaje.innerHTML =
        "🎉 Créditos reclamados 🎰";

    // Redireccionar después de 1 segundo
    setTimeout(() => {

        window.location.href =
            "../Tragamonedas/index.html";

    }, 1000);

    // Nueva imagen aleatoria después de 2 segundos
    setTimeout(() => {

        cambiarImagen();

    }, 2000);

});