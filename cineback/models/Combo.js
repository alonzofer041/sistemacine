const pool=require('../db');
class Combo{
    constructor(){
        this.idcombo=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.nombre='';
        this.valor='';
        this.imgcombo='',
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    insertar(res){
        pool.query('INSERT INTO combos (idempresa,idsucursal,nombre,valor,imgcombo,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.valor,
            this.imgcombo,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(err);
        })
    }
    actualizar(res){
        pool.query('UPDATE combos SET idcombo=?,idempresa=?,idsucursal=?,nombre=?,valor=?,imgcombo=?,updated_at=? WHERE idcombo=?',[
            this.idcombo,
            this.idempresa,
            this.idsucursal,
            this.nombre,
            this.valor,
            this.imgcombo,
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE combos SET deleted_at=? WHERE idcombo=?',[
            this.deleted_at,
            this.idcombo
        ],function(err,results,fields){
            res.json(results); 
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `combos` WHERE `idempresa`=? AND `idsucursal`=? AND deleted_at IS NULL',[
            this.idempresa,
            this.idsucursal
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=Combo