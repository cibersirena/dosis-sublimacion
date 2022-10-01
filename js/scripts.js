// lista de usuarios existentes para poder validar
//user 1
const nombreUser1 = "GABRIELA";
const emailUser1 = "gabriela@gmail.com";
const passUser1 = "g1234";
// user 2
const nombreUser2 = "PABLO";
const emailUser2 = "pablo@gmail.com";
const passUser2 = "p1234";


// usuario ingresa a la pagina y se le pregunta si desea registrarse para comprar

let ingreso = confirm("¿Desea registrarse ahora?");

// si acepta se le pide los datos sino sigue navegando sin registro hasta que quiera comprar
if (ingreso){
    ingresoDatos ();
};

// funcion para pedir datos al usuario
function ingresoDatos(){

    let nombre = prompt("Ingresá un nombre de usuario").toUpperCase();
    let email = prompt("Ingresá un email");
    let pass = prompt("Ingresá una contraseña");

    // se veridica que los campos ingresados no estén vacios
    if (nombre && email && pass){

        // si no están vacios se validan datos
        let validacion = validarDatos(nombre, email);

        // si la validacion fue exitosa (true) se crea el usuario y se le da la bienvenida
        if (validacion) {
            const userNuevo = new Usuario (nombre,email,pass);
            userNuevo.mostrarBienvenida();

            // una vez registrado se pregunta al usuario si desea realizar una compra ahora 
            // sino sigue navegando hasta que quiera comprar
            let comprar = confirm("¿Deseas comprar ahora?");
            if (comprar) {
                IniciarCompra ();
            }

        }else { // si la validacion no tuvo exito, vuelve a pedir datos
            ingresoDatos();
        }

    }else { // si están vacios se le informa al user que debe completar los datos
        alert("Por favor, completá todos los datos"); 
        let respuesta = confirm("¿Desea registrarse ahora?"); // se le vuelve a preguntar si se quiere registar 
        // si acepta vuelve a pedir datos
        if (respuesta) {
            ingresoDatos(); 
        }
    }
};

// funcion para validar datos
function validarDatos(nombre,email){

    // se verifica si el nombre coincide con alguno ya registrado
    if ((nombre === nombreUser1) || (nombre === nombreUser2)){
        alert("El nombre de usuario ya existe");
        return false
    }
    // se verifica si el email coincide con alguno ya registrado
    if ((email === emailUser1) || (email === emailUser2)){
        alert("El email ya se encuentra registrado");
        return false
    }

    return true 
};

// funcion para iniciar la compra
function IniciarCompra () {



}

