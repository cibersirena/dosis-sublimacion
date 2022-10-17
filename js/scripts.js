//Array de usuarios
const usuarios = new Array ();
usuarios.push(new Usuario ("GABRIELA","gabriela@gmail.com","g1234"));
usuarios.push(new Usuario ("PABLO","pablo@gmail.com","p1234"));

// Array de productos a la venta
const listaProducto = new Array ();
listaProducto.push(new Productos ("TAZA CERAMICA", 800, true));
listaProducto.push(new Productos ("TAZA POLIMERO", 500, true));
listaProducto.push(new Productos ("REMERA", 1500, false));
listaProducto.push(new Productos ("IDENTIFICADOR PERRO", 200, true));
listaProducto.push(new Productos ("IDENTIFICADOR GATO", 200, true))
listaProducto.push(new Productos ("GORRA", 1000, false));
listaProducto.push(new Productos ("KIT INFANTIL", 1800, true));
listaProducto.sort((a, b) => a.tipo.localeCompare(b.tipo));

//muestro por consola el listado de productos ordenados
console.log(listaProducto);

// Array vacio para el listado de compra del usuario
let lista = new Array ();

// usuario ingresa a la pagina y se le pregunta si desea registrarse para comprar
let ingreso = confirm("¿Desea registrarse ahora?");

// si acepta se le pide los datos sino sigue navegando sin registro hasta que quiera comprar
if (ingreso){
    ingresoDatos ();
};

// una vez registrado se pregunta al usuario si desea realizar una compra ahora 
// sino sigue navegando hasta que quiera comprar
let comprar = confirm("¿Deseas comprar ahora?");

if (comprar) {
    iniciarCompra ();

    if (lista.length > 0){
        // muestra el carrito
        let productosComprados = "";
        for (let i = 0 ;  i < lista.length ; i++){
            productosComprados += lista[i].descripcionProducto() + "\n";
        };
        // se le pregunta al usuario si confirma la compra
        alert(productosComprados);
        let confirmaCompra = confirm("Confirmas la compra de estos productos");
        if (confirmaCompra){
            terminarCompra();
        }else {
            // si cancela la compra se vacia el carrito
            vaciarLista(); 
            alert("Gracias por tu visita");
        };

    }else{
        alert("Gracias por tu visita");
    };
};


// FUNCIONES

// funcion para pedir datos al usuario
function ingresoDatos(){
    let datos = true;

    while (datos){
        let mensaje = "";
        let nombre = prompt('Ingresá un nombre de usuario');
        let email = prompt("Ingresá un email");
        let pass = prompt("Ingresá una contraseña");

        // chequeo que nombre no esté vacio
        if (!nombre){
            mensaje += "Debes ingresar un nombre de usuario" + "\n";
        };

        // chequeo que email no esté vacio
        if(!email){
            mensaje += "Debes ingresar un email" + "\n";
        };

        // chequeo que la contraseña no esté vacio
        if(!pass){
            mensaje += "Debes ingresar una contraseña" + "\n";
        };

        // si la variable mensaje tiene algo es porque alguno de los promps no fue ingresado.
        // se muestra el mensaje y confirma si quiere registrarse. Acepta vuelve a iniciar el ciclo
        // si cancela devuelve false y corta el ciclo 
        if(mensaje != ""){
            alert(mensaje);
            datos = confirm("¿Deseas registrarte ahora?");
        }else {
            // si no están vacios se validan datos
            let validacion = validarDatos(nombre, email); 

            // si la validacion fue exitosa (true) se crea el usuario y se le da la bienvenida
            if (validacion) {
                usuarios.unshift(new Usuario (nombre.toUpperCase(),email,pass));
                usuarios[0].mostrarBienvenida();
                // muestro por consola como quedo el array
                console.log(usuarios);
                datos = false;
                
            }else {
                // si la validacion no tuvo exito se pregunta si quiere volver a completar los datos
                // si acepta el ciclo comienza de nuevo sino se corta el ciclo.
                datos = confirm("¿Desas volver a completar los datos?");
            };
        };
    };
 };
    
