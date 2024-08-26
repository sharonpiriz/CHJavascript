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
    { nombre: 'Carrito', Url: 'carrito.html' }
]

for (const menu of menuSecciones) {
    nav.innerHTML += `<a href=${menu.Url}>${menu.nombre}</a>`;
}

container.appendChild(nav);




