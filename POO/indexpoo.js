class Encuesta {
    constructor(titulo) {
        this.titulo = titulo;
        this.opciones = [];
        this.evaluaciones = [];
    }

    agregarOpcion(opcion) {
        this.opciones.push(opcion);
    }

    agregarOpciones(opciones) {
        this.opciones.push(...opciones);
    }

    agregarEvaluacion(opcion, evaluacion) {
        this.evaluaciones.push({ opcion, evaluacion });
    }

    registrarVoto(evaluaciones) {
        this.evaluaciones.push(...evaluaciones);
    }

    contarResultados() {
        let resultados = {};
        this.evaluaciones.forEach(evaluacion => {
            if (!resultados[evaluacion.opcion]) {
                resultados[evaluacion.opcion] = {};
            }
            if (!resultados[evaluacion.opcion][evaluacion.evaluacion]) {
                resultados[evaluacion.opcion][evaluacion.evaluacion] = 0;
            }
            resultados[evaluacion.opcion][evaluacion.evaluacion]++;
        });
        return resultados;
    }

    obtenerResultados() {
        return this.evaluaciones.map(e => `${e.opcion}: ${e.evaluacion}`).join("\n");
    }
}
class SistemaEncuestas {
    constructor() {
        this.encuestas = [];
    }
 
    crearEncuesta() {
        const titulo = prompt("Ingrese el nombre de la encuesta:");
        const opciones = this.obtenerOpcionesPeliculas();
        const nuevaEncuesta = new Encuesta(titulo);
        nuevaEncuesta.agregarOpciones(opciones);
        this.encuestas.push(nuevaEncuesta);
        alert("Encuesta creada con éxito.");
    }
 
    obtenerOpcionesPeliculas() {
        const opcionesDisponibles = ["SONIC", "SHREK", "VOLVER AL FUTURO II","LAS CRONICAS DE NARNIA","EL SENIOR DE LOS ANILLOS","EL VIAJE DE CHIHIRO","AVATAR","EL CADAVER DE LA NOVIA"];
        const seleccion = prompt(`Seleccione una o más opciones numéricas separadas por comas:\n1. SONIC\n2. SHREK\n3. VOLVER AL FUTURO II \n4. LAS CRONICAS DE NARNIA \n5. EL SENIOR DE LOS ANILLOS \n6. EL VIAJE DE CHIHIRO \n7. AVATAR \n8. EL CADAVER DE LA NOVIA" \n9. TODAS LAS ANTERIORES`);
        const seleccionArray = seleccion.split(',').map(num => num.trim());
        let opciones = [];
        seleccionArray.forEach(opcion => {
            switch (opcion) {
                case "1": opciones.push("SONIC"); break;
                case "2": opciones.push("SHREK"); break;
                case "3": opciones.push("VOLVER AL FUTURO II"); break;
                case "4": opciones.push("LAS CRONICAS DE NARNIA"); break;
                case "5": opciones.push("EL SENIOR DE LOS ANILLOS"); break;
                case "6": opciones.push("EL VIAJE DE CHIHIRO"); break;
                case "7": opciones.push("AVATAR"); break;
                case "8": opciones.push("EL CADAVER DE LA NOVIA"); break;
                case "9": opciones = [...opcionesDisponibles]; break;
                default: alert(`Opción no válida: ${opcion}`);
            }
        });
        return opciones;
    }
 
    votarEncuesta() {
        if (this.encuestas.length === 0) {
            alert("No hay encuestas disponibles.");
            return;
        }
        let listaEncuestas = this.encuestas.map((enc, i) => `${i + 1}. ${enc.titulo}`).join("\n");
        const indice = parseInt(prompt(`Seleccione una encuesta:\n${listaEncuestas}`)) - 1;
        const encuesta = this.encuestas[indice];
        if (!encuesta) return alert("Selección inválida.");
    
        const evaluaciones = prompt(`Evalúe cada película con 1 (No es para mí), 2 (Me gusta), 3 (Me encanta):\n${encuesta.opciones.map((op, i) => `${i + 1}. ${op}`).join("\n")}`).split(',').map(e => e.trim());
        if (evaluaciones.length !== encuesta.opciones.length) return alert("Número de evaluaciones incorrecto.");
    
        const resultados = encuesta.opciones.map((op, i) => {
            const evalMap = { "1": "No es para mí", "2": "Me gusta", "3": "Me encanta" };
            return { opcion: op, evaluacion: evalMap[evaluaciones[i]] || "Evaluación no válida" };
        });
    
        encuesta.registrarVoto(resultados);
        alert(`Resultados:\n${encuesta.obtenerResultados()}`); // Asegúrate de llamar a la función correctamente
    }

    verResultados() {
        if (this.encuestas.length === 0) {
            alert("No hay resultados disponibles.");
        } else {
            let resultadosGlobales = {};
    
            // Sumar los resultados de todas las encuestas
            this.encuestas.forEach(encuesta => {
                const resultados = encuesta.contarResultados();
                for (let opcion in resultados) {
                    if (!resultadosGlobales[opcion]) {
                        resultadosGlobales[opcion] = {};
                    }
                    for (let evaluacion in resultados[opcion]) {
                        if (!resultadosGlobales[opcion][evaluacion]) {
                            resultadosGlobales[opcion][evaluacion] = 0;
                        }
                        resultadosGlobales[opcion][evaluacion] += resultados[opcion][evaluacion];
                    }
                }
            });
    
            // Crear el texto de resultados
            let resultadosTexto = "Resumen de resultados de las encuestas:\n";
            for (let opcion in resultadosGlobales) {
                resultadosTexto += `${opcion}`;
                let votos = [];
                for (let evaluacion in resultadosGlobales[opcion]) {
                    votos.push(`${evaluacion}: ${resultadosGlobales[opcion][evaluacion]} voto${resultadosGlobales[opcion][evaluacion] > 1 ? 's' : ''}`);
                }
                resultadosTexto += `, ${votos.join(', ')}\n`;
            }
    
            alert(resultadosTexto);
        }
    }

    iniciar() {
        while (true) {
            const opcion = prompt(`MENU\n1. Crear Encuesta\n2. Votar\n3. Ver Resultados\n4. Salir`);
            switch (opcion) {
                case "1": this.crearEncuesta(); break;
                case "2": this.votarEncuesta(); break;
                case "3": this.verResultados(); break;
                case "4": alert("Programa finalizado"); return;
                default: alert("Opción inválida");
            }
        }
    }
}
 
const sistema = new SistemaEncuestas();
sistema.iniciar();