let usuarios = [];
let listaProductos = [];
let listaCompra = []; //en el workshop se llama carrito

let adminUser = new AdminUsuarios();
let adminProduct = new AdminProductos();
let userActual;

let registro = document.getElementById("registro");
const modalContent = document.querySelector('#modal-content');


// Evento que se dispara al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
   // verifico si ya hay un user guardado en local storage 
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

   // verifico si hay productos guardados en local storage
   listaCompra = JSON.parse( localStorage.getItem('lista') ) || [];
   adminProduct.cargaProductos();
    
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


// funcion para inicar la compra
function iniciarCompra(id) {
    // verifico stock
    let hayStock = adminProduct.stockeado(id);
    if(hayStock){
        adminProduct.mensajeUsuario("");
        adminProduct.detallesProductos(id);
    }else {
        modalContent.innerHTML = '';
        adminProduct.mensajeUsuario("el producto elegido se encuentra sin stock");
    };
}

// valida detalles
function validarDetalles(id) {
    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";
    mensaje.style.color = "red";

    //validacion 
    const tematica = document.getElementById("tematica").value || (mensaje.textContent += "Ingresá tematica - ");
    const color = document.getElementById("color").value || (mensaje.textContent += "Ingresá un color - ");
    const nombre = document.getElementById("nombre").value || (mensaje.textContent += "Ingresá un color - ");
    if (mensaje.textContent === "") {
        adminProduct.cargarDetalles(id,color,tematica,nombre);   
    };
};

function eliminarProducto(id){
    adminProduct.eliminarProductoCarrito(id);
};


/*
// FUNCIONES que quedaron de la entrega anterior que me sirven como guia
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

*/