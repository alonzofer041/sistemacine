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
    insertar(res){
        pool.query('INSERT INTO productos (idproductocategoria,idproveedor,idempresa,idsucursal,nombre,valor,cantidad,imgproducto,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)',[
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
        ],function(err,results,fields){
            res.json(err);
        })
    }
    actualizar(res){
        pool.query('UPDATE productos SET nombre=?,valor=?,cantidad=?,imgproducto=?,updated_at=? WHERE idproducto=?',[
            this.nombre,
            this.valor,
            this.cantidad,
            this.imgproducto,
            this.update_at,
            this.idproducto
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE productos SET deleted_at=? WHERE idproducto=?',[
            this.deleted_at,
            this.idproducto
        ],function(err,results,fields){
            res.json(results);
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `productos` WHERE `idproductocategoria`=? AND `idproveedor`=? AND `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idproductocategoria,
            this.idproveedor,
            this.idempresa,
            this.idsucursal
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=Producto