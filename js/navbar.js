//LOCAL STORAGE

let objetoSesion = '';
let usernameActivo = '';

(localStorage.getItem('sesionActiva')) ? objetoSesion = JSON.parse(localStorage.getItem('sesionActiva')) : objetoSesion = ''

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
        const body = document.querySelector('#sctNav');

        //CREACION DE NAV
        const nav = document.createElement('nav');
        nav.className = 'mask';

        body.appendChild(nav);

        const aLogo = document.createElement('a');
        aLogo.setAttribute('href', 'index.html');
        aLogo.innerHTML = 'Home';
        nav.appendChild(aLogo);

        //CREACION DE UL Y LI
        const ul = document.createElement('ul');
        ul.className = 'list';
        nav.appendChild(ul)

        for (const s of secciones) {
            if (s.nombre === 'Login') {
                ul.innerHTML += `
                        <li><a href=# id='login'>${s.nombre}</a></li>
                        `
            } else if (s.nombre === 'Recetas') {
                ul.innerHTML += `
                <li><a href=# id='recetas'>${s.nombre}</a></li>
                `
            } else if (s.nombre === 'Carrito') {
                ul.innerHTML += `
                <li><a href=# id='carrito'>${s.nombre}</a></li>
                `
            } else if (s.nombre === 'Registro') {
                ul.innerHTML += `
                <li><a href=${s.direccion} id='registro'>${s.nombre}</a></li>
                `
            } else if (s.id === 'nombre' && objetoSesion) {
                ul.innerHTML += `
                <li><a>${s.nombre}</a></li>
                `
            }
            else {
                ul.innerHTML += `
            <li><a href='${s.direccion}'>${s.nombre}</a></li>
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
                    location.reload();
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

incializador()

