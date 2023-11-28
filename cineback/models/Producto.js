const pool=require('../db');
class Producto{
    constructor(){
        this.idproducto=0;
        this.idproductocategoria=0;
        this.idproveedor=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.valor=0;
        this.cantidad=0,
        this.imgproducto='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(res){
        let respuesta=await pool.query('INSERT INTO productos (idproductocategoria,idproveedor,idempresa,idsucursal,nombre,valor,cantidad,imgproducto,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[
            this.idproductocategoria,
            this.idproveedor,
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.valor,
            this.cantidad,
            this.imgproducto,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE productos SET nombre=?,valor=?,cantidad=?,imgproducto=?,updated_at=? WHERE idproducto=?',[
            this.nombre,
            this.valor,
            this.cantidad,
            this.imgproducto,
            this.update_at,
            this.idproducto
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE productos SET deleted_at=? WHERE idproducto=?',[
            this.deleted_at,
            this.idproducto
        ]);
        return respuesta;
    }
    async listar(){
        const [rows]=await pool.execute('SELECT * FROM `productos` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ])
        return rows;
    }
    async GetCantidad(){
        let [respuesta]=await pool.query('SELECT cantidad FROM productos WHERE idproducto=?',[
            this.idproducto
        ]);
        return respuesta;
    }
    async ActualizarCantidad(){
        let respuesta=await pool.query('UPDATE productos SET cantidad=?, updated_at=? WHERE idproducto=?',[
            this.cantidad,
            this.updated_at,
            this.idproducto
        ]);
        return respuesta;
    }
}
module.exports=Producto