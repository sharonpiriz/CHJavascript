//Elementos globales


//Llamada de funciones
inicializar();

//Clases
class Receta {
    constructor(nombre, ingredientes, preparacion) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.preparacion = preparacion;
    }
}

class Recetas {
    constructor() {
        this.recetas = [];
    }

    agregarReceta(receta) {
        this.recetas.push(receta)
    }

    obtenerNombreRecetas() {
        return this.recetas.map((e, i) => `${i}: ${e.nombre}`)
    }

    buscarReceta(texto) {
        let recetasEncontradas = this.recetas.filter(e => e.nombre.toLowerCase().includes(texto.toLowerCase()));
        console.log(recetasEncontradas)

        recetasEncontradas.forEach((e) => alert(`Nombre: ${e.nombre} \nIngredientes: ${e.ingredientes} \nPreparacion: ${e.preparacion} \n*Presione enter para pasar a la siguiente pantalla*`));

        inicializar();
    }

    eliminarReceta(index) {
        this.recetas.splice(index, 1);
        alert('La receta fue eliminada correctamente');
        inicializar();
    }

    mostrarRecetas() {
        if (this.recetas.length > 0) {
            this.recetas.forEach((e) => alert(`Nombre: ${e.nombre} \nIngredientes: ${e.ingredientes} \nPreparacion: ${e.preparacion} \n*Presione enter para pasar a la siguiente pantalla*`))
            inicializar();
        } else {
            alert('No hay recetas disponibles');
            inicializar();
        }
    }

}
//Instancia de clases

const recetas = new Recetas();

//Funcion inicializar

function inicializar() {
    let opcion = parseInt(prompt('Bienvenido. \n Ingrese la opcion deseada: \n 1: Agregar Receta \n 2: Eliminar Receta \n 3: Buscar receta \n 4: Ver todas las recetas \n 0: Salir'));

    switch (opcion) {
        case 1: informacionAgregarReceta();
            break;
        case 2: informacionEliminarReceta();
            break;
        case 3: informacionBuscarReceta();
            break;
        case 4: recetas.mostrarRecetas();
            break;
        case 0:
            break;
        default: alert('Numero incorrecto. Comience nuevamente');
            inicializar();
            break;
    }
}

//Funciones de agregar receta

function informacionAgregarReceta() {
    let nombre = '';
    let ingredientes = '';
    let preparacion = '';
    let seguirAgregandoRecetas;

    do {
        nombre = prompt('Ingrese el nombre de la receta');
        ingredientes = prompt('Ingrese los ingredientes');
        preparacion = prompt('Ingrese la preparacion de la receta');

        crearReceta(nombre, ingredientes, preparacion);

        seguirAgregandoRecetas = parseInt(prompt('Receta agregada correctamente. \n Desea seguir agregando recetas? 1- Si 0- No'))

    } while (seguirAgregandoRecetas != 0);
    inicializar();
}

function crearReceta(nombre, ingredientes, preparacion) {
    const receta1 = new Receta(nombre, ingredientes, preparacion);
    recetas.agregarReceta(receta1)
}

//Funciones buscar recetas

function informacionBuscarReceta() {
    let textoABuscar = prompt('Ingrese el texto a buscar (se busca por nombre de receta)');
    recetas.buscarReceta(textoABuscar);
}

//Funciones eliminar recetas

function informacionEliminarReceta() {
    let nombreRecetas = recetas.obtenerNombreRecetas();
    let recetaAEliminar = parseInt(prompt(`Ingrese el nombre de la receta a eliminar: \n${nombreRecetas.join('\n')}`));

    recetas.eliminarReceta(recetaAEliminar);
}