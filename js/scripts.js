let usuarios = [];
let listaProductos = [];
let listaCompra = [];

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

// escucho click boton quienes somos e informo que la pagina está en construcción
const quienesSomos = document.getElementById("quienes-somos");
quienesSomos.addEventListener("click",()=>{
    Swal.fire({
        title: 'Disculpá la molestia, esta página está en construcción',
        padding: '1rem',
        confirmButtonColor: '#c52a76',
        confirmButtonText: 'Aceptar',         
    });
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
        adminProduct.detallesProductos(id);
    }else {
        adminProduct.mensajeModal("el producto elegido se encuentra sin stock");
    };
};

// valida detalles
function validarDetalles(id) {
    let mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";
    mensaje.style.color = "red";

    //validacion 
    const tematica = document.getElementById("tematica").value || (mensaje.textContent += "Ingresá tematica - ");
    const color = document.getElementById("color").value || (mensaje.textContent += "Ingresá un color - ");
    const nombre = document.getElementById("nombre").value || (mensaje.textContent += "Ingresá un nombre - ");
    if (mensaje.textContent === "") {
        adminProduct.cargarDetalles(id,color,tematica,nombre);   
    };
};

// finalizar compra
function finalizarCompra(total){
    if (total === 0){
        adminProduct.mensajeModal("No hay productos cargados en el carrito");
    }else {
        adminProduct.terminarCompra(total);
    };
};