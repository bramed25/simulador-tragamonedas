// js/state.js

const GameState = {
    // Inicializa el juego con 0 tiros y 0 boletos si no existen registros previos
    init() {
        if (localStorage.getItem("tiros") === null) {
            localStorage.setItem("tiros", "0");
        }
        if (localStorage.getItem("boletos") === null) {
            localStorage.setItem("boletos", "0");
        }
    },

    obtenerTiros() {
        this.init();
        return parseInt(localStorage.getItem("tiros")) || 0;
    },

    agregarTiros(cantidad) {
        this.init();
        let actuales = this.obtenerTiros();
        actuales += cantidad;
        localStorage.setItem("tiros", actuales.toString());
        return actuales;
    },

    consumirTiro() {
        this.init();
        let actuales = this.obtenerTiros();
        if (actuales > 0) {
            actuales--;
            localStorage.setItem("tiros", actuales.toString());
            return true; // Tiro consumido con éxito
        }
        return false; // No había tiros disponibles
    },

    obtenerBoletos() {
        this.init();
        return parseInt(localStorage.getItem("boletos")) || 0;
    },

    agregarBoletos(cantidad) {
        this.init();
        let actuales = this.obtenerBoletos();
        actuales += cantidad;
        localStorage.setItem("boletos", actuales.toString());
        return actuales;
    }
};

// Ejecutar inicialización automática al cargar el script
GameState.init();