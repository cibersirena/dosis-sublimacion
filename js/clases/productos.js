class Productos {
    /**
     * 
     * @param {*} tipo 
     * @param {*} precio 
     * @param {*} stock 
     * @param {*} color 
     * @param {*} tematica 
     * @param {*} nombrePersonalizado 
     * @param {*} cantidad 
     */
    constructor (tipo,precio,stock,color,tematica,nombrePersonalizado,cantidad) {
        this.tipo = tipo,
        this.precio = precio,
        this.stock = stock,
        this.color = color,
        this.tematica = tematica,
        this.nombrePersonalizado = nombrePersonalizado,
        this.cantidad = cantidad
    };

    descripcionProducto () {
        return (this.tipo + "\n" + this.tematica + "\n" + this.color + "\n" + this.nombrePersonalizado + "\n" + this.cantidad + "\n" + "$ " + this.precio + "\n" ) ;
    };

    stockeado(){
        if (this.stock){
            return true;
        }else {
            return false;
        };
    };
}