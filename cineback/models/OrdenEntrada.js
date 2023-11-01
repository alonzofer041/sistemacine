const pool=require('../db');
class OrdenEntrada{
    constructor(){
        this.idordenentrada=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.idsala=0;
        this.idpelicula=0;
        this.nombrecliente='';
        this.cantidadentradas=0;
        this.correocliente='';
        this.estatus='';
        this.preciototal=0;
        this.created_at='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO ordenentradas (idempresa,idsucursal,idsala,idpelicula,nombrecliente,cantidadentradas,correocliente,estatus,preciototal,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.idsala,
            this.idpelicula,
            this.nombrecliente,
            this.cantidadentradas,
            this.correocliente,
            this.estatus,
            this.preciototal,
            this.created_at
        ]);
        return respuesta;
    }
}
module.exports=OrdenEntrada;