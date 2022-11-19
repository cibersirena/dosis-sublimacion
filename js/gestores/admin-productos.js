class AdminProductos {
    
    cargaProductos() {
        
        //muestro por consola el listado de productos ordenados
        console.log(listaProductos);

        // llamo a la funcion para mostrar los productos en el html
        this.mostrarProductos(listaProductos);

        // Muestro en el carrito si hay algo guardado
        this.mostrarCarrito();

        // muestro la cantidad de productos que hay en el carrito
        this.actualizarCantidad();

        // llamo a la funcion para mostrar la lista de productos en el menu del nav
        this.menuProductos(listaProductos);
    };

    //carga menu productos
    menuProductos(listaProductos){
        // creo un nuevo array para que no se repitan items en el menu 
        const menu = [];
        listaProductos.forEach( (p) => {
            const { id,tipo, precio, stock, imagen, item } = p;
            menu.push(p.item);
        });
        // le sumo la opcion ver todos y solo con stock
        menu.push("Ver todos");
        menu.push("Solo con stock");

        let unicosItems = new Set(menu);
        // confirmo por consola que no se repiten items
        console.log(unicosItems);

        // creo el menu 
        const menuProductos = document.getElementById("menu-productos");
        menuProductos.innerHTML = '';
        unicosItems.forEach( (p) => {
            let li = document.createElement('li');   
            li.innerHTML = `<a class="dropdown-item" href="#!" id="${p}">${p}</a>`;
            menuProductos.appendChild(li);
        });

        // creo el menu de botones para filtrar
        const botonesFiltros = document.getElementById("filtros");
        botonesFiltros.innerHTML = 'Filtrar por: ';

        unicosItems.forEach( (p) => {
            let button = document.createElement('button');
            button.classList.add('btn', 'btn-secondary', 'filter');
            button.setAttribute('type', 'button');
            button.setAttribute('id', p+p);
            button.textContent = p;
            botonesFiltros.appendChild(button);
        });

        this.menuEventos(listaProductos,unicosItems);
        this.filtrosEventos(listaProductos,unicosItems);
    };

    // eventos del menu
    menuEventos(listaProductos,unicosItems){
        let resultado;
        let click;
        unicosItems.forEach( (p) => {
            if ((p != "Ver todos") || (p != "Solo con stock")){
                click = document.getElementById(p);
                click.addEventListener("click",()=>{
                    resultado = listaProductos.filter(lp => (lp.item == p));
                    this.mostrarProductos(resultado);
                    this.mensajeUsuario("Se muestran todos/as los/as: "+p)
                });
            }
            if (p == "Ver todos"){
                click = document.getElementById("Ver todos");
                click.addEventListener("click",()=>{
                    this.mostrarProductos(listaProductos);
                    this.mensajeUsuario("Se muestran todos los productos");
                });  
            }else {
                click = document.getElementById("Solo con stock");
                click.addEventListener("click",()=>{
                    resultado = listaProductos.filter(lp => (lp.stock == true));
                    this.mostrarProductos(resultado);
                    this.mensajeUsuario("Se muestran todos los productos con stock")
                });
            };
        });   
    };

    // eventos de los botones de filtrado
    filtrosEventos(listaProductos,unicosItems){
        let resultado;
        let click;
        unicosItems.forEach( (p) => {
            switch (p) {
                case "Ver todos":   click = document.getElementById(p+p);
                                    click.addEventListener("click",()=>{
                                        this.mostrarProductos(listaProductos);
                                        this.mensajeUsuario("Se muestran todos los productos");
                                    });
                                    break;
                case "Solo con stock":  click = document.getElementById(p+p);
                                        click.addEventListener("click",()=>{
                                            resultado = listaProductos.filter(lp => (lp.stock == true));
                                            this.mostrarProductos(resultado);
                                            this.mensajeUsuario("Se muestran todos los productos con stock")
                                        });
                                        break;
                default:    click = document.getElementById(p+p);
                            click.addEventListener("click",()=>{
                                resultado = listaProductos.filter(lp => (lp.item == p));
                                this.mostrarProductos(resultado);
                                this.mensajeUsuario("Se muestran todos/as los/as: "+p)
                });
            };
        });                             
    };
    
    // funcion para mostrar los productos en el html
    mostrarProductos(listaProductos){
        
        const cardProductos = document.getElementById("productos");
        cardProductos.innerHTML = '';
        
        if(listaProductos.length === 0) {
            this.mensajeUsuario("No hay productos para mostrar");
            return false;
        }else {          
            listaProductos.forEach( (p) => {
                const { id,tipo, precio, stock, imagen, item } = p;

                let itemStock = p.stock ? "" : "sin stock";
                
                let divCard = document.createElement('div');
                divCard.classList.add('col', 'mb-5');
                divCard.setAttribute('id', listaProductos.indexOf(p));    
                divCard.innerHTML = `<div class="col mb-3">
                                        <div class="card h-100">
                                            <img class="card-img-top" src="./assets/productos/${imagen}" alt="${tipo}">
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                    <h5 class="fw-bolder">${tipo.toLowerCase()} <span class="badge rounded-pill bg-dark">${itemStock}</span></h5>
                                                    $ ${precio}.-
                                                </div>
                                            </div>
                                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                            <button type="button" class="btn btn-outline-dark me-3" id="comprar" data-bs-toggle="modal" data-bs-target="#myModal" onclick="javascript:iniciarCompra(${id})">Comprar</button></div>
                                            </div> 
                                        </div>
                                    </div>`;
    
                cardProductos.appendChild(divCard);
            });
        };   
    };
    
    // se pide el detalle del producto segun el tipo de item
    detallesProductos(id){
        modalContent.innerHTML = '';
        if (listaProductos[(id-1)].item === "Identificadores") {
            this.detalleIdentificadorForm(id)
        }else {
           if (listaProductos[(id-1)].item === "Remeras") {
            this.detalleRemeraForm(id)
            }else {
                this.detalleProductoForm(id)
            };
        };
    };

    detalleProductoBase(id){
        let detalleForm = document.createElement('div');
        detalleForm.classList.add("modal-body");
        detalleForm.innerHTML = `<div class="modal-header">
                                <h5 class="modal-title">Detalles</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <p id="mensaje"></p>
                                <form id="modal-form">
                                    <div class="mb-3" id="campo-1">
                                        <label class="col-form-label" for="color">Ingresá el color</label>
                                        <input type="text" class="form-control" id="color">
                                    </div>
                                    <div class="mb-3" id="campo-2">
                                        <label class="col-form-label" for="tematica"></label>
                                        <input type="text" class="form-control" id="tematica">
                                    </div>
                                    <div class="mb-3" id="campo-3">
                                        <label class="col-form-label" for="nombre"></label>
                                        <input type="text" class="form-control" id="nombre">
                                    </div>
                                </form>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancelar</button>
                                    <button type="button" class="btn" id="aceptar" onclick="javascript:validarDetalles(${id})">Aceptar</button>
                                </div>`;
        modalContent.appendChild(detalleForm);
    };

    detalleProductoForm(id){ 
        
        this.detalleProductoBase(id);
        
        const divLabelDos = document.querySelector('[for="tematica"]');
        divLabelDos.textContent = "Ingresá la temática";

        const divLabelTres = document.querySelector('[for="nombre"]');
        divLabelTres.textContent ="Ingresá el nombre";
    };

    detalleIdentificadorForm(id){

        this.detalleProductoBase(id);
        
        const divLabelDos = document.querySelector('[for="tematica"]');
        divLabelDos.textContent = "Ingresá el teléfono para el identificador";

        const divLabelTres = document.querySelector('[for="nombre"]');
        divLabelTres.textContent ="Ingresá el nombre de tu mascota";
    };

    detalleRemeraForm(id){
        
        this.detalleProductoBase(id);
        
        const divLabelDos = document.querySelector('[for="tematica"]');
        divLabelDos.textContent = "Ingresá la temática";

        const divLabelTres = document.querySelector('[for="nombre"]');
        divLabelTres.textContent ="Ingresá el talle";
    };
    
    cargarDetalles(id,color,tematica,nombre){
        let detalles = new Productos (id,listaProductos[id-1].tipo,listaProductos[id-1].precio,listaProductos[id-1].stock,listaProductos[id-1].imagen,listaProductos[id-1].item,color,tematica,nombre,1);
        //agrego el producto a mi lista de compra
        listaCompra.unshift(detalles);

        // muestro el array lista por consola para verificar si ingreso el producto
        console.log(listaCompra)

        // confirmo al usuario
        this.mensajeModal("El producto se cargó con éxito")

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
        
        listaCompra.forEach( (p) => {
            const { id,tipo,precio,stock,imagen,item,color,tematica,nombrePersonalizado,cantidad} = p
            
            const row = document.createElement('div');
            row.classList.add('row');
            row.setAttribute('id', listaCompra.indexOf(p));   
            
            total += parseInt(p.precio);
            
            const idRow = document.getElementById(listaCompra.indexOf(p));
            let rowId = idRow.getAttribute("id");

            row.innerHTML = `<div class="col-2 d-flex align-items-center p-2">
                                <img src="./assets/productos/${imagen}" alt="${tipo}" width="50">
                            </div>
                            <div class="col-5 d-flex align-items-center p-2"> 
                                 ${tipo}
                            </div>
                            <div class="col-3 d-flex align-items-center justify-content-end p-2">
                                $ ${precio}.-
                            </div>
                            <div class="col-2 d-flex align-items-center justify-content-end p-3">
                                ${cantidad}
                            </div>
                            <div class="col-10 d-flex align-items-center justify-content-start p-2 border-bottom">
                               Detalles: ${color} | ${tematica} | ${nombrePersonalizado}
                            </div>
                            <div class="col-2 d-flex align-items-center justify-content-end p-3 border-bottom">
                                <a href="javascript:adminProduct.eliminarProductoCarrito(${rowId})">
                                    <i class="bi bi-x-circle"></i>
                                </a>
                            </div>`;
            detalleCarrito.appendChild(row);
        });

        let row = document.createElement('div');
        row.classList.add('row');
        row.innerHTML = `<div class="col-4 d-flex align-items-center justify-content-start p-2">
                            Total a pagar:
                        </div>
                        <div class="col-8 d-flex align-items-center justify-content-end p-3">
                            <b> $ ${total}</b>
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-start p-2 border-bottom">
                            <button type="button" class="btn btn-outline-dark me-3" data-bs-dismiss="offcanvas" id="finalizar" data-bs-toggle="modal" data-bs-target="#myModal" onclick="javascript:finalizarCompra(${total})">Finalizar compra</button>
                            <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="offcanvas" id="vaciar" onclick="javascript:adminProduct.eliminarCarrito()">Vaciar carrito</button></div>
                        </div>`;
    
        detalleCarrito.appendChild(row);
    };

    // terminar compra
    terminarCompra(total,userGuardado){
        this.mensajeModal("Finalizando compra");
        
        let pagar = document.createElement("div");
        pagar.classList.add("modal-body");
        pagar.innerHTML = ` <h5 class="mx-3">El total a pagar es: $ ${total}.-</h5>
                            <p class="mx-3">${userGuardado.name} te llegará un email a ${userGuardado.mail} con la orden de compra y link de pago.</p>
                            <h4 class="fw-bolder text-center">Gracias por tu compra :)</h4>
                            <div class="modal-footer">
                                <button type="button" class="btn" id="fin" onclick="javascript:adminProduct.vaciarCarrito()" data-bs-dismiss="modal">Aceptar</button>
                            </div>`;

        modalContent.appendChild(pagar);
    };

    // elimina el producto
    eliminarProductoCarrito(rowId){ 
        Swal.fire({
            title: '¿Estás seguro de eliminar el producto seleccionado?',
            padding: '1rem',
            showDenyButton: true,
            confirmButtonColor: '#c52a76',
            confirmButtonText: 'Sí, eliminar',
            denyButtonText: 'NO',
            denyButtonColor: '#303030',
        }).then((result) => {
        
            if (result.isConfirmed){
                listaCompra = listaCompra.filter( p => listaCompra.indexOf(p) != rowId);
                this.guardarLista();
                this.mostrarCarrito();
                this.actualizarCantidad();

                // Muestro la confirmacion de producto eliminado
                Toastify({
                    text: "El producto se eliminó con éxito",
                    duration: 2000,
                    gravity: 'bottom',
                    style: {
                        background: "linear-gradient(to right, #c52a76, #005979)",
                    }
                }).showToast();
            };
        });
    };
    

    //Eliminar todo el carrito
    eliminarCarrito(){
        if (listaCompra != ""){
            Swal.fire({
                title: '¿Estás seguro de vaciar el carrito de compras?',
                padding: '1rem',
                showDenyButton: true,
                confirmButtonColor: '#c52a76',
                confirmButtonText: 'Vaciar',
                denyButtonText: 'NO',
                denyButtonColor: '#303030',
            }).then((result) => {
            
                if (result.isConfirmed){
                    this.vaciarCarrito();
    
                    // Muestro la confirmacion de producto eliminado
                    Toastify({
                        text: "El carrito se vació con éxito",
                        duration: 2000,
                        gravity: 'bottom',
                        style: {
                            background: "linear-gradient(to right, #c52a76, #005979)",
                          }
                    }).showToast();
                };            
            });
        };
    };

    //Contabilizo las cantidad de productos
    cantidadProductos() { 
        let cantidadProductos = 0;
        listaCompra.forEach( (p) => {
            cantidadProductos = cantidadProductos + parseInt(p.cantidad);
        });
        return cantidadProductos;
    };

    // Actualizo cantidad de productos
    actualizarCantidad() { 
        let totalProductos = this.cantidadProductos();
        let badgeCarrito = document.querySelector('#badgeCarrito');
        // Actualizo contador del carrito para el usuario
        badgeCarrito.innerHTML = totalProductos;
    };

    // Guardar en Storage
    guardarLista() { 
        localStorage.setItem('lista', JSON.stringify(listaCompra));       
    };

    // vaciar carrito
    vaciarCarrito(){
        listaCompra = [];
        this.guardarLista();
        this.mostrarCarrito();
        this.actualizarCantidad();
    };

    // devuelve un mensaje al usuario
    mensajeUsuario(m){
        const mensajeUser = document.getElementById("mensajeUser");
        mensajeUser.textContent= m;
    };

    // mensaje al usuario en modal
    mensajeModal(mm) {
        modalContent.innerHTML = '';
        const mensajeModal = document.createElement('div');
        mensajeModal.classList.add("modal-body");
        mensajeModal.innerHTML = `  <div class="modal-header">
                                        <h5 class="modal-title">${mm}</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>`;
  
        modalContent.appendChild(mensajeModal);
    };
}