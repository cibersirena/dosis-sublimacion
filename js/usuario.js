class Usuario {
    constructor (nombre,email,password) {
        this.name = nombre,
        this.mail = email,
        this.pass = password,
        this.activo =  true
    }
    mostrarBienvenida() {
        alert("Bienvenido/a " + this.name);
    }
}