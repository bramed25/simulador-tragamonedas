simbolos = [1,2,3,4,5];


// Función para girar un rodillo
function girarRodillo() {
    const indice = Math.floor(Math.random() * simbolos.length);
    return simbolos[indice];
}

// Función principal de la tragamonedas
function girarTragamonedas() {

    // Generar los 3 resultados aleatorios
    const rodillo1 = girarRodillo();
    const rodillo2 = girarRodillo();
    const rodillo3 = girarRodillo();

    // Guardar resultados
    const resultados = [rodillo1, rodillo2, rodillo3];

    let boletos = 0;
    let mensaje = "";

    // Evaluar premios
    if (rodillo1 === rodillo2 && rodillo2 === rodillo3) {

        // 3 iguales = Jackpot
        boletos = 50;
        mensaje = "JACKPOT";

    } else if (
        rodillo1 === rodillo2 ||
        rodillo1 === rodillo3 ||
        rodillo2 === rodillo3
    ) {

        // 2 iguales = Premio menor
        boletos = 10;
        mensaje = " Premio menor";

    } else {

        // Ninguna coincidencia
        boletos = 2;
        mensaje = "Premio de consolación";
    }

    // Retornar resultado
    return {
        rodillos: resultados,
        boletosGanados: boletos,
        resultado: mensaje
    };
}

const resultado = girarTragamonedas();

console.log("Rodillos:", resultado.rodillos);
console.log("Resultado:", resultado.resultado);
console.log("Boletos ganados:", resultado.boletosGanados);

let creditos = localStorage.getItem("creditosTragamonedas");

if(creditos === null){
    creditos = 0;
}

console.log("Tiros disponibles:", creditos);