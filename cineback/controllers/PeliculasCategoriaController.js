let PeliculaCategoriaClass = require("../models/PeliculaCategoria");

//@desc crear categoria pelicula
//@route POST /api/peliculacategoria
//@access public
const addPeliculaCategoria=((req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.idempresa=1;
    PeliculaCategoria.idsucursal=1;
    PeliculaCategoria.nombre=req.body.nombre;
    PeliculaCategoria.created_at=new Date();
    PeliculaCategoria.insertar(res);
})

//@desc listar categoria pelicula
//@route GET /api/peliculacategoria
//@access public
const getPeliculaCategoria=((req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.idempresa=1;
    PeliculaCategoria.idsucursal=1;
    PeliculaCategoria.listar(res);
})

//@desc actualizar categoria pelicula
//@route POST /api/peliculacategoria/:id
//@access public
const updatePeliculaCategoria=((req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.nombre=req.body.nombre;
    PeliculaCategoria.updated_at=new Date();
    PeliculaCategoria.idpeliculacategoria=req.params.id;
    PeliculaCategoria.actualizar(res);
})

//@desc borrar categoria pelicula
//@route DELETE /api/peliculacategoria/:id
//@access public
const deletePeliculaCategoria=((req,res)=>{
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.deleted_at=new Date();
    PeliculaCategoria.idpeliculacategoria=req.params.id;
    PeliculaCategoria.eliminar(res);
})

module.exports={
    addPeliculaCategoria,
    getPeliculaCategoria,
    updatePeliculaCategoria,
    deletePeliculaCategoria
}