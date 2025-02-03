let encuestas = []; // Declarar el arreglo encuestas en un ámbito global
let evaluacionesGlobales = []; // Arreglo para almacenar las evaluaciones globales

const votar = (encuesta) => {
    let opcionesTexto = encuesta.opciones.map((opcion, index) => `${index + 1}. ${opcion}`).join("\n");
    const opcionIndex = parseInt(prompt(`Seleccione la opción para votar:\n${opcionesTexto}`)) - 1;

    if (opcionIndex >= 0 && opcionIndex < encuesta.opciones.length) {
        encuesta.evaluaciones.push([encuesta.opciones[opcionIndex], encuesta.opciones[opcionIndex]]); // Almacenar la evaluación en el arreglo evaluaciones
        alert("Voto registrado con éxito.");
    } else {
        alert("Opción no válida. Inténtalo de nuevo.");
    }
};

const votarEncuesta = (encuestas) => {
    if (encuestas.length === 0) { // Si el largo del arreglo encuestas es 0, es porque no hay nada.
        alert("Usted todavía no ha creado ninguna encuesta. Se sugiere crear primero una encuesta.");
        return;
    }
    let listaEncuestas = encuestas.map((encuesta, index) => `${index + 1}. ${encuesta.titulo}`).join("\n");
    const encuestaIndex = parseInt(prompt(`Seleccione la encuesta para votar:\n${listaEncuestas}`)) - 1;
    if (encuestas[encuestaIndex]) {
        const encuesta = encuestas[encuestaIndex];
        const peliculasSeleccionadas = encuesta.opciones;
        const evaluaciones = prompt(`
            Ha seleccionado la encuesta llamada ${encuesta.titulo}, esta tiene las siguientes películas:
            ${peliculasSeleccionadas.map((pelicula, index) => `${index + 1}. ${pelicula}`).join("\n")}
            
            Evalúe cada película con una opción numérica separada por comas (1, 2 o 3):
            1. No es para mi
            2. Me gusta
            3. Me encanta
        `);

        const evaluacionesArray = evaluaciones.split(',').map(num => num.trim());

        if (evaluacionesArray.length === peliculasSeleccionadas.length) {
            const resultados = peliculasSeleccionadas.map((pelicula, index) => {
                let evaluacion;
                switch (evaluacionesArray[index]) {
                    case "1":
                        evaluacion = "No es para mi";
                        break;
                    case "2":
                        evaluacion = "Me gusta";
                        break;
                    case "3":
                        evaluacion = "Me encanta";
                        break;
                    default:
                        evaluacion = "Evaluación no válida";
                }
                return [pelicula, evaluacion]; // Devolver un arreglo con la película y su evaluación
            });

            // Guardar los resultados en el arreglo de evaluaciones de la encuesta
            encuesta.evaluaciones.push(...resultados);

            alert(`Resultados de la evaluación:\n${resultados.map(r => `${r[0]}: ${r[1]}`).join("\n")}`);
        } else {
            alert("El número de evaluaciones no coincide con el número de películas seleccionadas.");
        }
    }
};
const main = () => {
    while (true) {
        // Mostrar el menú principal y pedir al usuario que seleccione una opción
        const op = prompt(`
        M E N U - C R E A C I O N  D E   E N C U E S T A S:
        ---------------------------------------------------   
        Elija una opción numerica : 1,2,3 o 4. 

        Se sugiere crear una encuesta y despues votar:

        O P C I O N E S :

        1. Crear encuesta
        2. Votar en una encuesta
        3. Ver resultados
        4. Salir
        `);

        // Manejar la opción seleccionada por el usuario
        switch (op) {
            case "1":
                // Pedir el nombre de la encuesta
                const nombreEncuesta = prompt("Ingrese el nombre de la encuesta:");
                // Crear una nueva encuesta
                const nuevaEncuesta = crearEncuestaPeliculas(nombreEncuesta);
                if (nuevaEncuesta) {
                    encuestas.push(nuevaEncuesta); // Agregar la nueva encuesta al arreglo encuestas
                    alert("Encuesta creada con éxito."); // Mostrar mensaje de éxito
                }
                break;
            case "2":
                votarEncuesta(encuestas); // Llamar a la nueva función votarEncuesta para votar en una encuesta existente
                break;
            case "3":
                if (encuestas.length === 0) {
                    alert("No hay resultados disponibles."); // Mostrar mensaje de error si no hay encuestas
                } else {
                    let resultados = {}; // Crear un objeto para almacenar los resultados

                    // Contar los votos de cada opción en todas las encuestas
                    encuestas.forEach(encuesta => {
                        encuesta.evaluaciones.forEach(evaluacion => {
                            if (!resultados[evaluacion[0]]) {
                                resultados[evaluacion[0]] = {};
                            }
                            if (!resultados[evaluacion[0]][evaluacion[1]]) {
                                resultados[evaluacion[0]][evaluacion[1]] = 0;
                            }
                            resultados[evaluacion[0]][evaluacion[1]]++;
                        });
                    });

                    // Crear un texto para mostrar los resultados
                    let resultadosTexto = "Resumen de resultados de las encuestas:\n";
                    for (let pelicula in resultados) {
                        resultadosTexto += `${pelicula}`;
                        let votos = [];
                        for (let evaluacion in resultados[pelicula]) {
                            votos.push(`${evaluacion}: ${resultados[pelicula][evaluacion]} voto${resultados[pelicula][evaluacion] > 1 ? 's' : ''}`);
                        }
                        resultadosTexto += `, ${votos.join(', ')}\n`;
                    }

                    alert(resultadosTexto); // Mostrar los resultados
                }
                break;
            case "4":
                alert("Programa de creación y desarrollo de encuestas finalizado con éxito"); // Mostrar mensaje de finalización
                return; // Salir del bucle y terminar el programa
            default:
                alert("Opción no válida, inténtelo de nuevo."); // Mostrar mensaje de error si la opción no es válida
        }
    }
};

