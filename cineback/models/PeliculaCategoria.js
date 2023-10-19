const pool=require('../db');
class PeliculaCategoria{
    constructor(){
        this.idpeliculacategoria=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';

    }
    insertar(res){
        pool.query('INSERT INTO peliculascategoria (idempresa,idsucursal,nombre,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(results);
        })
    }
    actualizar(res){
        pool.query('UPDATE peliculascategoria SET nombre=? ,updated_at=? WHERE idpeliculacategoria=?',[
            this.nombre,
            this.updated_at,
            this.idpeliculacategoria
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE peliculascategoria SET deleted_at=? WHERE idpeliculacategoria=?',[
            this.deleted_at,
            this.idpeliculacategoria
        ],function(err,results,fields){
            res.json(results);
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `peliculascategoria` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ],function (err,results,fields){
            res.json(results);
        })
    }
}

module.exports=PeliculaCategoria;