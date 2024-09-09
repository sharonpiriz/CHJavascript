//LOCAL STORAGE

let objetoSesion = '';
let usernameActivo = '';

(!localStorage.getItem('sesionActiva')) ? objetoSesion = '' : objetoSesion = JSON.parse(localStorage.getItem('sesionActiva'))

if (objetoSesion) usernameActivo = objetoSesion.username

const secciones = [
    {
        id: 'nombre',
        nombre: `Bienvenido ${usernameActivo}`,
    },
    {
        nombre: 'Recetas',
        direccion: 'recetas.html'
    },
    {
        nombre: 'Tienda',
        direccion: 'tienda.html'
    },
    {
        nombre: 'Carrito',
        direccion: 'carrito.html'
    },
    {
        nombre: 'Login',
        direccion: ''
    },
    {
        nombre: 'Registro',
        direccion: 'registro.html'
    }
]

const incializador = () => {

    document.addEventListener('DOMContentLoaded', () => {
        const contenedor = document.querySelector('#container');

        //CREACION DE NAV
        const nav = document.createElement('nav');
        nav.className = 'navbar';

        contenedor.appendChild(nav);

        const aLogo = document.createElement('a');
        aLogo.setAttribute('href', 'index.html');
        aLogo.className = 'brand';
        aLogo.innerHTML = 'Home';
        nav.appendChild(aLogo);

        //CREACION DE BURGUER

        const divBurguer = document.createElement('div');
        divBurguer.className = 'burger';
        divBurguer.id = 'burger';
        divBurguer.innerHTML = `
                                <span class="burger-line"></span>
                                <span class="burger-line"></span>
                                <span class="burger-line"></span>
                                `
        nav.appendChild(divBurguer);

        const span = document.createElement('span');
        span.className = "overlay";
        nav.appendChild(span);


        //CREACION DE UL Y LI
        const divMenu = document.createElement('div');
        divMenu.className = 'menu';
        divMenu.id = "menu";
        nav.appendChild(divMenu);

        const ul = document.createElement('ul');
        ul.className = 'menu-inner';
        divMenu.appendChild(ul)

        for (const s of secciones) {
            if (s.nombre === 'Login') {
                ul.innerHTML += `
                        <li class='menu-item'><a href=# class='menu-link' id='login'>${s.nombre}</a></li>
                        `
            } else if (s.nombre === 'Recetas') {
                ul.innerHTML += `
                <li class='menu-item'><a href=# class='menu-link' id='recetas'>${s.nombre}</a></li>
                `
            } else if (s.nombre === 'Carrito') {
                ul.innerHTML += `
                <li class='menu-item'><a href=# class='menu-link' id='carrito'>${s.nombre}</a></li>
                `
            } else if (s.nombre === 'Registro') {
                ul.innerHTML += `
                <li class='menu-item'><a href=${s.direccion} class='menu-link' id='registro'>${s.nombre}</a></li>
                `
            } else if (s.id === 'nombre') {
                if (objetoSesion) {
                    ul.innerHTML += `
                    <li class='menu-item'><a class='menu-link' >${s.nombre}</a></li>
                    `
                } else {
                    ul.innerHTML += `
                    <li class='menu-item'><a class='menu-link' >Bienvenido</a></li>
                    `
                }
            } else {
                ul.innerHTML += `
            <li class='menu-item'><a href='${s.direccion}' class='menu-link'>${s.nombre}</a></li>
            `
            }
        }

        const boton = document.createElement('button');
        boton.className = 'menu';
        boton.innerHTML = 'Menu';

        nav.appendChild(boton)

        login();
        manejoPantallas();
    });
}

const login = () => {
    const idLogin = document.querySelector('#login');

    if (localStorage.getItem('sesionActiva')) {
        idLogin.textContent = 'Logout';
    }

    idLogin.addEventListener('click', () => {
        if (localStorage.getItem('sesionActiva')) {
            Swal.fire({
                title: "Estas seguro?",
                text: "Se cerrara la sesion",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, cerrar sesion"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('sesionActiva');
                    idLogin.textContent = 'Login';
                    location.href = 'login.html'
                }
            });
        }
        else {
            location.href = 'login.html'
        }
    })
}

const manejoPantallas = () => {
    const recetas = document.querySelector('#recetas');
    const carrito = document.querySelector('#carrito');
    const registro = document.querySelector('#registro')

    recetas.addEventListener('click', () => {
        if (!localStorage.getItem('sesionActiva')) {
            Swal.fire("Inicia sesion para ver esta seccion");
        } else {
            location.href = 'recetas.html'
        }
    })

    carrito.addEventListener('click', () => {
        if (!localStorage.getItem('sesionActiva')) {
            Swal.fire("Inicia sesion para ver esta seccion");
        } else {
            location.href = 'carrito.html'
        }
    })

    if (localStorage.getItem('sesionActiva')) registro.style.display = 'none';
}

//Menu burguer
const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const bgOverlay = document.querySelector(".overlay");

if (burgerMenu && navbarMenu && bgOverlay) {
    burgerMenu.addEventListener("click", () => {
        navbarMenu.classList.toggle("is-active");
        bgOverlay.classList.toggle("is-active");
    });

    bgOverlay.addEventListener("click", () => {
        navbarMenu.classList.toggle("is-active");
        bgOverlay.classList.toggle("is-active");
    });
}

document.querySelectorAll(".menu-link").forEach((link) => {
    link.addEventListener("click", () => {
        navbarMenu.classList.remove("is-active");
        bgOverlay.classList.remove("is-active");
    });
});

incializador()


