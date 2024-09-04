const body = document.querySelector('#body');
const container = document.querySelector('.container');

//NavBar
const logo = document.createElement('div');
logo.className = 'logo';

container.appendChild(logo);
const divLogo = document.querySelector('.logo')
const imgLogo = document.createElement('img')
divLogo.appendChild(imgLogo);
imgLogo.setAttribute('src', 'imagenes/logoRecetas.png')

const nav = document.createElement('nav');
nav.className = 'menu'

const menuSecciones = [
    { nombre: 'Recetas', Url: 'recetas.html' },
    { nombre: 'Tienda', Url: 'tienda.html' },
    { nombre: 'Carrito', Url: 'carrito.html' },
    { nombre: 'Login', Url: 'login.html' },
    { nombre: 'Registro', Url: 'registro.html' }
]

for (const menu of menuSecciones) {

    if (menu.nombre === 'Login') {
        nav.innerHTML += `<a href='#' id='login'>${menu.nombre}</a>`;
    } else if (menu.nombre === 'Registro') {
        nav.innerHTML += `<a href=${menu.Url} id='registro'>${menu.nombre}</a>`;
    }
    else {
        nav.innerHTML += `<a href=${menu.Url}>${menu.nombre}</a>`;
    }
}
container.appendChild(nav);

//LOCAL STORAGE
const obtenerStorage = (clave) => {
    return localStorage.getItem(clave);
}

const convertirAJSON = (objeto) => {
    return JSON.stringify(objeto);
}

const removerDeStorage = (clave) => {
    localStorage.removeItem(clave);
}

//LOGIN
const Login = () => {

    const idLogin = document.querySelector('#login');
    const idRegistro = document.querySelector('#registro');

    if (obtenerStorage('sesionActiva')) {
        idLogin.textContent = 'Logout';
        idRegistro.style.display = 'none';
    }

    idLogin.addEventListener('click', () => {
        if (obtenerStorage('sesionActiva')) {
            Swal.fire({
                title: "Estas seguro?",
                text: "Se cerrara la sesion",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, cerrar sesion"
            }).then((result) => {
                if (result.isConfirmed) {
                    removerDeStorage('sesionActiva')
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

Login()



