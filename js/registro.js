
//LOCAL STORAGE

const obtenerStorage = (clave) => {
    return localStorage.getItem(clave);
}

const convertirJSON = (objeto) => {
    return JSON.stringify(objeto);
}

const guardarEnLocal = (clave, objeto) => {
    const objJSON = convertirJSON(objeto)
    localStorage.setItem(clave, objJSON)
}

//GLOBAL
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];


const inicializarContenedor = () => {
    const body = document.querySelector('#body');
    const contenedor = document.querySelector('#contenedor');

    contenedor.innerHTML = `
                            <form class="form formulario">
                                <p class="form-title">Registrate!</p>
                                <p class='descripcion'> Registrate para saber mas sobre la aplicacion!</p>
                                <div class='inputsContenedor'>
                                    <div class="input-container">
                                        <input id='username' type="text" placeholder="Username" required>
                                    </div>
                                    <div class="input-container">
                                        <input id='password' type="password" placeholder="Password" required>
                                    </div>
                                    <div class="input-container">
                                        <input id='email' type="email" placeholder="Email" required>
                                    </div>
                                </div>
                                    <div class='divBoton'>
                                        <button type='submit' id='registrarse' class="button">
                                            <span id='registrarse' class="button-content">Registrarse </span>
                                        </button>
                                    </div
                            </form>
                            `;

    body.appendChild(contenedor);

    const registrarseBoton = document.querySelector('#registrarse');

    registrarseBoton.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        const email = document.querySelector('#email').value;

        const usuarioRegistrado = usuarios.find(e => e.email === email)

        if (!username || !password || !email) {
            Swal.fire("Los campos username, password y email deben estar completos");
        } else {
            if (usuarioRegistrado) {
                Swal.fire("El usuario con ese email ya esta registrado");
            } else {
                usuarios.push({
                    username: username,
                    email: email,
                    password: password
                })

                guardarEnLocal('usuarios', usuarios)

                Swal.fire({
                    showDenyButton: true,
                    title: "Usuario registrado",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ir a login",
                    denyButtonText: `Registrar otro usuario`
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href = 'login.html'
                    } else if (result.isDenied) {
                        location.reload()
                    }
                });
            }
        }
    })

}

inicializarContenedor()