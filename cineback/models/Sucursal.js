const pool=require('../db');
class Sucursal{
    constructor(){
        this.idsucursal=0;
        this.idempresa=0;
        this.nombre='';
        this.direccion='';
        this.telefono='';
        this.email='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    insertar(res){
        pool.query('INSERT INTO sucursal (idsucursal,idempresa,nombre,direccion,telefono,email,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?)',[
            this.idsucursal,
            this.idempresa,
            this.nombre,
            this.direccion,
            this.telefono,
            this.email,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(results);
        })
    }
    actualizar(res){
        pool.query('UPDATE sucursal SET nombre=?, direccion=?, telefono=?, email=?, updated_at=? WHERE idsucursal=?',[
            this.nombre,
            this.direccion,
            this.telefono,
            this.email,
            this.updated_at,
            this.idsucursal
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE sucursal SET deleted_at=? WHERE idsucursal=?',[
            this.deleted_at,
            this.idsucursal
        ],function(err,results,fields){
            res.json(results);
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `sucursal` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idsucursal,
            this.idempresa
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=Sucursal;