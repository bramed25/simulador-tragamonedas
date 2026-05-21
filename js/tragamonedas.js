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
        mensaje.classList.remove("mostrar-cartel");

        // Iniciar animación de rodillos
        const rodillos = [document.getElementById("r1"), document.getElementById("r2"), document.getElementById("r3")];
        rodillos.forEach(r => r.classList.add("girando"));

        // Temporizador de 2000ms especificado en los requerimientos
        setTimeout(() => {
            rodillos.forEach(r => r.classList.remove("girando"));
            // CORRECCIÓN: Llamamos a la función con el nombre correcto
            procesarGiroTragamonedas(rodillos); 
        }, 2000);
    });

    function procesarGiroTragamonedas(nodosRodillos) {
        // Blindaje try-catch para evitar que el botón se quede bloqueado
        try {
            const probabilidad = Math.floor(Math.random() * 100) + 1;
            let resultadoSimbolos = [];
            let boletosGanados = 0;
            let tipoPremio = "";

            if (probabilidad <= 70) {
                const suerteInterna = Math.random();
                const simboloBase = simbolos[Math.floor(Math.random() * simbolos.length)];

                if (suerteInterna < 0.20) {
                    resultadoSimbolos = [simboloBase, simboloBase, simboloBase];
                    boletosGanados = 50;
                    tipoPremio = "¡JACKPOT!";
                } else if (suerteInterna < 0.80) {
                    let simboloDistinto = obtenerSimboloDistinto(simboloBase);
                    resultadoSimbolos = [simboloBase, simboloBase, simboloDistinto].sort(() => Math.random() - 0.5);
                    boletosGanados = 10;
                    tipoPremio = "¡PREMIO MENOR!";
                } else {
                    resultadoSimbolos = obtenerTresDistintos();
                    boletosGanados = 2;
                    tipoPremio = "¡Tiro de suerte!";
                }
            } else {
                resultadoSimbolos = obtenerTresDistintos();
                boletosGanados = 0;
                tipoPremio = "¡Sigue intentando!";
            }

            nodosRodillos[0].querySelector("img").src = resultadoSimbolos[0];
            nodosRodillos[1].querySelector("img").src = resultadoSimbolos[1];
            nodosRodillos[2].querySelector("img").src = resultadoSimbolos[2];

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
            // MAGIA: El botón siempre se liberará al final, haya error o no
            btnGirar.disabled = false;
        }
    }

    function obtenerSimboloDistinto(excluir) {
        let nuevo = simbolos[Math.floor(Math.random() * simbolos.length)];
        while(nuevo === excluir) {
            nuevo = simbolos[Math.floor(Math.random() * simbolos.length)];
        }
        return nuevo;
    }

    function obtenerTresDistintos() {
        let arr = [...simbolos];
        arr.sort(() => Math.random() - 0.5);
        return [arr[0], arr[1], arr[2]];
    }

    function mostrarMensaje(texto, color) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
        mensaje.classList.add("mostrar-cartel");
    }

    function actualizarMarcadoresUI() {
        uiTiros.textContent = GameState.obtenerTiros();
        uiBoletos.textContent = GameState.obtenerBoletos();
    }
});