//VARIABLES GLOBALES
let paginaRecetaActiva = false;

//CLASES
class Recetas {
    constructor() {
        this.recetas = [
            {
                nombre: 'wrap',
                ingredientes: 'tortita, queso',
                preparacion: 'poner el queso en la tortita',
                categoria: 'Almuerzo'
            },
            {
                nombre: 'tortilla',
                ingredientes: 'papa, huevo',
                preparacion: 'cocinar la papa y mezclar con el huevo',
                categoria: 'Cena'
            }
        ];
    }

    agregarReceta(receta) {
        this.recetas.push(receta);
    }

    obtenerNombreRecetas() {
        return this.recetas.map((e, i) => `${i}: ${e.nombre}`)
    }

    buscarReceta(texto) {
        let recetasEncontradas = this.recetas.filter(e => e.nombre.toLowerCase().includes(texto.toLowerCase()));

        return recetasEncontradas;
    }

    eliminarReceta(index) {
        this.recetas.splice(index, 1);
    }

    mostrarRecetas(categoria) {
        if (this.recetas.length > 0) {
            if (categoria === 'Todas') {
                return this.recetas?.map((e, index) => `
                <div id='card'>
                    <h2><strong>Nombre:</strong> ${e.nombre} </h2>
                    <h2><strong>Ingredientes:</strong> ${e.ingredientes}</h2>
                    <h2><strong>Preparacion:</strong> ${e.preparacion}</h2>
                    <h2><strong>Categoria:</strong> ${e.categoria}</h2>
                    <button id=${index} class='eliminarReceta'>Eliminar receta</button>
                </div>
                                                    `
                ).join('');
            } else {
                return this.recetas
                    .filter(e => e.categoria === categoria)
                    .map((e, index) => `
                <div id='card'>
                    <h2><strong>Nombre:</strong> ${e.nombre} </h2>
                    <h2><strong>Ingredientes:</strong> ${e.ingredientes}</h2>
                    <h2><strong>Preparacion:</strong> ${e.preparacion}</h2>
                    <h2><strong>Categoria:</strong> ${e.categoria}</h2>
                    <button id=${index} class='eliminarReceta'>Eliminar receta</button>
                </div>
                                                    `
                    ).join('');
            }
        } else {
            return `<h2>No hay recetas disponibles<h2>`;
        }
    }
}
class Receta {
    constructor(nombre, ingredientes, preparacion, categoria) {
        this.nombre = nombre;
        this.ingredientes = ingredientes;
        this.preparacion = preparacion;
        this.categoria = categoria;
    }
}

//INSTANCIA DE CLASES
const recetas = new Recetas();

//DIV CONTENEDOR

const divContenedor = () => {
    const contenedor = document.querySelector('#contenedor');
    paginaRecetaActiva = false;

    contenedor.innerHTML = `    
                            <button id='agregarReceta'>Agregar receta</button>
                            <h1>Todas las recetas</h1>
                            <label>Buscar receta </label>
                            <input type='text' id='textoBuscar'/> 
                            <button id='buscarReceta'>Buscar</button>
                            <select id='categorias'>
                                ${agregarCategorias()}
                            </select>
                            <div id='mostrarRecetas'>
                            </div>
                            `

    mostrarRecetas();
    agregarReceta();
    buscarReceta();
    eliminarReceta();
}

//MOSTRAR RECETAS LAYOUT

const mostrarRecetas = () => {
    const select = document.querySelector('#categorias');
    const mostrarRecetasDiv = document.querySelector('#mostrarRecetas');

    mostrarRecetasDiv.innerHTML = recetas.mostrarRecetas('Todas');

    select.addEventListener('change', () => {
        const categoriaSeleccionada = select.value;
        mostrarRecetasDiv.innerHTML = recetas.mostrarRecetas(categoriaSeleccionada).length > 0 ? recetas.mostrarRecetas(categoriaSeleccionada) : `<h3>No se encontraron recetas en esta categoria<h3>`;
    })
}

// AGREGAR RECETAS LAYOUT

