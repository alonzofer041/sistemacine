const jwt=require("jsonwebtoken");
let PeliculaCategoriaClass = require("../models/PeliculaCategoria");
const validator = require("../helpers/validate");

//@desc crear categoria pelicula
//@route POST /api/peliculacategoria
//@access public
const addPeliculaCategoria=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
    };
    const Messages={
        required:{
            string:"El Campo es Requerido"
        }
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        const token=req.headers.authorization
        const decoded=jwt.verify(token,"jwtSecretKey");
        let PeliculaCategoria=new PeliculaCategoriaClass;
        PeliculaCategoria.idempresa=decoded.Usuario.idempresa;
        PeliculaCategoria.idsucursal=decoded.Usuario.idsucursal;
        PeliculaCategoria.nombre=req.body.nombre;
        PeliculaCategoria.created_at=new Date();
        let respuesta=await PeliculaCategoria.insertar();
        res.status(200).send({respuesta:respuesta});
    }
    
})

//@desc listar categoria pelicula
//@route GET /api/peliculacategoria
//@access public
const getPeliculaCategoria=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let PeliculaCategoria=new PeliculaCategoriaClass;
    PeliculaCategoria.idempresa=decoded.Usuario.idempresa;
    PeliculaCategoria.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await PeliculaCategoria.listar();
    res.json(respuesta);
})

//@desc actualizar categoria pelicula
//@route POST /api/peliculacategoria/:id
//@access public
const updatePeliculaCategoria=(async(req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
    };
    const Messages={
        required:{
            string:"El Campo es Requerido"
        }
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let PeliculaCategoria=new PeliculaCategoriaClass;
        PeliculaCategoria.nombre=req.body.nombre;
        PeliculaCategoria.updated_at=new Date();
        PeliculaCategoria.idpeliculacategoria=req.params.id;
        let respuesta=await PeliculaCategoria.actualizar();
        res.status(200).send({respuesta:respuesta});
    }

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