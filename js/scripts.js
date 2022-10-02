// lista de usuarios existentes para poder validar
//user 1
const nombreUser1 = "GABRIELA";
const emailUser1 = "gabriela@gmail.com";
const passUser1 = "g1234";
// user 2
const nombreUser2 = "PABLO";
const emailUser2 = "pablo@gmail.com";
const passUser2 = "p1234";

// listado de productos
const producto1 = new Productos ("TAZA CERAMICA", 800, true);
const producto2 = new Productos ("TAZA POLIMERO", 500, true);
const producto3 = new Productos ("REMERA", 1500, false);
const producto4 = new Productos ("IDENTIFICADOR PERRO", 200, true);
const producto5 = new Productos ("IDENTIFICADOR GATO", 200, true);
const producto6 = new Productos ("GORRA", 1000, true);

// usuario ingresa a la pagina y se le pregunta si desea registrarse para comprar

let ingreso = confirm("¿Desea registrarse ahora?");

// si acepta se le pide los datos sino sigue navegando sin registro hasta que quiera comprar
if (ingreso){
    ingresoDatos ();
};

// funcion para pedir datos al usuario
function ingresoDatos(){

    let nombre = prompt('Ingresá un nombre de usuario').toUpperCase();
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
                iniciarCompra ();
            };

        }else { // si la validacion no tuvo exito, vuelve a pedir datos
            ingresoDatos();
        };

    }else { // si están vacios se le informa al user que debe completar los datos
        alert("Por favor, completá todos los datos"); 
        let respuesta = confirm("¿Desea registrarse ahora?"); // se le vuelve a preguntar si se quiere registar 
        // si acepta vuelve a pedir datos
        if (respuesta) {
            ingresoDatos(); 
        };
    };
};

// funcion para validar datos
function validarDatos(nombre,email){

    // se verifica si el nombre coincide con alguno ya registrado
    if ((nombre === nombreUser1) || (nombre === nombreUser2)){
        alert("El nombre de usuario ya existe");
        return false
    };
    // se verifica si el email coincide con alguno ya registrado
    if ((email === emailUser1) || (email === emailUser2)){
        alert("El email ya se encuentra registrado");
        return false
    };

    return true 
};

function iniciarCompra() {
    let lista = "";
    let finalizarCompra = false;
   
    while (!finalizarCompra){
        let productoIngresado = prompt('Ingrese el nombre del producto en MAYÚSCULAS');

        // si el producto ingresado es una taza se le pide al usuario el tipo
        if (productoIngresado === "TAZA") {
            let tazaTipo = confirm("¿Quiere una taza de ceramica?");
            if (tazaTipo) {
                productoIngresado += " " + "CERAMICA";
            }else {
                productoIngresado += " " + "POLIMERO";
            }
        };

        // si el producto ingresado es un identificador se le pide al usuario el tipo
        if (productoIngresado === "IDENTIFICADOR") {
            let identificadorTipo = confirm("¿Quiere un identificador para perro?");
            if (identificadorTipo) {
                productoIngresado += " " + "PERRO";
            }else {
                productoIngresado += " " + "GATO";
            }
        };

        let product = obtenerProducto(productoIngresado);

        if (product){
            alert("Producto agregado con exito: " + product);
            lista += "\n" + product;
            let seguirComprando = confirm("Desea seguir comprando?");
            if (!seguirComprando) {
                finalizarCompra = true ;
            };

        }else {
            if (productoIngresado === null){
                if (lista === ""){
                  finalizarCompra = true;  
                }else {
                    let cancelarCompra= confirm("Desea cancelar la compra?");
                    if (cancelarCompra) {
                        lista = "";
                        finalizarCompra = true ;
                    }else {
                        finalizarCompra = true ;
                    }
                };
                
            }else {
              alert("Porducto sin stock o ingrese un producto válido y en MAYÚSCULAS");  
            };
        };   
    };

    if (lista != ""){
        let confirmarCompra = confirm("Desea concretar la compra de: " + "\n" + lista);
        if (confirmarCompra){
            alert("Gracias por comprar en nuestra tienda online");
        };
    };

};

