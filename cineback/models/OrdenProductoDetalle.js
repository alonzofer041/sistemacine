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
    // async GetProductos(){
    //     let sql=`SELECT opd.idproducto,opd.valortotal,p.nombre FROM ordenproductosdetalle AS opd
    //     JOIN productos AS p ON opd.idproducto = p.idproducto
    //     WHERE opd.idordenproducto =? GROUP BY opd.idordenproducto,p.idproducto`;
    //     const [respuesta]=await pool.query(sql,[
    //         this.idordenproducto
    //     ]);
    //     return respuesta;
    // }
}
module.exports=OrdenProductoDetalle;