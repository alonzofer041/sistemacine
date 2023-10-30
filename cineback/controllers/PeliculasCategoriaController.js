let PeliculaCategoriaClass = require("../models/PeliculaCategoria");

//@desc crear categoria pelicula
//@route POST /api/peliculacategoria
//@access public
const addPeliculaCategoria=(async (req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.idempresa=1;
    PeliculaCategoria.idsucursal=1;
    PeliculaCategoria.nombre=req.body.nombre;
    PeliculaCategoria.created_at=new Date();
    let respuesta=await PeliculaCategoria.insertar();
    res.json(respuesta);
})

//@desc listar categoria pelicula
//@route GET /api/peliculacategoria
//@access public
const getPeliculaCategoria=(async (req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.idempresa=1;
    PeliculaCategoria.idsucursal=1;
    let respuesta=await PeliculaCategoria.listar();
    res.json(respuesta);
})

//@desc actualizar categoria pelicula
//@route POST /api/peliculacategoria/:id
//@access public
const updatePeliculaCategoria=(async(req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.nombre=req.body.nombre;
    PeliculaCategoria.updated_at=new Date();
    PeliculaCategoria.idpeliculacategoria=req.params.id;
    let respuesta=await PeliculaCategoria.actualizar();
    res.json(respuesta);
})

//@desc borrar categoria pelicula
//@route DELETE /api/peliculacategoria/:id
//@access public
const deletePeliculaCategoria=(async (req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.deleted_at=new Date();
    PeliculaCategoria.idpeliculacategoria=req.params.id;
    let respuesta=PeliculaCategoria.eliminar();
    res.json(respuesta);
})

module.exports={
    addPeliculaCategoria,
    getPeliculaCategoria,
    updatePeliculaCategoria,
    deletePeliculaCategoria
}