function obtenerProducto(productoIngresado){
    let product;
    // verificar si el producto tiene stock
    let hayStock = verificarStock(productoIngresado);
    if(!hayStock){
        product = false;
        return product;     
    };

    let color;
    let tematica;
    let nombrePersonalizado;
    let identificadorTelefono;
    let cantidad = 0 ;

    switch(productoIngresado){
        case "TAZA CERAMICA" : 
            color = prompt("Ingresá el color de tu preferencia");
            tematica = prompt("Ingresá la temática");
            nombrePersonalizado = prompt("Ingresá el nombre para personalizar si lo desea");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto1.tipo + "\n" + "Color: " + color + "\n" + "Tema: " + tematica + "\n" + "Nombre: " + nombrePersonalizado + "\n" + "Unidades: " + cantidad + "\n" + "Precio: " + (producto1.precio*cantidad);
            break;
        case "TAZA POLIMERO" : 
            color = prompt("Ingresá el color de tu preferencia");
            tematica = prompt("Ingresá la temática");
            nombrePersonalizado = prompt("Ingresá el nombre para personalizar si lo desea");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto2.tipo + "\n" + "Color: " + color + "\n" + "Tema: " + tematica + "\n" + "Nombre: " + nombrePersonalizado + "\n" + "Unidades: " + cantidad + "\n" + "Precio: " +  (producto2.precio*cantidad);
            break;
        case "REMERA" : 
            color = prompt("Ingresá el color de tu preferencia");
            tematica = prompt("Ingresá la temática");
            let remeraTalle = prompt("Ingresá el talle");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto3.tipo + "\n" + "Color: " + color + "\n" + "Tema: " + tematica + "\n" + "Talle: " + remeraTalle + "\n"+ "Unidades: " + cantidad + "\n" + "Precio: " + (producto3.precio*cantidad);
            break;
        case "IDENTIFICADOR PERRO": 
            color = prompt("Ingresá el color de tu preferencia");
            nombrePersonalizado = prompt("Ingresá el nombre del perro");
            identificadorTelefono = prompt("Ingresá el teléfono que querés que aparezca en el identificador");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto4.tipo + "\n" + "Color: " + color + "\n" + "Nombre del perro: " + nombrePersonalizado + "\n"  + "Teléfono: " + identificadorTelefono + "\n" + "Unidades: " + cantidad + "\n" + "Precio: " + (producto4.precio*cantidad);
            break;
        case "IDENTIFICADOR GATO": 
            color = prompt("Ingresá el color de tu preferencia");
            nombrePersonalizado = prompt("Ingresá el nombre del gato");
            identificadorTelefono = prompt("Ingresá el teléfono que querés que aparezca en el identificador");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto5.tipo + "\n" + "Color: " + color + "\n" + "Nombre del perro: " + nombrePersonalizado + "\n" + "Teléfono: " + identificadorTelefono + "\n" + "Unidades: " + cantidad + "\n" + "Precio: " + (producto5.precio*cantidad);
            break;
        case "GORRA": 
            color = prompt("Ingresá el color de tu preferencia");
            tematica = prompt("Ingresá la temática");
            nombrePersonalizado = prompt("Ingresá el nombre para personalizar si lo desea");
            cantidad = parseInt(prompt("Ingresá la cantidad deseada"));
            product = producto6.tipo + "\n" + "Color: " + color + "\n" + "Tema: " + tematica + "\n" + "Nombre: " + nombrePersonalizado + "\n" + "Unidades: " + cantidad + "\n" + "Precio: " + (producto6.precio*cantidad);
            break;

        default:
            product = false;           
    }
   return product; 
};

function verificarStock (productoIngresado){
    let hayStock;
    switch(productoIngresado) {
        case "TAZA CERAMICA":
            hayStock = producto1.stock;
            break;
        case "TAZA POLIMERO":
            hayStock = producto2.stock;
            break;
        case "REMERA":
            hayStock = producto3.stock;
            break;
        case "IDENTIFICADOR PERRO":
            hayStock = producto4.stock;
            break;
        case "IDENTIFICADOR GATO":
            hayStock = producto5.stock;
            break;
        case "GORRA":
            hayStock = producto6.stock;
            break;
        default:
            hayStock = false;
    }
    return hayStock;

}