const pool=require('../db');
class OrdenProductoDetalle{
    constructor(){
        this.idordenproductodetalle=0,
        this.idproducto=0;
        this.idordenproducto=0;
        this.idcombo='';
        this.cantidad='';
        this.preciounit=0;
        this.valortotal=0;
    }
    async insertar(){
        let sql=`INSERT INTO ordenproductosdetalle 
        (idproducto,idordenproducto,idcombo,cantidad,preciounit,valortotal)
        VALUES (?,?,?,?,?,?)`;
        const [respuesta]=await pool.query(sql,[
            this.idproducto,
            this.idordenproducto,
            this.idcombo,
            this.cantidad,
            this.preciounit,
            this.valortotal
        ]);
        return respuesta;
    }
}
module.exports=OrdenProductoDetalle;