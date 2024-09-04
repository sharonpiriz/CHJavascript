//GLOBAL
let productosCarrito = []
let facturacion = []

// LOCAL STORAGE
const obtenerStorage = (clave) => {
    return localStorage.getItem(clave)
}

const convertirAObj = (elemento) => {
    return JSON.parse(elemento);
}

const sesionActivaJSON = obtenerStorage('sesionActiva');
const sesionActivaOBJ = convertirAObj(sesionActivaJSON);

const userCarritoJSON = obtenerStorage('userCarrito');
const userCarrito = convertirAObj(userCarritoJSON);

let userActivo

if (sesionActivaOBJ) userActivo = sesionActivaOBJ.username

if (userCarrito) {
    const usuarioCarritoActivo = userCarrito.find(user => user.username === userActivo)
    !usuarioCarritoActivo ? [] : usuarioCarritoActivo.carrito.forEach((e) => {
        productosCarrito.push(e);
    })
}

//VALIDACION DE LOGIN

const validacionLogin = () => {
    const user = convertirAObj(obtenerStorage('sesionActiva'));

    if (!user) {
        location.href = 'login.html'
    }
}

//PAYMENT 

const payment = () => {
    let subtotal = 0;
    let IVA = 1.5;
    let total = 0;

    for (const o of productosCarrito) {
        let precio = parseInt(o.precio)
        subtotal += precio
    }

    total = subtotal * IVA
    facturacion.push({
        productosCarritoLength: productosCarrito.length,
        subtotal: subtotal,
        iva: IVA,
        total: total
    })
}

//CONTENEDOR DIV
const divContenedor = () => {
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = `
                        <section>
                            <div id='mostrarProductos'>
                            </div>
                        </section>
                        <section class='section2'>
                            <div id='mostrarDatos'>

                            </div>
                        </section>
                        `
}

const manejoDeCards = () => {
    const divProductos = document.querySelector('#mostrarProductos');

    for (const o of productosCarrito) {
        divProductos.innerHTML += `
                                <div class='itemContenedor'>
                                <section>
                                    <p class='titulo'><strong>Nombre: </strong>${o.nombre}</p>
                                    <p><strong>Descripcion: </strong>${o.descripcion}</p>
                                    <p><strong>Categoria: </strong>${o.categoria}</p>
                                </section>
                                <section>
                                    <p><strong>Precio: </strong>$${o.precio}</p>
                                </section>
                                </div>
                                `
    }
}

const manejoDePayment = () => {
    const mostrarDatos = document.querySelector('#mostrarDatos');

    for (const p of facturacion) {
        mostrarDatos.innerHTML = `
                                 <section class='contenedorChild'>
                                    <div>
                                        <p class='pTotal'><strong>Total: </strong> $${p.total}</p>
                                    </div>
                                    <hr>
                                    <div class='infodetais'>
                                        <div>   
                                            <p><strong>Cantida de items totales: </strong> ${p.productosCarritoLength}</p>
                                        </div>
                                        <div>
                                            <p><strong>Subtotal: </strong> $${p.subtotal}</p>
                                        </div
                                        <div>
                                            <p><strong>IVA: </strong> ${p.iva}</p>
                                        </div>
                                    </div>
                                    <hr>
                                    <div>
                                        <p><strong>Total: </strong> $${p.total}</p>
                                    </div>
                                    <div class='divBoton'>
                                        <button id='pagar' class='boton'>Pagar</button>
                                    </div>
                                    <div class='divBoton'>
                                        <button id='volverAlCarrito' class='boton'>Volver al carrito</button>
                                    </div>
                                </section>
                                `
    }

    const pagarButton = document.querySelector('#pagar')

    pagarButton.addEventListener('click', () => {
        Swal.fire({
            title: "Pago realizado",
            icon: "success",
        });
    })

    const volverAlCarrito = document.querySelector('#volverAlCarrito')

    volverAlCarrito.addEventListener('click', () => {
        location.href = 'carrito.html'
    })

}

divContenedor()
validacionLogin()
manejoDeCards()
payment()
manejoDePayment();
