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
        if (this.libros.length > 0) {
            if (categoria === 'Todos') {
                return this.libros?.map((e, index) =>
                    `
                    <div id='card'>
                        <img src="${e.imagenUrl}" width="200" height="300"/>
                        <h2><strong>Titulo:</strong> ${e.nombre} </h2>
                        <h2><strong>Descripcion:</strong> ${e.descripcion}</h2>
                        <h2><strong>Categoria:</strong> ${e.categoria}</h2>
                        <h2><strong>Precio:</strong> $${e.precio}</h2>
                        <button id=${index} class='agregarCarrito'>Agregar al carrito</button>
                    </div>
                    `
                ).join('')
            }
            else {
                return this.libros.filter(e => e.categoria === categoria)
                    .map((e, index) =>
                        `
                    <div id='card'>
                        <img src="${e.imagenUrl}" width="200" height="300"/>
                        <h2><strong>Titulo:</strong> ${e.nombre} </h2>
                        <h2><strong>Descripcion:</strong> ${e.descripcion}</h2>
                        <h2><strong>Categoria:</strong> ${e.categoria}</h2>
                        <h2><strong>Precio:</strong> $${e.precio}</h2>
                        <button id=${index} class='agregarCarrito'>Agregar al carrito</button>
                    </div>
                    `
                    ).join('')
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
                            <section>
                                <h2>Tienda</h2>
                                <select id='categoriaSlc'> 
                                ${agregarCategorias()}
                                </select>
                            </section>
                            <section>
                                <div id='mostrarListaLibros'>
                                </div>
                                <div>
                                    <button id='finalizarCompra'>Finalizar compra</button>
                                </div>
                            </section>
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
        mostrarLibrosDiv.innerHTML = libros.mostrarLibros(categoriaValor).length > 0 ? libros.mostrarLibros(categoriaValor) : '<h3>No se encontraron libros para esta categoria<h3>';
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
        })
    });
}

const guardarCompra = () => {
    const boton = document.querySelector('#finalizarCompra');

    boton.addEventListener('click', () => {
        const carritoJSON = convertirAJSON(carrito);
        guardarEnStorage('carrito', carritoJSON);
        location.href = "carrito.html";
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

const agregarAStorage = (nombre, valor) => {
    localStorage.setItem(nombre, valor);
}

const removerStorage = (nombre) => {
    localStorage.removeItem(nombre);
}


divContenedor();

