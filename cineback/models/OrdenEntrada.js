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
        this.MesFiltro='';
        this.AnioFiltro='';
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
    async TotalMontoEntradasVendidas(){
        let sql=`SELECT SUM(preciototal) AS preciototalentrada FROM ordenentradas WHERE idempresa=? AND idsucursal=? AND MONTH(created_at)=?`
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.MesFiltro
        ]);
        return respuesta[0].preciototalentrada;
    }
    async TotalEntradasVendidas(){
        let sql=`SELECT SUM(cantidadentradas) AS cantidadentradas FROM ordenentradas WHERE idempresa=? AND idsucursal=? AND MONTH(created_at)=?`
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.MesFiltro
        ]);
        return respuesta[0].cantidadentradas;
    }
    async TotalEntradasGenero(){
        let sql=`SELECT SUM(oe.cantidadentradas) AS cantidadentradas,pc.nombre FROM ordenentradas AS oe
        JOIN peliculas AS p ON oe.idpelicula=p.idpelicula
        JOIN peliculascategoria AS pc ON p.idpeliculacategoria=pc.idpeliculacategoria
        WHERE oe.idempresa=? AND oe.idsucursal=?
        GROUP BY pc.nombre`;
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal
        ]);
        return respuesta;
    }
    async TotalTicketsMes(){
        let sql=`SELECT SUM(cantidadentradas) AS cantidadentradas,MONTH(created_at) AS mes FROM ordenentradas
        WHERE idempresa=? AND idsucursal=? AND YEAR(created_at)=?
        GROUP BY MONTH(created_at)`;
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.AnioFiltro
        ]);
        return respuesta;
    }
    async TotalMontoEntradasMes(){
        let sql=`SELECT SUM(preciototal) AS preciototal,MONTH(created_at) AS mes FROM ordenentradas
        WHERE idempresa=? AND idsucursal=? AND YEAR(created_at)=?
        GROUP BY MONTH(created_at)`;
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.AnioFiltro
        ]);
        return respuesta;
    }
}
module.exports=OrdenEntrada;