const agregarReceta = () => {

    const agregarRecetaButton = document.querySelector('#agregarReceta');

    agregarRecetaButton.addEventListener('click', () => {
        paginaRecetaActiva = true;
        contenedor.innerHTML = `<div id='formAgregarReceta'>
                                    <h1>Agregar Receta</h1>
                                    <label>Nombre</label>
                                    <input type='text' id='nombreReceta'/>
    
                                    <label>Ingredientes</label>
                                    <input type='text' id='ingredientesReceta'/>
    
                                    <label>Preparacion</label>
                                    <textArea id='preparacionReceta'></textArea>
                                    <label>Categoria</label>
                                    <select id='categorias'>
                                        ${agregarCategorias()}
                                    </select>
    
                                    <button id='agregarReceta2'>Agregar receta</button>
                                </div>
                                `;

        const agregarReceta2Button = document.querySelector('#agregarReceta2');

        agregarReceta2Button.addEventListener('click', () => {
            const nombre = document.querySelector('#nombreReceta').value;
            const ingredientes = document.querySelector('#ingredientesReceta').value;
            const preparacion = document.querySelector('#preparacionReceta').value;
            const categoria = document.querySelector('#categorias').value;

            crearReceta({ nombre, ingredientes, preparacion, categoria })
            divContenedor();
        })
    })
}

main.appendChild(contenedor);

//AGREGAR CATEGORIAS LAYOUTS

const agregarCategorias = () => {
    const categorias = ['Todas', 'Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Postre'];
    let opciones = '';

    for (const c of categorias) {
        if (c === 'Todas' && paginaRecetaActiva === true) {
            opciones += `<option disabled value='${c}'>${c}</option>`;
        } else {
            opciones += `<option value='${c}'>${c}</option>`;
        }

    }

    return opciones;
}

//BUSCAR RECETAS LAYOUT

const buscarReceta = () => {
    const mostrarRecetasDiv = document.querySelector('#mostrarRecetas');
    const buscarRecetaButton = document.querySelector('#buscarReceta');

    buscarRecetaButton.addEventListener('click', () => {
        mostrarRecetasDiv.innerHTML = '';
        const buscarRecetaValue = document.querySelector('#textoBuscar').value;
        const boton = document.createElement('button');
        boton.setAttribute('id', 'botonVolver');
        const contenido = document.createTextNode('Volver a la lista');

        boton.appendChild(contenido);
        mostrarRecetasDiv.appendChild(boton);

        const recetasContainer = document.createElement('div');
        recetasContainer.innerHTML = informacionBuscarReceta(buscarRecetaValue);
        mostrarRecetasDiv.appendChild(recetasContainer);

        boton.addEventListener('click', () => {
            console.log('entre al clic')
            divContenedor();
        })
    })
}

//ELIMINAR RECETA LAYOUT

const eliminarReceta = () => {
    const boton = document.querySelectorAll('.eliminarReceta')

    boton.forEach((e) => {
        e.addEventListener('click', (e) => {
            recetas.eliminarReceta(e.target.id)
            divContenedor()
        })
    })
}

//FUNCION AGREGAR RECETA

function crearReceta({ nombre, ingredientes, preparacion, categoria }) {
    const receta1 = new Receta(nombre, ingredientes, preparacion, categoria);
    recetas.agregarReceta(receta1)
}

//FUNCION BUSCAR RECETA

function informacionBuscarReceta(textoABuscar) {
    let recetasEncontradas = recetas.buscarReceta(textoABuscar);

    if (recetasEncontradas.length > 0) {
        return recetasEncontradas?.map((e) => `
        <h2><strong>Nombre:</strong> ${e.nombre} </h2>
        <h2><strong>Ingredientes:</strong> ${e.ingredientes}</h2>
        <h2><stron>Preparacion:</strong> ${e.preparacion}</h2>
                                        `
        ).join('');
    }
    else {
        return `<h2>No se encontraron recetas disponibles<h2>`;
    }
}

//LLAMADO DE FUNCIONES
divContenedor();