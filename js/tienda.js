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
        if (this.libros.length > 0) {
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

//CREACION DE INSTANCIAS Y CARGA DE DATOS

const libros = new Libros();

const libro1 = new Libro('The Beauty Chef', 'Libro de recetas', '700', '../imagenes/imagen1.jpeg', 'Desayuno');
const libro2 = new Libro('Beauty food', 'Libro de recetas', '500', 'imagenes/imagen2.jpeg', 'Postre');
const libro3 = new Libro('Breakfast', 'Libro de recetas', '1000', 'imagenes/imagen3.jpeg', 'Desayuno');
const libro4 = new Libro('Eat beautiful', 'Libro de recetas', '1300', 'imagenes/imagen4.jpeg', 'Almuerzo');
const libro5 = new Libro('Pasta grannies', 'Libro de recetas', '1200', 'imagenes/imagen5.jpeg', 'Almuerzo');
const libro6 = new Libro('The baking journal', 'Libro de recetas', '600', 'imagenes/imagen6.jpeg', 'Merienda');
const libro7 = new Libro('Cuaderno de recetas', 'Libro de recetas', '900', 'imagenes/imagen7.jpeg', 'Cena');
const libro8 = new Libro('My french family table', 'Libro de recetas', '750', 'imagenes/imagen8.jpeg', 'Almuerzo');
const libro9 = new Libro('The food lab', 'Libro de recetas', '1400', 'imagenes/imagen9.jpeg', 'Merienda');

libros.agregarLibro(libro1);
libros.agregarLibro(libro2);
libros.agregarLibro(libro3);
libros.agregarLibro(libro4);
libros.agregarLibro(libro5);
libros.agregarLibro(libro6);
libros.agregarLibro(libro7);
libros.agregarLibro(libro8);
libros.agregarLibro(libro9);

//GLOBAL

const main = document.querySelector('#main');
const carrito = [];

//LAYOUT

const divContenedor = () => {
    const contenedor = document.createElement('div');

    contenedor.innerHTML = `
                            <div class='contenedor'>
                                <section class'section1'>
                                    <h2>Tienda</h2>
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
    mostrarLibros()
    agregarAlCarrito();
    guardarCompra();
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
        })
    });
}

const guardarCompra = () => {
    const boton = document.querySelector('#finalizarCompra');
    const mensaje = document.querySelector('#mensaje');
    const carritoAnteriorJSON = obtenerDelStorage('carrito')
    const carritoAnteriorOBJ = convertirAObj(carritoAnteriorJSON)

    if (carritoAnteriorOBJ != null) {
        carritoAnteriorOBJ.forEach((e) => {
            carrito.push(e);
        })
    }

    boton.addEventListener('click', () => {
        if (carrito.length > 0) {
            const carritoJSON = convertirAJSON(carrito);
            guardarEnStorage('carrito', carritoJSON);
            location.href = "carrito.html";
        } else {
            mensaje.innerHTML = `<h3>Debe seleccionar al menos un producto para finalizar la compra</h3>`
            setTimeout(() => {
                mensaje.innerHTML = ''
            }, 5000);
        }
    })
}

//LOCAL STORAGE

const guardarEnStorage = (nombreProducto) => {
    const carritoJSON = convertirAJSON(carrito);
    agregarAStorage(nombreProducto, carritoJSON);
}

const convertirAJSON = (elemento) => {
    return JSON.stringify(elemento);
}

const convertirAObj = (elemento) => {
    return JSON.parse(elemento);
}

const agregarAStorage = (nombre, valor) => {
    localStorage.setItem(nombre, valor);
}

const obtenerDelStorage = (clave) => {
    return localStorage.getItem(clave);
}


divContenedor();