// funcion para validar datos
function validarDatos(nombre,email){

    let nombreEncontrado = usuarios.find((a)=> a.name === nombre.toUpperCase());
    if (nombreEncontrado){
        alert("El nombre de usuario ya existe");
        return false;
    };

    let emailEncontrado = usuarios.find((b)=> b.mail === email);
    if (emailEncontrado){
        alert("El email ya se encuentra registrado");
        return false;
    }else {
        let validarEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if (!validarEmail.test(email)){
            alert("el email ingresado es inválido");
		    return false;
        }
    };

    return true
};


// funcion para iniciar compra
function iniciarCompra() {

    let finalizarCompra = false;

    while (!finalizarCompra){
        // muestro el listado de productos para que el usuario elija una opcion
        let listadoProductos = "Ingresá el código del producto a comprar:" + "\n";
        let mensaje = "";
        listaProducto.forEach((p,index) => {
        mensaje += (index + 1) + " " + p.tipo + "\n"
        });
        let respuesta = prompt(listadoProductos + mensaje);

        // se verifica que la opcion ingresada sea correcta
        let opcionCorrecta = verificarOpcion(respuesta);

        if (!opcionCorrecta){
            let respuestaDos = confirm("¿Queres volver a intentarlo?");
            if (respuestaDos){
                iniciarCompra();
            }else {
                finalizarCompra = true;
            };
        }else {
             //si ingreso una opcion correcta, se busca si el producto tiene stock
            let hayStock = listaProducto[(parseInt(respuesta)-1)].stockeado();
            
            if(hayStock){
                
                let productoComprado = pedirDetalles(respuesta);
                
                lista.unshift(productoComprado);

                // muestro al usuario el producto comprado / agregado
                alert(lista[0].descripcionProducto());

                // muestro el array lista por consola para verificar si ingreso el producto
                console.log(lista)
                let respuestaCuatro = confirm("¿Queres seguir comprando?");
                if (!respuestaCuatro){
                    finalizarCompra = true;
                };

            }else {
                alert("el producto elegido se encuentra sin stock");
                let respuestaTres = confirm("¿Queres elegir otro producto?");
                if (!respuestaTres){
                    finalizarCompra = true;
                };
            };
        };  
    };
};

// funcion para verificar la opcion de compra elegida
function verificarOpcion(respuesta) {

    if (respuesta === null) {
        return false;
    }

    if (parseInt(respuesta) > listaProducto.length) {
        alert("el código ingresado es incorrecto");
        return false;
    };
    return true;
};

// funcion para pedir los detalles de los productos segun el codigo ingresado
function pedirDetalles(respuesta) {
    let detalles;
    let color;
    let tematica;
    let nombrePersonalizado;
    let identificadorTelefono;
    let talle;
    let cantidad = 0;

    switch(respuesta) {
        case "1":
            detalles = detallesProductos(respuesta);
            return detalles
            break;

        case "2" :
            detalles = detallesIdentificadores(respuesta);
            return detalles
            break;
        
        case "3" :
            detalles = detallesIdentificadores(respuesta);
            return detalles
            break;

        case "4" :
            detalles = detallesProductos(respuesta);
            return detalles
            break;

        case "5" :
            detalles = detallesRemeras(respuesta);
            return detalles
            break;

        case "6" :
            detalles = detallesProductos(respuesta);
            return detalles
            break;

        case "7" :
            detalles = detallesProductos(respuesta);
            return detalles
            break;

        default:
            return detalles
    };
};

