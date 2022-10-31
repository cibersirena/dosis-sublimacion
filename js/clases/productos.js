class Productos {
    /**
     * 
     * @param {*} id 
     * @param {*} tipo 
     * @param {*} precio 
     * @param {*} stock 
     * @param {*} imagen 
     * @param {*} color 
     * @param {*} tematica 
     * @param {*} nombrePersonalizado 
     * @param {*} cantidad 
     */
    constructor (id,tipo,precio,stock,imagen,color,tematica,nombrePersonalizado,cantidad) {
        this.id = id,
        this.tipo = tipo,
        this.precio = precio,
        this.stock = stock,
        this.imagen = imagen,
        this.color = color,
        this.tematica = tematica,
        this.nombrePersonalizado = nombrePersonalizado,
        this.cantidad = cantidad
    };
}