const body = document.querySelector('#body')
const main = document.querySelector('#main');
body.classList.add('bg-slate-50');

//NavBar

const nav = document.createElement('nav');
nav.style.height = '96px';
nav.style.width = '100%';
nav.style.backgroundColor = '#E9E4E4';

const menuSecciones = [
    { nombre: 'Home', Url: 'index.html' },
    { nombre: 'Recetas', Url: 'recetas.html' },
    { nombre: 'Mis recetas', Url: 'misrecetas.html' },
    { nombre: 'Shopping', Url: 'shopping.html' },
    { nombre: 'Carrito', Url: 'carrito.html' },
    { nombre: 'Contacto', Url: 'contacto.html' }
]

const ul = document.createElement('ul');
ul.classList.add('ulSecciones');
ul.style.display = 'flex';
ul.style.justifyContent = 'center';
ul.style.listStyleType = 'none';
ul.style.gap = '5%'
ul.style.fontSize = '25px'

nav.appendChild(ul);

for (const menu of menuSecciones) {
    let li = document.createElement('li');
    li.innerHTML = `<a href=${menu.Url}>${menu.nombre}</a>`;
    ul.appendChild(li);
}

main.appendChild(nav);




