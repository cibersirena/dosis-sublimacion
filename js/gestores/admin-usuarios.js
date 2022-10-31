class AdminUsuarios {
    userCargados(){
        usuarios = [
            {
                "name": "GABRIELA",
                "mail": "gabriela@gmail.com",
                "pass": "g1234"
            },
            {
                "name": "PABLO",
                "mail": "pablo@gmail.com",
                "pass": "p1234"
            },
            {
                "name": "GUSTAVO",
                "mail": "gus@gmail.com",
                "pass": "gus1234"
            }
        ];
    };

    userRegistroNuevo() {
        // creo el formulario dentro del modal, eliminando todo lo que haya previamente
        modalContent.innerHTML = '';
        let form = document.createElement('div');
        form.classList.add("modal-body");
        form.innerHTML = `  <div class="modal-header">
                                <h5 class="modal-title">Formulario de registro</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <p id="mensaje"></p>
                            <form id="modal-form">
                                <div class="mb-3">
                                    <label for="nombre" class="col-form-label">Ingresá tu nombre</label>
                                    <input type="text" class="form-control" id="nombre">
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="col-form-label">Ingresá tu e-mail</label>
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="col-form-label">Ingresá tu contraseña</label>
                                    <input type="password" class="form-control" id="password">
                                </div>
                            </form>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                <button type="button" class="btn" id="aceptar" onclick="javascript:validarUser()">Aceptar</button>
                            </div>`;

        modalContent.appendChild(form);
    };

    validarDatos(validarNombre,validarEmail,validarPassword){
        this.userCargados();
        let validacion = true
        
        // chequeo que no haya un usuario ya registrado
        let nombreEncontrado = usuarios.find((a)=> a.name === validarNombre.toUpperCase());
        if (nombreEncontrado){
            mensaje.textContent = "El nombre de usuario ya existe";
            return validacion = false;
        };
        
        // chequeo que no haya un email ya registrado
        let emailEncontrado = usuarios.find((b)=> b.mail === validarEmail);
        if (emailEncontrado){
            mensaje.textContent = "El email ya se encuentra registrado";
            return validacion = false;
        // chequeo que el email sea valido
        }else {
            let validandoEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (!validandoEmail.test(validarEmail)){
                mensaje.textContent = "El email ingresado es inválido";
                return validacion = false;
            }
        };
        
        // si la validación fue correcta
        if(validacion){
            // agrego el objeto usuario al array de usuarios
            usuarios.unshift(new Usuario (validarNombre.toUpperCase(),validarEmail,validarPassword));
            // doy la bienvenida
            this.mostrarBienvenida();
            // guardo en local storage
            this.guardarUser();
            // muestro por consola como me quedo el array
            console.log(usuarios);
        }
    };

    // Guardar en Storage
    guardarUser() { 
        localStorage.setItem('user', JSON.stringify(usuarios[0]));       
    };

    // funcion de bienvenida
    mostrarBienvenida() {
        //Bienvenida en el modal
        modalContent.innerHTML = '';
        let bienvenida = document.createElement('div');
        bienvenida.classList.add("modal-body");
        bienvenida.innerHTML = ` <div class="modal-header">
                                    <h5 class="modal-title">Bienvenid@ <br> ${usuarios[0].name} :)</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                               </div>`;
  
        modalContent.appendChild(bienvenida);
        // cambio del nombre en el boton registro
        registro.textContent = usuarios[0].name; 
        registro.removeAttribute("data-bs-toggle");
        registro.removeAttribute("data-bs-target");
    };

}