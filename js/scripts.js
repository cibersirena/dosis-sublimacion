let usuarios = [];
let productos = [];
let lista = []; //en el workshop se llama carrito

let adminUser = new AdminUsuarios();
let registro = document.getElementById("registro");
let userActual;

const modalContent = document.querySelector('#modal-content');


// Evento que se dispara al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
   userActual = JSON.parse(localStorage.getItem('user')) || "vacio";
   // confirmo por consola si hay un nombre de user
   console.log(userActual.name);

   // si hay un user en local storage lo muestro en el boton de registro
   // sino le agrego los atributos de boton de bootstrap para que abra el modal y escucho el evento click
   if (userActual != "vacio") {
        registro.textContent = userActual.name;
   }else {
        registro.setAttribute("data-bs-toggle", "modal");
        registro.setAttribute("data-bs-target", "#myModal");

        //evento en el boton registro
        registro.addEventListener("click",()=>{
             //funcion para realizar un registro de usuario
            adminUser.userRegistroNuevo();
        });
   };
    
});

function validarUser() {
    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";
    mensaje.style.color = "red";

    //validacion 
    const validarNombre = document.getElementById("nombre").value || (mensaje.textContent += "Ingresá tu nombre - ");
    const validarEmail = document.getElementById("email").value || (mensaje.textContent += "Ingresá tu email - ");
    const validarPassword = document.getElementById("password").value || (mensaje.textContent += "Ingresá una contraseña");

    if (mensaje.textContent === "") {
        adminUser.validarDatos(validarNombre,validarEmail,validarPassword);
    };
};







/*

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
*/