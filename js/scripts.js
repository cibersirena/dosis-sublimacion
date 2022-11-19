let usuarios = [];
let listaProductos = [];
let listaCompra = [];

let adminUser = new AdminUsuarios();
let adminProduct = new AdminProductos();
let userActual;
let userGuardado = usuarioGuardado(userActual);

let registro = document.getElementById("registro");
const modalContent = document.querySelector('#modal-content');

// funcion para cargar los productos desde el archivo JSON
const pedirProductos = async () => {
    const respuesta = await fetch('./js/json/productos.json');
    const datos = await respuesta.json();
    datos.forEach( (producto) => {
        listaProductos.push(producto)
    });

    // los ordeno segun el tipo y le asigno como id su ubicacion dentro del array + 1 para evitar un ID 0
    listaProductos.sort((a, b) => a.tipo.localeCompare(b.tipo));
    // reasigno ID para que cuando se agregue un producto se actualicen los id automaticamente sin tener que tocar codigo
    listaProductos.forEach( (p) => {
        p.id = listaProductos.indexOf(p)+1;
    });

    // llamo a la funcion para cargarlos en el DOM
    adminProduct.cargaProductos();
};

// funcion para cargar los usuarios existentes desde el archivo JSON
const pedirUsuarios = async () => {
    const respuesta = await fetch('./js/json/usuarios.json');
    const datos = await respuesta.json();
    datos.forEach( (user)  => {
        usuarios.push(user)
    });
};


// Evento que se dispara al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {

   // si hay un user en local storage lo muestro en el boton de registro
   // sino le agrego los atributos de boton de bootstrap para que abra el modal y escucho el evento click
   if (userGuardado != "vacio") {
        registro.textContent = userGuardado.name;
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
   // cargo productos y usuarios
   pedirProductos();
   pedirUsuarios();

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

// función para verificar si hay user guardado en local storage
function usuarioGuardado(userActual){
    // verifico si ya hay un user guardado en local storage 
   userActual = JSON.parse(localStorage.getItem('user')) || "vacio";
   // confirmo por consola si hay un nombre de user
   console.log(userActual.name);
   return userActual;
};

// validación de usuario
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
    // verifico stock si hay pido detalles del producto sino muestro un mensaje al usuario
    listaProductos[(id-1)].stock ? adminProduct.detallesProductos(id) : adminProduct.mensajeModal("el producto elegido se encuentra sin stock");
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
    // compruebo de que haya algún producto en el carrito
    if (total === 0){
        adminProduct.mensajeModal("No hay productos cargados en el carrito");
    }else {
        // compruebo que el usuario esté registrado sino pido que se registre
        if(userGuardado != "vacio"){
           adminProduct.terminarCompra(total,userGuardado); 
        }else {
            adminProduct.mensajeModal("Para finalizar la compra tenés que registrarte");
            const botonModal = document.createElement('div');
            botonModal .classList.add("modal-footer");
            botonModal .innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                    <button type="button" class="btn" id="aceptar" onclick="javascript:adminUser.userRegistroNuevo()">Registrarme</button>`;
            modalContent.appendChild(botonModal);
        };
    };
};