const crearEncuestaPeliculas = (nombreEncuesta) => {
    const titulo = nombreEncuesta;
    const opciones = [];
    while (true) {
        const op = prompt(`
        M E N U - P E L I C U L A S:
           
        Elija una o más opciones numéricas separadas por comas (1,2,3 .. hasta la opcion 9)

        O P C I O N E S :

        1. SONIC
        2. SHREK
        3. VOLVER AL FUTURO II
        4. LAS CRONICAS DE NARNIA
        5. EL SENIOR DE LOS ANILLOS
        6. EL VIAJE DE CHIHIRO
        7. AVATAR
        8. EL CADAVER DE LA NOVIA
        9. TODAS LAS ANTERIORES
        `);

        const opcionesSeleccionadas = op.split(',').map(num => num.trim());
        opcionesSeleccionadas.forEach(opcion => {
            switch (opcion) {
                case "1":
                    opciones.push("SONIC");
                    break;
                case "2":
                    opciones.push("SHREK");
                    break;
                case "3":
                    opciones.push("VOLVER AL FUTURO II");
                    break;
                case "4":
                    opciones.push("LAS CRONICAS DE NARNIA");            
                    break;
                case "5":
                    opciones.push("EL SENIOR DE LOS ANILLOS");            
                    break;
                case "6":
                    opciones.push("EL VIAJE DE CHIHIRO");            
                    break;
                case "7":
                    opciones.push("AVATAR");            
                    break;
                case "8":
                    opciones.push("EL CADAVER DE LA NOVIA");            
                    break;
                case "9":
                    opciones.push("SONIC");
                    opciones.push("SHREK");
                    opciones.push("VOLVER AL FUTURO II");
                    opciones.push("LAS CRONICAS DE NARNIA");
                    opciones.push("EL SENIOR DE LOS ANILLOS");
                    opciones.push("EL VIAJE DE CHIHIRO");
                    opciones.push("AVATAR");
                    opciones.push("EL CADAVER DE LA NOVIA");

                    break;
                default:
                    alert(`Opción no válida: ${opcion}`);
            }
        });

        if (opciones.length > 0) break;
    }
    const evaluaciones = [];
    return { titulo, opciones, evaluaciones };
};

main();




