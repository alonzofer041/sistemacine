const pool=require('../db');
class Pelicula{
    constructor(){
        this.idpelicula=0;
        this.idpeliculacategoria=0;
        this.idempresa=0;
        this.idsucursal=0;
        this.titulo='';
        this.sinopsis='';
        this.fechaestreno='',
        this.aniorealizacion='';
        this.director='';
        this.reparto='';
        this.duracion='';
        this.productora='';
        this.distribuidora='';
        this.imgportada='';
        this.created_at='';
        this.updated_at='';
        this.deleted_at='';
    }
    insertar(){
        pool.query('INSERT INTO peliculas (idempresa,idsucursal,idpeliculacategoria,titulo,sinopsis,fechaestreno,aniorealizacion,director,reparto,duracion,productora,distribuidora,imgportada,created_at,updated_at,deleted_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
            this.idempresa,
            this.idsucursal,
            this.idpeliculacategoria,
            this.titulo,
            this.sinopsis,
            this.fechaestreno,
            this.aniorealizacion,
            this.director,
            this.reparto,
            this.duracion,
            this.productora,
            this.distribuidora,
            this.imgportada,
            this.created_at,
            null,
            null
        ],function(err,results,fields){
            console.log(err);
        })
    }
    actualizar(){

    }
    borrar(){

    }
}
module.exports=Pelicula