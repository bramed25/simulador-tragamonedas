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

    // 👇 NUEVO: Asegurar que el botón esté bloqueado al iniciar
    botonReclamar.disabled = true; 

    diferencias.forEach((diferencia, index) => {
        diferencia.style.top = juegoActual.diferencias[index].top;
        diferencia.style.left = juegoActual.diferencias[index].left;
        diferencia.classList.remove("encontrada");
    });
}

// ==========================
// INICIAR JUEGO
// ==========================

cambiarImagen();

/// ==========================
// DETECTAR DIFERENCIAS
// ==========================
diferencias.forEach(diferencia => {
    diferencia.addEventListener("click", () => {
        if(diferencia.classList.contains("encontrada")){
            return; // Evita repetir
        }

        diferencia.classList.add("encontrada");
        encontradas++;
        contador.textContent = encontradas;

        // 👇 NUEVO: Habilitar el botón automáticamente al llegar a 3
        if (encontradas === 3) {
            botonReclamar.disabled = false;
            mensaje.innerHTML = "¡Excelente! Ya puedes reclamar tus tiros.";
            mensaje.style.color = "green";
        }
    });
});

// ==========================
// VERIFICAR Y RECLAMAR
// ==========================
botonReclamar.addEventListener("click", () => {
    // 1. Apagar el botón de inmediato para evitar que el niño haga "doble clic"
    botonReclamar.disabled = true;

    // 2. Sumar 3 tiros usando nuestro estado global centralizado
    GameState.agregarTiros(3);

    // 3. Dar retroalimentación de éxito
    mensaje.innerHTML = "🎉 ¡3 Tiros reclamados con éxito! Volviendo... 🎰";

    // 4. Redireccionar a la máquina tragamonedas (index.html) después de 1.5 segundos
    setTimeout(() => {
        window.location.href = "../../index.html";
    }, 1500); 
});