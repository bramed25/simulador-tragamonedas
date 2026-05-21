console.log("rompecabezas.js LISTOOOO");document.addEventListener("DOMContentLoaded", () => {
    const piezas = document.querySelectorAll('.pieza');
    const mensajeVictoria = document.getElementById('mensaje-victoria');
    let piezaSeleccionada = null;
    let juegoTerminado = false;

    piezas.forEach(pieza => {
        pieza.addEventListener('click', () => {
            if (juegoTerminado) return;

            // Primer clic: Seleccionar la pieza objetivo
            if (!piezaSeleccionada) {
                piezaSeleccionada = pieza;
                pieza.classList.add('seleccionada');
            } 
            // Segundo clic: Intercambiar con una pieza diferente
            else if (piezaSeleccionada !== pieza) {
                intercambiarPiezas(piezaSeleccionada, pieza);
                piezaSeleccionada.classList.remove('seleccionada');
                piezaSeleccionada = null; // Liberar memoria de selección
                
                verificarVictoria();
            } 
            // Clic de cancelación: Si presiona la misma pieza se deselecciona
            else {
                pieza.classList.remove('seleccionada');
                piezaSeleccionada = null;
            }
        });
    });

    function intercambiarPiezas(p1, p2) {
        // Intercambiamos exclusivamente los data-id. 
        // El CSS Grid mantiene las cajas fijas, pero el cambio de ID modifica la porción de imagen mostrada.
        const idTemporal = p1.getAttribute('data-id');
        p1.setAttribute('data-id', p2.getAttribute('data-id'));
        p2.setAttribute('data-id', idTemporal);
    }

    function verificarVictoria() {
    let aciertos = 0;
    const piezasTablero = document.querySelectorAll('.pieza');

    piezasTablero.forEach(pieza => {
        if (pieza.getAttribute('data-id') === pieza.getAttribute('data-current')) {
            aciertos++;
        }
    });

    if (aciertos === 9) {
        juegoTerminado = true;
        mensajeVictoria.style.display = 'block';
        
        // 1. Sumar los 3 tiros reglamentarios al estado global compartido
        GameState.agregarTiros(3);
        
        // 2. Redireccionar al index automáticamente después de 2 segundos
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 2000);
    }
}
});