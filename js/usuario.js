class Usuario {
    /**
     * 
     * @param {*} nombre 
     * @param {*} email 
     * @param {*} password 
     */
    constructor (nombre,email,password) {
        this.name = nombre,
        this.mail = email,
        this.pass = password,
        this.activo =  true //por si es necesario dar de baja un usuario y eliminarlo del array
    };
    mostrarBienvenida() {
        alert("Bienvenido/a " + this.name);
    };
}