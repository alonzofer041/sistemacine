const pool=require('../db');
class Pelicula{
    constructor(){
        this.idpelicula=0;
        this.idpeliculacategoria='';
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
    insertar(res){
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
            res.json(err);
        })
    }
    actualizar(res){
        pool.query('UPDATE peliculas SET idpeliculacategoria=?,titulo=?,sinopsis=?,aniorealizacion=?,director=?,reparto=?,duracion=?,productora=?,distribuidora=?,imgportada=? ,updated_at=? WHERE idpelicula=?',[
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
            this.updated_at,
            this.idpelicula
        ],function(err,results,fields){
            res.json(results);
        })
    }
    eliminar(res){
        pool.query('UPDATE peliculas SET deleted_at=? WHERE idpelicula=?',[
            this.deleted_at,
            this.idpelicula
        ],function(err,results,fields){
            res.json(results);
        })
    }
    async listar(res){
        let sql=`SELECT *, pc.nombre AS categoria FROM peliculas AS p
        JOIN peliculascategoria AS pc ON p.idpeliculacategoria=pc.idpeliculacategoria
        WHERE p.idempresa=? AND p.idsucursal=? AND p.deleted_at IS NULL`
        const [respuesta]=await pool.execute(sql,[
            this.idempresa,
            this.idsucursal
        ])
        return respuesta
    }
}
module.exports=Pelicula