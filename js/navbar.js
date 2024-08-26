
const secciones = [
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
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('#sctNav');

    //CREACION DE NAV
    const nav = document.createElement('nav');
    nav.className = 'mask';

    body.appendChild(nav);

    //CREACION DE A

    const aLogo = document.createElement('a');
    aLogo.setAttribute('href', 'index.html');
    aLogo.innerHTML = 'Home';
    nav.appendChild(aLogo);

    //CREACION DE UL Y LI
    const ul = document.createElement('ul');
    ul.className = 'list';
    nav.appendChild(ul)

    for (const s of secciones) {
        ul.innerHTML += `
                        <li><a href='${s.direccion}'>${s.nombre}</a></li>
                        `
    }

    const boton = document.createElement('button');
    boton.className = 'menu';
    boton.innerHTML = 'Menu';

    nav.appendChild(boton)

});

