const pool = require('../db');
const { default: Pelicula } = require('../models/Pelicula');
//@desc crear pelicula
//@route POST /api/pelicula
//@access public
const addPelicula=((req,res)=>{
    let Pelicula=new Pelicula;
    Pelicula.idpeliculacategoria=req.body.idpeliculacategoria;
    Pelicula.idempresa=1;
    Pelicula.idsucursal=1;
    Pelicula.titulo=req.body.titulo;
    Pelicula.sinopsis=req.body.sinopsis;
    Pelicula.fechaestreno=req.body.fechaestreno;
    Pelicula.aniorealizacion=req.body.aniorealizacion;
    Pelicula.director=req.body.director;
    Pelicula.reparto=req.body.reparto;
    Pelicula.duracion=req.body.duracion;
    Pelicula.productora=req.body.productora;
    Pelicula.distribuidora=req.body.distribuidora;
    Pelicula.imgportada=req.body.imgportada;
    Pelicula.created_at=new Date();
    Pelicula.insertar();
    // console.log(req.body);
    // pool.query('INSERT INTO peliculas (idempresa,idsucursal,idpeliculacategoria,titulo,sinopsis,fechaestreno,aniorealizacion,director,reparto,duracion,productora,distribuidora,imgportada) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[
    //     1,1,1,titulo,sinopsis,'2020-01-01',aniorealizacion,director,reparto,duracion,productora,distribuidora,'imagen'
    // ],function(err,results,fields){
    //     console.log(err);
    // })
})
module.exports={addPelicula}