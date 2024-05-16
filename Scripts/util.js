function calcularScoreBoard(caso) {
    let submissions = caso.split(";"); // Para separar las entregas o submissions
    let tiempoP = {}; // Objeto para almacenar los tiempos de penalización de cada equipo
    let problemasR = {}; // Objeto para almacenar el número de problemas resueltos por cada equipo
    let intentosErroneos = {}; // Objeto para almacenar los intentos incorrectos por problema

    // Para separar los datos de cada submission
    for (let i = 0; i < submissions.length; i++) {
        let infoSubmission = submissions[i].trim().split(" ");
        let concursante = infoSubmission[0];
        let problema = infoSubmission[1];
        let tiempo = parseInt(infoSubmission[2]);
        let resultado = infoSubmission[3];

        // Inicializar los datos si no existen (Primera vez que se registran las submission)
        if (!problemasR[concursante]) problemasR[concursante] = 0;
        if (!tiempoP[concursante]) tiempoP[concursante] = 0;
        if (!intentosErroneos[concursante]) intentosErroneos[concursante] = {};
        if (!intentosErroneos[concursante][problema]) intentosErroneos[concursante][problema] = 0;

        // Calcular el número de problemas resueltos
        if (resultado === "C") {
            problemasR[concursante]++;
            tiempoP[concursante] += tiempo + (20 * intentosErroneos[concursante][problema]);
        } else if (resultado === "I") {
            intentosErroneos[concursante][problema]++;
        }
    }

    // Crear un array de resultados para el ordenamiento
    let resultados = Object.keys(problemasR).map(concursante => ({
        concursante,
        problemasResueltos: problemasR[concursante],
        tiempoPenalizacion: tiempoP[concursante]
    }));

    // Ordenar los resultados
    resultados.sort((a, b) => {

        // Orden descendente por número de problemas resueltos
        if (b.problemasResueltos !== a.problemasResueltos) {
            return b.problemasResueltos - a.problemasResueltos;
        }

        // Orden ascendente por tiempo de penalización
        if (a.tiempoPenalizacion !== b.tiempoPenalizacion) {
            return a.tiempoPenalizacion - b.tiempoPenalizacion;
        }

        // Orden ascendente por concursante o equipo
        return a.concursante.localeCompare(b.concursante);
    });

    // Construir el resultado final en una cadena
    let res = "";
    for (let i = 0; i < resultados.length; i++) {
        let r = resultados[i];
        res += r.concursante + " " + r.problemasResueltos + " " + r.tiempoPenalizacion + "\n";
    }

    return res.trim(); // Para eliminar el último salto de línea
}

export { calcularScoreBoard };