// funcion para solicitar detalles de los identificadores
function detallesIdentificadores(respuesta) {
    let datosIdentificadores = true

    while(datosIdentificadores) {
        mensajeDetalles = "";
        color = prompt("Ingresá el color de tu preferencia");
        nombrePersonalizado = prompt("Ingresá el nombre de tu mascota");
        identificadorTelefono = prompt("Ingresá el teléfono que querés que aparezca en el identificador");
        cantidad = parseInt(prompt("Ingresá la cantidad deseada"));

        // chequeo que los campos no esten vacios
        if (!color){
            mensajeDetalles += "Debes ingresar el color del producto" + "\n";
        };

        if(!nombrePersonalizado){
            mensajeDetalles += "Debes ingresar el nombre de tu mascota" + "\n";
        };

        if(!identificadorTelefono){
            mensajeDetalles += "Debes ingresar el teléfono a figurar en el identificador" + "\n";
        };

        if(!cantidad){
            mensajeDetalles += "Debes elegir la cantidad deseada" + "\n";
        };

        if (mensajeDetalles != ""){
            alert(mensajeDetalles);
        }else {
            datosIdentificadores = false
        }

    }; 
    
    return new Productos (listaProducto[(parseInt(respuesta)-1)].tipo,(listaProducto[(parseInt(respuesta)-1)].precio*cantidad),listaProducto[(parseInt(respuesta)-1)].stock,color,identificadorTelefono,nombrePersonalizado,cantidad);
};

// funcion para solicitar detalles de los productos
function detallesProductos(respuesta) {
    let datosProductos = true

    while(datosProductos) {
        mensajeDetalles = "";
        color = prompt("Ingresá el color de tu preferencia");
        tematica = prompt("Ingresá la temática");
        nombrePersonalizado = prompt("Ingresá el nombre para personalizar si lo desea");
        cantidad = parseInt(prompt("Ingresá la cantidad deseada"));

        // chequeo que los campos no esten vacios
        if (!color){
            mensajeDetalles += "Debes ingresar el color del producto" + "\n";
        };

        if(!tematica){
            mensajeDetalles += "Debes ingresar la temática" + "\n";
        };

        if(!cantidad){
            mensajeDetalles += "Debes elegir la cantidad deseada" + "\n";
        };

        if (mensajeDetalles != ""){
            alert(mensajeDetalles);
        }else {
            datosProductos = false
        }

    }; 
    
    return new Productos (listaProducto[(parseInt(respuesta)-1)].tipo,(listaProducto[(parseInt(respuesta)-1)].precio*cantidad),listaProducto[(parseInt(respuesta)-1)].stock,color,tematica,nombrePersonalizado,cantidad);
};

// funcion para solicitar detalles de las remeras
function detallesRemeras(respuesta) {
    let datosRemeras = true

    while(datosRemeras) {
        mensajeDetalles = "";
        color = prompt("Ingresá el color de tu preferencia");
        tematica = prompt("Ingresá la temática");
        nombrePersonalizado = prompt("Ingresá el nombre para personalizar si lo desea");
        talle = prompt("Ingresá el talle");
        cantidad = parseInt(prompt("Ingresá la cantidad deseada"));

        // chequeo que los campos no esten vacios
        if (!color){
            mensajeDetalles += "Debes ingresar el color del producto" + "\n";
        };

        if(!tematica){
            mensajeDetalles += "Debes ingresar la temática" + "\n";
        };

        if(!talle){
            mensajeDetalles += "Debes elegir el talle de la remera" + "\n";
        };

        if(!cantidad){
            mensajeDetalles += "Debes elegir la cantidad deseada" + "\n";
        };

        if (mensajeDetalles != ""){
            alert(mensajeDetalles);
        }else {
            datosRemeras = false
        }

    }; 
    
    return new Productos (listaProducto[(parseInt(respuesta)-1)].tipo,(listaProducto[(parseInt(respuesta)-1)].precio*cantidad),listaProducto[(parseInt(respuesta)-1)].stock,color,tematica,nombrePersonalizado,cantidad,talle);
};

// funcion para terminar la compra
function terminarCompra() {
    // se muestra el total a pagar
    let totalPagar = 0;
    for (let i = 0 ;  i < lista.length ; i++){
        totalPagar += lista[i].precio;
    };
    alert("El total a pagar es: $ " + totalPagar);
    alert("Pronto te llegará un email con la orden de compra y link de pago." + "\n" + "Gracias por tu compra.");
    // una vez terminado el proceso de compra se limpia el carrito
    vaciarLista();
};

// funcion para vaciar carrito
function vaciarLista () {
    while(lista.length > 0){
        lista.shift(); 
    };
    // muestro por consola el array lista para verificar que se eliminaron los elementos
    console.log(lista);
};