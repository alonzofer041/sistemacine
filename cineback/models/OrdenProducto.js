const pool=require('../db');
class OrdenProducto{
    constructor(){
        this.idordenproducto=0,
        this.idempresa=0;
        this.idsucursal=0;
        this.folio='';
        this.nombrecliente='';
        this.importe=0;
        this.totaliva=0;
        this.correocliente='';
        this.estatus='';
        this.created_at='';
    }
    async insertar(){
        let sql=`INSERT INTO ordenproductos 
        (idempresa,idsucursal,folio,nombrecliente,importe,totaliva,correocliente,estatus,created_at)
        VALUES (?,?,?,?,?,?,?,?,?)`;
        const respuesta=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.folio,
            this.nombrecliente,
            this.importe,
            this.totaliva,
            this.correocliente,
            this.estatus,
            this.created_at
        ]);
        return respuesta;
    }
}
module.exports=OrdenProducto;