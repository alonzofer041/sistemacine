const pool = require('../db');
//@desc crear pelicula
//@route POST /api/pelicula
//@access public
const addPelicula=((req,res)=>{
    const titulo=req.body.titulo;
    const sinopsis=req.body.sinopsis;
    const aniorealizacion=req.body.aniorealizacion;
    const director=req.body.director;
    const reparto=req.body.reparto;
    const duracion=req.body.duracion;
    const productora=req.body.productora;
    const distribuidora=req.body.distribuidora;
    console.log(req.body);
    pool.query('INSERT INTO peliculas (idempresa,idsucursal,idpeliculacategoria,titulo,sinopsis,fechaestreno,aniorealizacion,director,reparto,duracion,productora,distribuidora,imgportada) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',[
        1,1,1,titulo,sinopsis,'2020-01-01',aniorealizacion,director,reparto,duracion,productora,distribuidora,'imagen'
    ],function(err,results,fields){
        console.log(err);
    })
})
module.exports={addPelicula}