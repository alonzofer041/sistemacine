const pool=require('../db');
class CombosDetalle{
    constructor(){
        this.idcombodetalle=0;
        this.idcombo=0;
        this.idproducto=0;
        this.cantidad='';
        this.valor='';
        this.nombre='',
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    insertar(res){
        pool.query('INSERT INTO combosdetalle (idcombo,idproducto,cantidad,valor,nombre,imgcombo,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?)',[
            this.idcombo,
            this.idproducto,
            this.cantidad,
            this.valor,
            this.nombre,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(err);
        })
    }
    actualizar(res){
        pool.query('UPDATE combosdetalle SET idcombodetalle=?,idcombo=?,idproducto=?,cantida=?,valor=?,nombre=?,updated_at=? WHERE idcombodetalle=?',[
            this.idcombodetalle,
            this.idcombo,
            this.idproducto,
            this.cantidad,
            this.valor,
            this.nombre,
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE combosdetalle SET deleted_at=? WHERE idcombodetalle=?',[
            this.deleted_at,
            this.idcombodetalle
        ],function(err,results,fields){
            res.json(results); 
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `combosdetalle` WHERE `idcombo`=?  AND deleted_at IS NULL',[
            this.idcombo,
        ],function (err,results,fields){
            console.log(err)
            res.json(results);
        })
    }
}
module.exports=CombosDetalle