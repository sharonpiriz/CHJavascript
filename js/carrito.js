//GLOBAL

let carrito = [];
// LAYOUT

const divContenedor = () => {
    const main = document.querySelector('#main');
    const contenedor = document.createElement('div');

    contenedor.innerHTML = `
                            <h2>Mi carrito</h2>
                            <section>                       <div id='mostrarLibros'></div>   
                            <div>
                            <button id='agregarProductos'>Agregar productos</button</div>
                            </section>

                            `

    main.appendChild(contenedor);
    mostrarLibros();
    eliminarDeCarrito();
    agregarProductos();
}

const mostrarLibros = () => {
    const mostrarDiv = document.querySelector('#mostrarLibros');
    let lista = '';

    const objetoJSON = recuperarDatosLS('carrito');
    const objetoParse = convertirAObj(objetoJSON);
    carrito = objetoParse;

    if (objetoParse != null) {
        objetoParse.map((e, index) => {
            lista += `
                    <div id='card'>
                        <img src="${e.imagenUrl}" width="200" height="300"/>
                        <h2><strong>Titulo:</strong> ${e.nombre} </h2>
                        <h2><strong>Descripcion:</strong> ${e.descripcion}</h2>
                        <h2><strong>Categoria:</strong> ${e.categoria}</h2>
                        <h2><strong>Precio:</strong> $${e.precio}</h2>
                        <button id='${index}' class='eliminarCarrito'>Eliminar del carrito</button>
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
            const objJSON = convertirAJSON(carrito);
            actualizarLS(objJSON, 'carrito')
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

//FUNCIONES LOCAL STORAGE

const convertirAJSON = (array) => {
    return JSON.stringify(array);
}

const recuperarDatosLS = (clave) => {
    return localStorage.getItem(clave);
}

const convertirAObj = (objJSON) => {
    return JSON.parse(objJSON);
}

const removerLS = (clave) => {
    localStorage.removeItem(clave);
}

const actualizarLS = (nuevoArrayJSON, claveAremover) => {
    removerLS(claveAremover);
    if (carrito.length != 0) localStorage.setItem('carrito', nuevoArrayJSON);
}


//LLAMADO DE FUNCIONES
divContenedor();