const pool=require('../db');
class Salas{
    constructor(){
        this.idsala=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.ubicacion='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    insertar(res){
        pool.query('INSERT INTO salas (idempresa,idsucursal,nombre, ubicacion, created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.ubicacion,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(results);
        })
    }
    actualizar(res){
        pool.query('UPDATE salas SET nombre=?, ubicacion=?, updated_at=? WHERE idsala=?',[
            this.nombre,
            this.ubicacion,
            this.updated_at,
            this.idsala
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE salas SET deleted_at=? WHERE idsala=?',[
            this.deleted_at,
            this.idsala
        ],function(err,results,fields){
            res.json(results);
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `salas` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=Salas;