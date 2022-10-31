class AdminProductos {
    cargaProductos() {
        // Array de productos a la venta
        listaProductos = [
            {
                "id": 7,
                "tipo": "TAZA CERAMICA",
                "precio": 1500,
                "stock": true,
                "imagen": "Taza-13.jpg"
            },
            {
                "id": 8,
                "tipo": "TAZA POLIMERO",
                "precio": 800,
                "stock": true,
                "imagen": "Taza-18.jpg"
            },
            {
                "id": 6,
                "tipo": "REMERA",
                "precio": 2000,
                "stock": false,
                "imagen": "Remera-03.jpg"
            },
            {
                "id": 3,
                "tipo": "IDENTIFICADOR PERRO",
                "precio": 500,
                "stock": true,
                "imagen": "identificador-45.jpg"
            },
            {
                "id": 2,
                "tipo": "IDENTIFICADOR GATO",
                "precio": 500,
                "stock": true,
                "imagen": "identificador-49.jpg"
            },
            {
                "id": 1,
                "tipo": "GORRA",
                "precio": 1800,
                "stock": false,
                "imagen": "Gorra-07.png"
            },
            {
                "id": 4,
                "tipo": "KIT INFANTIL",
                "precio": 3000,
                "stock": true,
                "imagen": "kit-jardin-02.jpg"
            },
            {
                "id": 5,
                "tipo": "MATE",
                "precio": 800,
                "stock": true,
                "imagen": "mate-02.jpg"
            }
        ];

        // los ordeno segun el id
        listaProductos.sort((a, b) => (a.id - b.id));
        
        //muestro por consola el listado de productos ordenados
        console.log(listaProductos);

        // llamo a la funcion para mostrar los productos en el html
        this.mostrarProductos(listaProductos);

        // Muestro en el carrito si hay algo guardado
        this.mostrarCarrito();

        // muestro la cantidad de productos que hay en el carrito
        this.actualizarCantidad();

    };

    // funcion para verificar stock
    stockeado(id){
        if (listaProductos[(id-1)].stock){
            return true;
        }else {
            return false;
        };
    };

    // funcion para mostrar los productos en el html
    mostrarProductos(listaProductos){
        //creo las cards de cadad producto, eliminado lo que haya previamente
        const cardProductos = document.getElementById("productos");
        cardProductos.innerHTML = '';

        if(listaProductos.length === 0) {
            // si no hay productos cargados se muestra el mensaje al usuario
            this.mensajeUsuario("No hay productos para mostrar");
            return false;
        } 
        else {          
            listaProductos.forEach( (p) => {

                const { id,tipo, precio, stock, imagen } = p
                //por cada producto creo un div
                let divCard = document.createElement('div');
                // agrego clases y atributos
                divCard.classList.add('col', 'mb-5');
                divCard.setAttribute('id', 'prod_'+(id));    
                // agrego elementos html
                divCard.innerHTML = `<div class="col mb-3">
                                        <div class="card h-100">
                                            <!-- imagen del producto-->
                                            <img class="card-img-top" src="../assets/productos/${imagen}" alt="${tipo}">
                                            <!-- detalle del producto-->
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                    <!-- nombre-->
                                                    <h5 class="fw-bolder">${tipo.toLowerCase()}</h5>
                                                    <!-- Precio-->
                                                    $ ${precio}.-
                                                </div>
                                            </div>
                                            <!-- Acciones-->
                                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                            <button type="button" class="btn btn-outline-dark me-3" id="comprar" data-bs-toggle="modal" data-bs-target="#myModal" onclick="javascript:iniciarCompra(${id})">Comprar</button></div>
                                            </div> 
                                        </div>
                                    </div>`;
    
                cardProductos.appendChild(divCard);
            });
        };

    };

    // buscar la manera de hacerlo mas practico
    detallesProductos(id){
        modalContent.innerHTML = '';
        switch(id){
            case 1 : 
                    this.detalleProductoForm(id)
                    break;
            case 2 : 
                    this.detalleIdentificadorForm(id)
                    break;
            case 3 : 
                    this.detalleIdentificadorForm(id)
                    break;
            case 4 : 
                    this.detalleProductoForm(id)
                    break;
            case 5 : 
                    this.detalleProductoForm(id)
                    break;
            case 6 : 
                    this.detalleRemeraForm(id)
                    break;
            case 7 : 
                    this.detalleProductoForm(id)
                    break;
            case 8 : 
                    this.detalleProductoForm(id)
                    break;
            default:
                    return detalleForm
        };
    };

    detalleProductoForm(id){
        let detalleForm = document.createElement('div');
        detalleForm.classList.add("modal-body");
        detalleForm.innerHTML = `  <div class="modal-header">
                                <h5 class="modal-title">Detalles</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <p id="mensaje"></p>
                            <form id="modal-form">
                                <div class="mb-3">
                                    <label for="color" class="col-form-label">Ingresá el color</label>
                                    <input type="text" class="form-control" id="color">
                                </div>
                                <div class="mb-3">
                                    <label for="tematica" class="col-form-label">Ingresá la temática</label>
                                    <input type="text" class="form-control" id="tematica">
                                </div>
                                <div class="mb-3">
                                    <label for="nombre" class="col-form-label">Ingresá un nombre</label>
                                    <input type="text" class="form-control" id="nombre">
                                </div>
                            </form>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                <button type="button" class="btn" id="aceptar" onclick="javascript:validarDetalles(${id})">Aceptar</button>
                            </div>`;

        modalContent.appendChild(detalleForm);
    };

    detalleIdentificadorForm(id){
        let detalleForm = document.createElement('div');
        detalleForm.classList.add("modal-body");
        detalleForm.innerHTML = `  <div class="modal-header">
                                <h5 class="modal-title">Detalles</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <p id="mensaje"></p>
                            <form id="modal-form">
                                <div class="mb-3">
                                    <label for="color" class="col-form-label">Ingresá el color</label>
                                    <input type="text" class="form-control" id="color">
                                </div>
                                <div class="mb-3">
                                    <label for="tematica" class="col-form-label">Ingresá el teléfono para el identificador</label>
                                    <input type="text" class="form-control" id="tematica">
                                </div>
                                <div class="mb-3">
                                    <label for="nombre" class="col-form-label">Ingresá el nombre de tu mascota</label>
                                    <input type="text" class="form-control" id="nombre">
                                </div>
                            </form>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                <button type="button" class="btn" id="aceptar" onclick="javascript:validarDetalles(${id})">Aceptar</button>
                            </div>`;

        modalContent.appendChild(detalleForm);
    };

    detalleRemeraForm(id){
        let detalleForm = document.createElement('div');
        detalleForm.classList.add("modal-body");
        detalleForm.innerHTML = `  <div class="modal-header">
                                <h5 class="modal-title">Detalles</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <p id="mensaje"></p>
                            <form id="modal-form">
                                <div class="mb-3">
                                    <label for="color" class="col-form-label">Ingresá el color</label>
                                    <input type="text" class="form-control" id="color">
                                </div>
                                <div class="mb-3">
                                    <label for="tematica" class="col-form-label">Ingresá la temática</label>
                                    <input type="text" class="form-control" id="tematica">
                                </div>
                                <div class="mb-3">
                                    <label for="nombre" class="col-form-label">Ingresá el talle</label>
                                    <input type="text" class="form-control" id="nombre">
                                </div>
                            </form>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                <button type="button" class="btn" id="aceptar" onclick="javascript:validarDetalles(${id})">Aceptar</button>
                            </div>`;

        modalContent.appendChild(detalleForm);
    };
    
    cargarDetalles(id,color,tematica,nombre){
        let detalles = new Productos (id,listaProductos[id-1].tipo,listaProductos[id-1].precio,listaProductos[id-1].stock,listaProductos[id-1].imagen,color,tematica,nombre,1);
        //agrego el producto a mi lista de compra
        listaCompra.unshift(detalles);

        // muestro el array lista por consola para verificar si ingreso el producto
        console.log(listaCompra)

        // confirmo al usuario
        modalContent.innerHTML = '';
        let confirmacion = document.createElement('div');
        confirmacion.classList.add("modal-body");
        confirmacion.innerHTML = ` <div class="modal-header">
                                        <h5 class="modal-title">Los detalles se cargaron con exito</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>`;
  
        modalContent.appendChild(confirmacion);

        // guardar en local storage
        this.guardarLista();

        // funcion para mostrar el producto en el carrito al usuario
        this.mostrarCarrito();

        // funcion para actualizar la cantidad de productos
        this.actualizarCantidad();
    };

    // muestro lo que hay en el carrito de compras
    mostrarCarrito() {
        let detalleCarrito = document.querySelector('#idCarrito');
        detalleCarrito.innerHTML = '';
        let total = 0;
        
        listaCompra.forEach( ( p ) => {
            const { id,tipo,precio,stock,imagen,color,tematica,nombrePersonalizado,cantidad} = p
            const row = document.createElement('div');
            row.classList.add('row');
            total += parseInt(p.precio);
            row.innerHTML = `<div class="col-2 d-flex align-items-center p-2">
                                <img src="../assets/productos/${imagen}" alt="${tipo}" width="50">
                            </div>
                            <div class="col-5 d-flex align-items-center p-2"> 
                                 ${tipo}
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-end p-2">
                                $ ${precio}.-
                            </div>
                            <div class="col-2 d-flex align-items-center justify-content-end p-2">
                                ${cantidad}
                            </div>
                            <div class="col-10 d-flex align-items-center justify-content-end p-2 border-bottom">
                                ${color} ${tematica} ${nombrePersonalizado}
                            </div>
                            <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                                <a href="javascript:eliminarProducto(${id})">
                                    <i class="bi bi-x-square"></i>
                                </a>
                            </div>`;
            detalleCarrito.appendChild(row);
        });

        let row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = `<div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                            Total a pagar:
                        </div>
                        <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                            <b> $ ${total}</b>
                        </div>`;
                        // falta el boton finalizar compra
    
        detalleCarrito.appendChild(row);
    };

// elimina el producto
    eliminarProductoCarrito(id){ 
    Swal.fire({
        title: '"Esta seguro de eliminar el producto ?"',
        showCancelButton: true,
        confirmButtonColor: '#c52a76',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'NO',
        }).then((result) => {
        
            if (result.isConfirmed){
                //tengo que buscar otra manera de filtrar los id se pueden repetir
                listaCompra = listaCompra.filter( p => p.id != id);
                this.guardarLista();
                this.mostrarCarrito();
                this.actualizarCantidad();

                // Muestro la confirmacion de producto eliminado
                Toastify({
                    text: "El producto fue eliminado con exito",
                    duration: 2000,
                    gravity: 'bottom'
                }).showToast();
            };            
      });
    };

    //Contabilizo las cantidad de productos
    cantidadProductos() { 
        let cantidadProductos = 0;
        listaCompra.forEach(( p ) => {
            cantidadProductos = cantidadProductos + parseInt(p.cantidad);
        });
        return cantidadProductos;
    };

    // Actualizo cantidad de productos
    actualizarCantidad() { 
        let totalProductos = this.cantidadProductos();
        let badgeCarrito = document.querySelector('#badgeCarrito');
        // Actualizar contador del carrito
        badgeCarrito.innerHTML = totalProductos;
    }

    // Guardar en Storage
    guardarLista() { 
        localStorage.setItem('lista', JSON.stringify(listaCompra));       
    };

    // devuelve un mensaje al usuario
    mensajeUsuario(m){
        const mensajeUser = document.getElementById("mensajeUser");
        mensajeUser.textContent= m;
    }
}