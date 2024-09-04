//CLASES
class Libro {
    constructor(nombre, descripcion, precio, imagenUrl, categoria) {
        this.nombre = nombre,
            this.descripcion = descripcion,
            this.precio = precio,
            this.imagenUrl = imagenUrl,
            this.categoria = categoria
    }
}
class Libros {
    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {
        if (libro) this.libros.push(libro);
    }

    mostrarLibros(categoria) {
        let index;

        if (this.libros != undefined || this.libros != null || this.libros.length > 0) {
            if (categoria === 'Todos') {
                return this.libros?.map((e, index) =>
                    `
                    <div id='card' class='item'>
                        <h3><strong>Titulo:</strong> ${e.nombre} </h3>
                        <figure>
                            <img src="${e.imagenUrl}" alt='${e.nombre}'/>
                        </figure>
                        <p class='description'>${e.descripcion}</p>
                        <p class='special'><strong>Precio</strong>
                        $${e.precio}
                        </p>
                        <p class='special'><strong>Categoria</strong>
                        ${e.categoria}
                        </p>
                        <div class='buttonDiv'>
                            <button id=${index} class='agregarCarrito type='button'>Agregar al carrito</button>
                        </div>
                    </div>
                    `
                ).join('')
            }
            else {
                const librosFiltrados = this.libros.filter(e => e.categoria === categoria)
                if (librosFiltrados.length > 0) {
                    return librosFiltrados.map((e) => {
                        index = this.libros.findIndex(libro => libro.nombre === e.nombre)
                        return `
                        <div id='card' class='item'>
                            <h3><strong>Titulo:</strong> ${e.nombre} </h3>
                            <figure>
                                <img src="${e.imagenUrl}" alt='${e.nombre}'/>
                            </figure>
                            <p class='description'>${e.descripcion}</p>
                            <p class='special'><strong>Precio</strong>
                            $${e.precio}
                            </p>
                            <p class='special'><strong>Categoria</strong>
                            ${e.categoria}
                            </p>
                            <div class='buttonDiv'>
                                <button id=${index} class='agregarCarrito type='button'>Agregar al carrito</button>
                            </div>
                        </div>
                        `
                    }
                    ).join('')
                } else {
                    return ''
                }
            }
        }
        else {
            return `<h3>No hay libros para mostrar<h3>`
        }
    }

    obtenerProducto(index) {
        return this.libros[index];
    }
}

//GLOBAL
const main = document.querySelector('#main');
const carrito = [];
const userCarrito = [];
let fetchCargado = false;

//CREACION DE INSTANCIAS Y CARGA DE DATOS
const libros = new Libros();

//FETCH
const peticionFetch = () => {
    fetch('/productosTienda.json')
        .then((respuesta) => respuesta.json())
        .then((data) => {
            fetchCargado = true;
            for (const d of data) {
                const libro = new Libro(d.nombre, d.descripcion, d.precio, d.imagenUrl, d.categoria)
                libros.agregarLibro(libro)
            }
        })
}

//LAYOUT
const divContenedor = () => {
    const contenedor = document.createElement('div');

    contenedor.innerHTML = `
                            <div class='contenedor'>
                                <section class'section1'>
                                    <div class='labelSelect'>
                                        <label>Categoria</label>
                                        <select id='categoriaSlc'> 
                                        ${agregarCategorias()}
                                        </select>
                                    </div>
                                    </select>
                                </section>
                                <section class'section2'>
                                    <div id='mostrarListaLibros' class='mostrarListaLibros'>
                                    </div>
                                    <div id='loader' class='loader'>
                                    </div>
                                </section>
                                <section class='section3'>
                                    <button id='finalizarCompra' class="btn"> Finalizar compra</button>

                                </section>
                                <section class='section4'>
                                    <div id='mensaje'> </div>
                                </section> 
                            </div>
                            `

    main.appendChild(contenedor);
    peticionFetch();
    cargarPantalla();
}

const cargarPantalla = () => {
    const idcontenedor = document.querySelector('#loader');

    if (fetchCargado) {
        mostrarLibros();
    } else {
        loader();
        const intervalo = setInterval(() => {
            if (fetchCargado) {
                idcontenedor.style.display = 'none';
                clearInterval(intervalo);
                mostrarLibros();
                agregarAlCarrito();
                guardarCompra();
            }
        }, 3000);
    }
};

