const pool=require('../db');
class ProductoCategoria{
    constructor(){
        this.idproductocategoria=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    async insertar(){
        let respuesta=await pool.query('INSERT INTO productocategoria (idempresa,idsucursal,nombre,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.created_at,
            null,
            null
        ]);
        return respuesta;
    }
    async actualizar(){
        let respuesta=await pool.query('UPDATE productocategoria SET nombre=? ,updated_at=? WHERE idproductocategoria=?',[
            this.nombre,
            this.updated_at,
            this.idproductocategoria
        ]);
        return respuesta;
    }
    async eliminar(){
        let respuesta=await pool.query('UPDATE productocategoria SET deleted_at=? WHERE idproductocategoria=?',[
            this.deleted_at,
            this.idproductocategoria
        ]);
        return respuesta;
    }
    async listar(res){
        const [rows]=await pool.execute('SELECT * FROM `productocategoria` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ])
        return rows;
    }
}
module.exports=ProductoCategoria