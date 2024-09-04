
//FUNCIONES LOCAL STORAGE

const convertirAJSON = (array) => {
    return JSON.stringify(array);
}

const recuperarDatosLS = (clave) => {
    return localStorage.getItem(clave);
}

const obtenerDelStorage = (clave) => {
    return localStorage.getItem(clave);
}

const convertirAObj = (objJSON) => {
    return JSON.parse(objJSON);
}

const removerLS = (clave) => {
    localStorage.removeItem(clave);
}

const actualizarLS = (claveAremover, nuevoArrayJSON) => {
    removerLS(claveAremover);
    if (carrito.length != 0) localStorage.setItem('userCarrito', nuevoArrayJSON);
}

//GLOBAL
let carrito = [];
let userCarrito = []
const sesionActivaJSON = obtenerDelStorage('sesionActiva');
const sesionActivaOBJ = convertirAObj(sesionActivaJSON);
if (sesionActivaOBJ) usernameActivo = sesionActivaOBJ.username
// LAYOUT

//VALIDACION DE LOGIN

const validacionLogin = () => {
    const user = JSON.parse(localStorage.getItem('sesionActiva'));

    if (!user) location.href = 'login.html'
}

const divContenedor = () => {
    const main = document.querySelector('#main');
    const contenedor = document.createElement('div');

    contenedor.innerHTML = `
                            <div class='contenedor'>
                                <section class'section1'>
                                    <h2>Mi Carrito</h2>
                                </section>
                                <section class='section2'>                   
                                    <div id='mostrarLibros' class='mostrarListaLibros'></div>   
                                </section>
                                <section class='section3'>
                                    <button id='agregarProductos' class='btn'>Agregar productos</button>
                                    <button id='pagar' class='btn'>Pagar</button>
                                </section>
                            </div>
                            `

    main.appendChild(contenedor);

    const pagarButton = document.querySelector('#pagar');
    pagarButton.addEventListener('click', () => {
        carrito === null || carrito == [] || carrito == undefined ? Swal.fire("No puede pagar sin tener productos en su carrito") : location.href = 'pagar.html'
    })
    validacionLogin()
    mostrarLibros();
    eliminarDeCarrito();
    agregarProductos();
}

const mostrarLibros = () => {
    const mostrarDiv = document.querySelector('#mostrarLibros');
    let lista = '';

    const objetoJSON = recuperarDatosLS('userCarrito');
    const objetoParse = convertirAObj(objetoJSON);
    let usuarioCarritoActivo = {};

    if (objetoParse != null) usuarioCarritoActivo = objetoParse.find(user => user.username === usernameActivo)

    carrito = usuarioCarritoActivo ? usuarioCarritoActivo.carrito : [];

    if (carrito && carrito.length > 0) {
        carrito.map((e, index) => {
            lista += `
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
                                <button id=${index} class='eliminarCarrito type='button'>Eliminar del carrito</button>
                            </div>
                        </div>
                    `
        })
    } else {
        lista = `<h2>Aun no ha agregado libros a su carrito</h2>`
    }
    mostrarDiv.innerHTML = lista;
}

const eliminarDeCarrito = () => {
    const boton = document.querySelectorAll('.eliminarCarrito');

    boton.forEach(e => {
        e.addEventListener('click', (e) => {
            removerObjDeArray(e.target.id);
            userCarrito.push({
                username: usernameActivo,
                carrito: carrito
            })

            const objJSON = convertirAJSON(userCarrito);
            actualizarLS('userCarrito', objJSON)
            location.reload();

        })
    })
}

const agregarProductos = () => {
    const boton = document.querySelector('#agregarProductos');

    boton.addEventListener('click', () => {
        location.href = "tienda.html";
    })
}

const removerObjDeArray = (index) => {
    carrito.splice(index, 1);
}

//LLAMADO DE FUNCIONES
divContenedor();