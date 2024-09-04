//ELEMENTOS GLOBALES 
let recetas = [];

//AGREGAR CATEGORIAS LAYOUTS

const agregarCategorias = () => {
    const categorias = ['Todas', 'Desayuno', 'Almuerzo', 'Merienda', 'Cena', 'Postre'];
    let opciones = '';

    for (const c of categorias) {
        c === 'Todas' ? opciones += `<option disabled value='${c}'>${c}</option>` : opciones += `<option value='${c}'>${c}</option>`
    }

    return opciones;
}

const inicializarContenedor = () => {
    const body = document.querySelector('#body');
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = `
                            <form class="form formulario">
                                <p class="form-title">Agrega tu receta!</p>
                                <div class="input-container">
                                    <input id='nombreReceta' type="text" placeholder="Nombre de receta">
                                </div>
                                <div class="input-container">
                                    <input id='ingredientesReceta' type="text" placeholder="Ingredientes">
                                </div>
                                <div class="input-container">
                                    <input id='preparacionReceta' type="text" placeholder="Preparacion">
                                </div>
                                <div class="input-container">
                                    <label>Categoria</label>
                                    <select id='categorias'>
                                        ${agregarCategorias()}
                                    </select>
                                </div>
                                <div class='divBoton'>
                                    <button class="button">
                                        <span id='agregarReceta' class="button-content">Guardar </span>
                                    </button>
                                </div
                            </form>
                            `;

    body.appendChild(contenedor);

    const agregarRecetaButton = document.querySelector('#agregarReceta');

    agregarRecetaButton.addEventListener('click', (e) => {
        e.preventDefault();
        const nombre = document.querySelector('#nombreReceta').value;
        const ingredientes = document.querySelector('#ingredientesReceta').value;
        const preparacion = document.querySelector('#preparacionReceta').value;
        const categoria = document.querySelector('#categorias').value;

        if (nombre.length == 0 || ingredientes.length == 0 | preparacion.length == 0) {
            Swal.fire("Debe ingresar nombre, ingredientes y preparacion.");
        } else {
            manejoStorage(nombre, preparacion, ingredientes, categoria);

            Swal.fire({
                title: "Receta agregada!",
                text: "Quieres agregar otra receta?",
                showDenyButton: true,
                confirmButtonText: "Agregar receta",
                denyButtonText: `No agregar receta`,
                customClass: {
                    confirmButton: 'swal2-confirm',
                    cancelButton: 'swal2-cancel',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                } else if (result.isDenied) {
                    location.href = "recetas.html";
                }
            });
        }
    })
}

const manejoStorage = (nombre, preparacion, ingredientes, categoria) => {
    if (localStorage.getItem('recetas')) {
        const objJson = obtenerDelStorage('recetas');
        const objParse = convertirAObj(objJson);

        Array.isArray(objParse) ? recetas = objParse : recetas = []
    }

    recetas.push({ nombre: nombre, ingredientes: ingredientes, preparacion: preparacion, categoria: categoria });

    guardarEnStorage('recetas', recetas);
}

const guardarEnStorage = (nombreClave, recetas) => {
    const recetasJSON = convertirAJSON(recetas);
    agregarAStorage(nombreClave, recetasJSON);
}

const convertirAJSON = (elemento) => {
    return JSON.stringify(elemento);
}

const convertirAObj = (elemento) => {
    return JSON.parse(elemento);
}

const agregarAStorage = (nombre, valor) => {
    localStorage.setItem(nombre, valor);
}

const obtenerDelStorage = (clave) => {
    const objJson = localStorage.getItem(clave);
    if (objJson != null) return objJson
}

inicializarContenedor();