const loader = () => {
    const idcontenedor = document.querySelector('#loader');

    idcontenedor.innerHTML = `
                            <div class="dot-spinner">
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            </div>
                                `

}

const mostrarLibros = () => {
    const select = document.querySelector('#categoriaSlc');
    const mostrarLibrosDiv = document.querySelector('#mostrarListaLibros');

    mostrarLibrosDiv.innerHTML = libros.mostrarLibros('Todos')

    select.addEventListener('change', () => {
        const categoriaValor = select.value;
        const librosHTML = libros.mostrarLibros(categoriaValor)

        if (librosHTML.length > 0) {
            mostrarLibrosDiv.innerHTML = librosHTML
            agregarAlCarrito()
        } else {
            mostrarLibrosDiv.innerHTML = '<h3>No se encontraron libros para esta categoria<h3>'
        }
    })
}

const agregarCategorias = () => {
    const categorias = ['Todos', 'Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Postre'];
    let opciones = '';

    for (const c of categorias) {
        opciones += `<option value=${c}>${c}</option>`;
    }
    return opciones;
}

//FUNCIONES DE LOS BOTONES

const agregarAlCarrito = () => {
    const boton = document.querySelectorAll('.agregarCarrito');

    boton.forEach(e => {
        e.addEventListener('click', (e) => {
            if (localStorage.getItem('sesionActiva')) {
                const producto = libros.obtenerProducto(e.target.id);
                carrito.push(producto)
                Toastify({
                    text: `${producto.nombre} se agrego al carrito`,
                    close: true,
                    gravity: 'bottom',
                    style: {
                        color: 'black',
                        background: "#ddc5b3",
                    }
                }).showToast();
            } else {
                Swal.fire("Inicia sesion para comprar");
            }
        })
    });
}

const guardarCompra = () => {
    const boton = document.querySelector('#finalizarCompra');
    const userCarritoActualJSON = obtenerDelStorage('userCarrito')
    let userCarritoActualOBJ = convertirAObj(userCarritoActualJSON) || [];
    const sesionActivaJSON = obtenerDelStorage('sesionActiva');
    const sesionActivaOBJ = convertirAObj(sesionActivaJSON);
    let usernameActivo;
    if (sesionActivaOBJ) usernameActivo = sesionActivaOBJ.username

    if (userCarritoActualOBJ != null) {
        const usuarioCarritoActivo = userCarritoActualOBJ.find(user => user.username === usernameActivo)
        !usuarioCarritoActivo ? [] : usuarioCarritoActivo.carrito.forEach((e) => {
            carrito.push(e);
        })
    }

    if (localStorage.getItem('sesionActiva')) {
        boton.addEventListener('click', () => {
            if (carrito.length > 0) {

                const usuarioIndex = userCarritoActualOBJ.findIndex(user => user.username === usernameActivo);

                if (usuarioIndex > -1) {
                    userCarritoActualOBJ[usuarioIndex].carrito = userCarritoActualOBJ[usuarioIndex].carrito.concat(carrito);
                } else {
                    userCarritoActualOBJ.push({ username: usernameActivo, carrito });
                }
                guardarEnStorage('userCarrito', userCarritoActualOBJ);
                location.href = "carrito.html";
            } else {
                Swal.fire("Debe seleccionar al menos un producto para finalizar la compra");
            }
        })
    } else {
        boton.style.display = 'none';
    }
}

//LOCAL STORAGE

const guardarEnStorage = (nombreClave, valor) => {
    const valorJSON = convertirAJSON(valor);
    agregarAStorage(nombreClave, valorJSON);
}


const convertirAJSON = (elemento) => {
    return JSON.stringify(elemento);
}

const convertirAObj = (objJSON) => {
    return JSON.parse(objJSON);
}

const agregarAStorage = (nombre, valor) => {
    localStorage.setItem(nombre, valor);
}

const obtenerDelStorage = (clave) => {
    return localStorage.getItem(clave);
}

divContenedor();

