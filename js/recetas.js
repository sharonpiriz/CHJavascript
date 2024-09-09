//CLASES
class Recetas {
    constructor() {
        this.recetas = [];
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

    encontrarIndex(nombre) {
        return this.recetas.findIndex(e => e.nombre === nombre)
    }

    eliminarReceta(index) {
        this.recetas.splice(index, 1);
    }

    mostrarRecetas(categoria) {
        let ix;
        if (this.recetas.length > 0) {
            if (categoria === 'Todas') {
                return this.recetas?.map((e, index) => `
                                        <div class="card">
                                            <div class="header">
                                                <p class="title">${e.nombre}</p>
                                            </div>
                                            <div class="info">
                                                <p class='titulo'><strong>Ingredientes:</strong></p>
                                                <p class='descripcion'>${e.ingredientes}</p>
                                                <p class='titulo'><strong>Preparacion:</strong></p>
                                                <p class='descripcion'>${e.preparacion}</p>
                                                <p class='titulo'><strong>Categoria:</strong></p>
                                                <p class='descripcion'>${e.categoria}</p>
                                            </div>
                                            <div class="footer">
                                                <p class="tag">#Receta #Food </p>
                                                <button type="button" id='${index}' class="eliminarReceta action">Eliminar receta</button>
                                            </div>
                                        </div>
                                        `
                ).join('');
            } else {
                const recetasFiltradas = this.recetas.filter(e => e.categoria === categoria)
                return recetasFiltradas.map((e) => {
                    ix = this.recetas.findIndex(receta => receta.nombre === e.nombre)
                    return `
                            <div class="card">
                                <div class="header">
                                    <p class="title">${e.nombre}</p>
                                </div>
                                <div class="info">
                                    <p class='titulo'><strong>Ingredientes:</strong></p>
                                    <p class='descripcion'>${e.ingredientes}</p>
                                    <p class='titulo'><strong>Preparacion:</strong></p>
                                    <p class='descripcion'>${e.preparacion}</p>
                                    <p class='titulo'><strong>Categoria:</strong></p>
                                    <p class='descripcion'>${e.categoria}</p>
                                </div>
                                <div class="footer">
                                    <p class="tag">#Receta #Food </p>
                                    <button type="button" id='${ix}' class="eliminarReceta action">Eliminar receta</button>
                                </div>
                            </div>
                             `
                }).join('');
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

//VALIDACION DE LOGIN

const validacionLogin = () => {
    const user = JSON.parse(localStorage.getItem('sesionActiva'));

    if (!user) location.href = 'login.html'
}

//DIV CONTENEDOR
const divContenedor = () => {
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = `
                            <section class='sectionContenedor'> 
                                <div class='agregarRecetaDiv'>
                                    <button id='agregarReceta' class='agregarReceta'>Agregar receta</button>
                                </div>
                                <div class='labelSelect'>
                                    <label>Categoria</label>
                                    <select id='categorias'> 
                                    ${agregarCategorias()}
                                    </select>
                                </div>
                                <div class="search">
                                    <label for='textoBuscar'>Buscar receta </label>
                                    <input id='textoBuscar' placeholder="Ingrese el texto" type="text">
                                    <button id='buscarReceta' type="submit">Buscar</button>
                                </div>
                            </section> 
                            <section>
                                <div id='mostrarRecetas' class='mostrarRecetasDiv'>
                                </div>
                                <div id='contenedorBoton'>
                                </div>
                            </section>
                              `

    const agregarRecetaButton = document.querySelector('#agregarReceta')

    agregarRecetaButton.addEventListener('click', () => {
        location.href = "agregarReceta.html";
    })
    validacionLogin();
    obtenerRecetasAgregadas();
    mostrarRecetas();
    buscarReceta();
    eliminarReceta();
}

main.appendChild(contenedor);


//MOSTRAR RECETAS LAYOUT
const mostrarRecetas = () => {
    const select = document.querySelector('#categorias');
    const mostrarRecetasDiv = document.querySelector('#mostrarRecetas');
    mostrarRecetasDiv.innerHTML = recetas.mostrarRecetas('Todas');

    select.addEventListener('change', () => {
        const categoriaSeleccionada = select.value;
        agregarStorage('categoria', categoriaSeleccionada);

        if (recetas.mostrarRecetas
            (categoriaSeleccionada).length > 0) {
            mostrarRecetasDiv.innerHTML = recetas.mostrarRecetas(categoriaSeleccionada)
            eliminarReceta();
        }
        else {
            mostrarRecetasDiv.innerHTML = `<h3>No se encontraron recetas en esta categoria<h3>`;
        }
    })
}

//AGREGAR CATEGORIAS LAYOUTS
const agregarCategorias = () => {
    const categorias = ['Todas', 'Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Postre'];
    let opciones = '';

    for (const c of categorias) {
        opciones += `<option value='${c}'>${c}</option>`;
    }

    return opciones;
}

//BUSCAR RECETAS LAYOUT
const buscarReceta = () => {
    const mostrarRecetasDiv = document.querySelector('#mostrarRecetas');
    const buscarRecetaButton = document.querySelector('#buscarReceta');
    const contenedorBoton = document.querySelector('#contenedorBoton');

    buscarRecetaButton.addEventListener('click', () => {
        mostrarRecetasDiv.innerHTML = '';
        const buscarRecetaValue = document.querySelector('#textoBuscar').value;

        if (buscarRecetaValue != " " && buscarRecetaValue != null && buscarRecetaValue.length != 0) {
            const obtenerBoton = document.querySelector('#botonVolver')

            if (obtenerBoton === null) {
                const boton = document.createElement('button');
                boton.setAttribute('id', 'botonVolver');
                boton.setAttribute('class', 'btn');
                const contenido = document.createTextNode('Volver a la lista');
                boton.appendChild(contenido);
                contenedorBoton.appendChild(boton);

                boton.addEventListener('click', () => {
                    divContenedor();
                })
            }

            mostrarRecetasDiv.innerHTML = informacionBuscarReceta(buscarRecetaValue);
            eliminarReceta()

        }
        else {
            mostrarRecetasDiv.innerHTML = '';
            divContenedor()
            Swal.fire("Debe ingresar un valor en el buscador");
        }
    })
}

//ELIMINAR RECETA LAYOUT

const eliminarReceta = () => {
    const boton = document.querySelectorAll('.eliminarReceta');

    boton.forEach((e) => {
        e.addEventListener('click', (e) => {
            console.log(e.target.id)
            recetas.eliminarReceta(e.target.id)
            const objJSON = convertirAJSON(recetas.recetas);
            actualizarLS(objJSON, 'recetas')
            location.reload()
        })
    })
}

//FUNCION CREAR RECETA

function crearReceta(nombre, ingredientes, preparacion, categoria) {
    const receta1 = new Receta(nombre, ingredientes, preparacion, categoria);
    recetas.agregarReceta(receta1)
}

//MANEJO DE AGREGAR RECETA DESDE EL STORAGE

const obtenerRecetasAgregadas = () => {
    if (localStorage.getItem('recetas')) {
        const recetasJSON = obtenerStorage('recetas');
        const recetasOBJ = convertirAObj(recetasJSON);

        for (let r of recetasOBJ) {
            const recetaExistente = recetas.recetas.some(receta =>
                receta.nombre === r.nombre &&
                receta.ingredientes === r.ingredientes &&
                receta.preparacion === r.preparacion &&
                receta.categoria === r.categoria
            );

            if (!recetaExistente) crearReceta(r.nombre, r.ingredientes, r.preparacion, r.categoria);

        }
    }
}

//FUNCION BUSCAR RECETA

function informacionBuscarReceta(textoABuscar) {
    let recetasEncontradas = recetas.buscarReceta(textoABuscar);

    if (recetasEncontradas.length > 0) {
        let index
        return recetasEncontradas?.map((e) => {
            index = recetas.encontrarIndex(e.nombre);
            return `

            <div class="card">
                <div class="header">
                    <p class="title">${e.nombre}</p>
                </div>
                <div class="info">
                    <p class='titulo'><strong>Ingredientes:</strong></p>
                    <p class='descripcion'>${e.ingredientes}</p>
                    <p class='titulo'><strong>Preparacion:</strong></p>
                    <p class='descripcion'>${e.preparacion}</p>
                    <p class='titulo'><strong>Categoria:</strong></p>
                    <p class='descripcion'>${e.categoria}</p>
                </div>
                <div class="footer">
                    <p class="tag">#Receta #Food </p>
                    <button type="button" id='${index}' class="eliminarReceta action">Eliminar receta</button>
                </div>
            </div>
                `
        }
        ).join('');
    }
    else {
        return `<h3>No se encontraron recetas disponibles<h3>`;
    }
}

//LOCAL STORAGE

const agregarStorage = (clave, valor) => {
    localStorage.setItem(clave, valor);
}

const obtenerStorage = (clave) => {
    return localStorage.getItem(clave);
}

const convertirAObj = (elemento) => {
    return JSON.parse(elemento);
}

const convertirAJSON = (array) => {
    return JSON.stringify(array);
}

const actualizarStorage = (clave, valor) => {
    eliminarStorage(clave);
    localStorage.setItem(clave, valor);
}

const eliminarStorage = (clave) => {
    localStorage.removeItem(clave);
}

const actualizarLS = (nuevoArrayJSON, claveAremover) => {
    eliminarStorage(claveAremover);
    if (recetas.recetas.length != 0) localStorage.setItem('recetas', nuevoArrayJSON);
}

//LLAMADO DE FUNCIONES
divContenedor();