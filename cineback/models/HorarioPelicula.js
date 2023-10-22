const pool=require('../db');
class HorarioPelicula{
    constructor(){
        this.idhorariopelicula=0;
        this.idsala=0;
        this.idpelicula=0;
        this.hora='',
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    insertar(res){
        pool.query('INSERT INTO horariospelicula (idpelicula,idsala,hora,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?)',[
            this.idpelicula,
            this.idsala,
            this.hora,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            res.json(err);
        })
    }
    actualizar(res){
        pool.query('UPDATE horariospelicula SET idsala=?,hora=?,updated_at=? WHERE idhorariopelicula=?',[
            this.idsala,
            this.hora,
            this.updated_at,
            this.idhorariopelicula,
        ],function(err,results,fields){
            console.log(err);
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE horariospelicula SET deleted_at=? WHERE idhorariopelicula=?',[
            this.deleted_at,
            this.idhorariopelicula
        ],function(err,results,fields){
            res.json(results); 
        })
    }
    listar(res){
        pool.execute('SELECT * FROM `horariospelicula` WHERE `idpelicula`=? AND deleted_at IS NULL',[
            this.idpelicula
        ],function (err,results,fields){
            res.json(results);
        })
    }
}
module.exports=HorarioPelicula