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
                    <div id='card' class='card'>
                        <div class='header'>
                            <p class='alert'><strong>Receta: </strong>${e.nombre}</p>
                        </div>
                        <p class='message'>
                            <strong>Ingredientes: </strong>${e.ingredientes} <br>
                            <strong>Preparacion: </strong>${e.preparacion} <br>
                            <strong>Categoria: </strong>${e.categoria}
                        </p>
                        <div class='actions'>
                            <a id='${index}' class='eliminarReceta read'>
                            Eliminar Receta
                            </a>
                        </div>
                    </div>
                    `
                ).join('');
            } else {
                return this.recetas
                    .filter(e => e.categoria === categoria)
                    .map((e, index) => `

                    <div id='card' class='card'>
                        <div class='header'>
                            <p class='alert'><strong>Receta: </strong>${e.nombre}</p>
                        </div>
                        <p class='message'>
                            <strong>Ingredientes: </strong>${e.ingredientes} <br>
                            <strong>Preparacion: </strong>${e.preparacion} <br>
                            <strong>Categoria: </strong>${e.categoria}
                        </p>
                        <div class='actions'>
                            <a id='${index}' class='eliminarReceta read'>
                            Eliminar Receta
                            </a>
                        </div>
                    </div>
                                                    `
                    ).join('');
            }
        } else {
            return `<h3>No hay recetas disponibles<h3>`;
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
                            <button id='agregarReceta' class='agregarReceta'>Agregar receta</button>
                            <h1>Todas las recetas</h1>
                            <label>Buscar receta </label>
                            <div class="search">
                                <input id='textoBuscar' placeholder="Ingrese el texto" type="text">
                                <button id='buscarReceta' type="submit">Go</button>
                            </div>
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
        contenedor.innerHTML = `
                                <form class="form">
                                    <p class="form-title">Agrega tu receta!</p>
                                    <div class="input-container">
                                        <input id='nombreReceta' type="text" placeholder="Nombre de receta">
                                        <span>
                                        </span>
                                    </div>
                                    <div class="input-container">
                                        <input id='ingredientesReceta' type="text" placeholder="Ingedientes">
                                    </div>
                                    <div class="input-container">
                                        <input id='preparacionReceta' type="text" placeholder="Preparacion">
                                    </div>
                                    <div class="input-container">
                                        <label>Categoria</label>
                                        <select id='categorias'>
                                            ${agregarCategorias()}
                                        </select>
                                    </div>

                                    <button type="submit" id='agregarReceta2' class="submit">
                                        Guardar
                                    </button>
                                </form>
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
            divContenedor();
        })
    })
}

//ELIMINAR RECETA LAYOUT

const eliminarReceta = () => {
    const boton = document.querySelectorAll('.eliminarReceta')

    boton.forEach((e) => {
        e.addEventListener('click', (e) => {
            console.log('aprete el boton')
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

         <div id='card' class='card'>
            <div class='header'>
                <p class='alert'><strong>Receta: </strong>${e.nombre}</p>
            </div>
            <p class='message'>
                <strong>Ingredientes: </strong>${e.ingredientes} <br>
                <strong>Preparacion: </strong>${e.preparacion} <br>
                <strong>Categoria: </strong>${e.categoria}
            </p>
            <div class='actions'>
                <a id='${index}' class='eliminarReceta read'>
                Eliminar Receta
                </a>
            </div>
        </div>
        `
        ).join('');
    }
    else {
        return `<h3>No se encontraron recetas disponibles<h3>`;
    }
}

//LLAMADO DE FUNCIONES
divContenedor();