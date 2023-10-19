const pool=require('../db');
class Asientos{
    constructor(){
        this.idasiento=0;
        this.idsala=0;
        this.nombre='';
        this.fila='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    insertar(res){
        pool.query('INSERT INTO asientos (idsala,nombre,fila,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idsala,
            this.nombre,
            this.fila,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(results);
        })
    }
    actualizar(res){
        pool.query('UPDATE asientos SET nombre=?, fila=?, updated_at=? WHERE idasiento=?',[
            this.nombre,
            this.fila,
            this.updated_at,
            this.idasiento
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE asientos SET deleted_at=? WHERE idasiento=?',[
            this.deleted_at,
            this.idasiento
        ],function(err,results,fields){
            res.json(results);
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `asientos` WHERE `idsala`=? AND deleted_at IS NULL',[
            this.idsala,
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=Asientos;