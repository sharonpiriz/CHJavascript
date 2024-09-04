
const inicializarContenedor = () => {
    const body = document.querySelector('#body');
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = `
                            <form class="form formulario">
                                <p class="form-title">Iniciar sesion</p>
                                <p class='descripcion'> Inicia sesion para poder realizar todas las funcionalidades!</p>
                                <div class='inputsContenedor'>
                                    <div class="input-container">
                                        <input id='username' type="text" placeholder="Username" required>
                                    </div>
                                    <div class="input-container">
                                        <input id='password' type="password" placeholder="Password" required>
                                    </div>
                                </div>
                                    <div class='divBoton'>
                                        <button id ='iniciarSesion' class="button">
                                            <span id='iniciarSesion' class="button-content">Iniciar sesion </span>
                                        </button>
                                    </div
                            </form>
                            `;

    body.appendChild(contenedor);

    const iniciarSesionBoton = document.querySelector('#iniciarSesion');
    iniciarSesionBoton.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.querySelector('#username').value
        const password = document.querySelector('#password').value

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
        const usuarioValido = usuarios.find(e => e.username === username && e.password === password)

        localStorage.setItem('sesionActiva', JSON.stringify(usuarioValido))

        if (!usuarioValido) {
            Swal.fire("El username o password es incorrecto");
        }
        else {
            Swal.fire({
                title: `Bienvenido ${usuarioValido.username}`,
                text: 'Serás redirigido a la página de recetas.',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.href = 'recetas.html';
                }
            });
        }
    })
}

inicializarContenedor();

