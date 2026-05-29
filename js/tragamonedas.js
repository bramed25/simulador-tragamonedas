document.addEventListener("DOMContentLoaded", () => {
    // Assets detectados en la carpeta raíz /assets/
    const simbolos = [
        './assets/bluey.png',
        './assets/bingo.png',
        './assets/buddy.png',
        './assets/muffin.png',
        './assets/socks.png'
    ];

    const btnGirar = document.getElementById("btn-girar");
    const mensaje = document.getElementById("mensaje-resultado");
    const uiTiros = document.getElementById("ui-tiros");
    const uiBoletos = document.getElementById("ui-boletos");

    // Sincronizar la UI con el estado global al cargar la página
    actualizarMarcadoresUI();

    btnGirar.addEventListener("click", () => {
        // Intentar consumir un tiro desde el estado global
        const tiroConsumido = GameState.consumirTiro();

        if (!tiroConsumido) {
            mostrarMensaje("¡No tienes tiros! Completa un minijuego para conseguir más.", "red");
            return;
        }

        // Actualizar la interfaz de inmediato
        actualizarMarcadoresUI();
        
        btnGirar.disabled = true;
        // Ocultar mensaje usando la clase de animación
        mensaje.classList.remove("mostrar-cartel");

        // Iniciar animación de rodillos
        const rodillos = [document.getElementById("r1"), document.getElementById("r2"), document.getElementById("r3")];
        rodillos.forEach(r => r.classList.add("girando"));

        // Temporizador de 2000ms especificado en los requerimientos
        setTimeout(() => {
            rodillos.forEach(r => r.classList.remove("girando"));
            // Llamamos a la función con el nombre correcto
            procesarGiroTragamonedas(rodillos);
        }, 2000);
    });

    function procesarGiroTragamonedas(nodosRodillos) {
        // TryCatch para evitar que el botón se quede bloqueado
        try {
            // Cada rodillo elige un símbolo de forma 100% aleatoria e independiente
            let s1 = simbolos[Math.floor(Math.random() * simbolos.length)];
            let s2 = simbolos[Math.floor(Math.random() * simbolos.length)];
            let s3 = simbolos[Math.floor(Math.random() * simbolos.length)];

            let resultadoSimbolos = [s1, s2, s3];
            let boletosGanados = 0;
            let tipoPremio = "";

            // Evaluar las combinaciones
            if (s1 === s2 && s2 === s3) {
                // 3 símbolos iguales
                boletosGanados = 50;
                tipoPremio = "¡JACKPOT!";
            } else if (s1 === s2 || s1 === s3 || s2 === s3) {
                // 2 símbolos iguales
                boletosGanados = 10;
                tipoPremio = "¡PREMIO MENOR!";
            } else {
                // Ningún símbolo coincide
                boletosGanados = 0;
                tipoPremio = "¡Sigue intentando!";
            }

            // Cambiar imágenes de forma segura (verifica que el tag <img> exista)
            for (let i = 0; i < 3; i++) {
                let imgTag = nodosRodillos[i].querySelector("img");
                if (imgTag) {
                    imgTag.src = resultadoSimbolos[i];
                }
            }

            if (boletosGanados > 0) {
                GameState.agregarBoletos(boletosGanados);
                mostrarMensaje(`${tipoPremio} Ganaste ${boletosGanados} boletos.`, "green");
            } else {
                mostrarMensaje(tipoPremio, "black");
            }

            actualizarMarcadoresUI();

        } catch (error) {
            console.error("Error al procesar el giro:", error);
            mostrarMensaje("Ocurrió un error. Intenta de nuevo.", "red");
        } finally {
            // El botón siempre se liberará al final, haya error o no
            btnGirar.disabled = false;
        }
    }

    function mostrarMensaje(texto, color) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
        // Mostramos el mensaje aplicando la clase de la animación
        mensaje.classList.add("mostrar-cartel");
    }

    function actualizarMarcadoresUI() {
        uiTiros.textContent = GameState.obtenerTiros();
        uiBoletos.textContent = GameState.obtenerBoletos();
    }
});