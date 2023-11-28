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
        this.aniofiltro='';
        this.mesfiltro='';
    }
    async insertar(){
        let sql=`INSERT INTO ordenproductos 
        (idempresa,idsucursal,folio,nombrecliente,importe,totaliva,correocliente,estatus,created_at)
        VALUES (?,?,?,?,?,?,?,?,?)`;
        const [respuesta]=await pool.query(sql,[
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
    async GetOrdenesProducto(){
        // let sql=`SELECT * FROM ordenproductos WHERE idempresa=? AND idsucursal=?`;
        // const [respuesta]=await pool.query(sql,[
        //     this.idempresa,
        //     this.idsucursal
        // ]);
        // return respuesta;
        let sql=`SELECT op.*,opd.idproducto,SUM(opd.valortotal) AS valortotal,p.nombre FROM ordenproductos AS op
        JOIN ordenproductosdetalle AS opd ON op.idordenproducto = opd.idordenproducto
        JOIN productos AS p ON opd.idproducto = p.idproducto
        WHERE op.idempresa=? AND op.idsucursal=? GROUP BY opd.idproducto`;
        const [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal
        ]);
        return respuesta;
    }
    async GetOrdenesCombo(){
        let sql=`SELECT op.*,opd.idcombo,SUM(opd.valortotal) AS valortotal,c.nombre FROM ordenproductos AS op
        JOIN ordenproductosdetalle AS opd ON op.idordenproducto = opd.idordenproducto
        JOIN combos AS c ON opd.idcombo = c.idcombo
        WHERE op.idempresa=? AND op.idsucursal=? GROUP BY opd.idcombo`;
        const [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal
        ]);
        return respuesta;
    }
    async GetOrdenesMontoMes(){
        let sql=`SELECT SUM(totaliva) AS totaliva, MONTH(created_at) AS mes FROM ordenproductos
        WHERE idempresa=? AND idsucursal=? AND YEAR(created_at)=?
        GROUP BY MONTH(created_at)`;
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.aniofiltro
        ]);
        return respuesta;
    }
    async GetTotalProductosVendidos(){
        let sql=`SELECT SUM(opd.cantidad) AS cantidad FROM ordenproductos AS op
        JOIN ordenproductosdetalle AS opd ON op.idordenproducto=opd.idordenproducto
        WHERE op.idempresa=? AND op.idsucursal=? AND MONTH(op.created_at)=?`
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.mesfiltro
        ]);
        return respuesta[0].cantidad;
    }
    async GetMontoTotalProductosVendidos(){
        let sql=`SELECT SUM(totaliva) AS totaliva FROM ordenproductos WHERE idempresa=? AND idsucursal=? AND MONTH(created_at)=?`;
        let [respuesta]=await pool.query(sql,[
            this.idempresa,
            this.idsucursal,
            this.mesfiltro
        ]);
        return respuesta[0].totaliva;
    }

}
module.exports=OrdenProducto;