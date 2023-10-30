let SalasClass = require("../models/Salas");

//@desc crear sala
//@route POST /api/salas
//@access public
const addSalas=(async(req,res)=>{
    let Salas=new SalasClass;
    Salas.idempresa=1;
    Salas.idsucursal=1;
    Salas.nombre=req.body.nombre;
    Salas.ubicacion=req.body.ubicacion;
    Salas.numfilas=req.body.numfilas;
    Salas.created_at=new Date();
    let respuesta=await Salas.insertar();
    res.json(respuesta);
})

//@desc listar salas
//@route GET /api/salas
//@access public
const getSalas=(async(req,res)=>{
    let Salas=new SalasClass;
    Salas.idempresa=1;
    Salas.idsucursal=1;
    let respuesta=await Salas.listar();
    res.json(respuesta);
})

//@desc actualizar salas
//@route POST /api/salas/:id
//@access public
const updateSalas=(async(req,res)=>{
    let Salas=new SalasClass;
    Salas.nombre=req.body.nombre;
    Salas.ubicacion=req.body.ubicacion;
    Salas.numfilas=req.body.numfilas;
    Salas.updated_at=new Date();
    Salas.idsala=req.params.id;
    let respuesta=await Salas.actualizar();
    res.json(respuesta);
})

//@desc borrar salas
//@route DELETE /api/salas/:id
//@access public
const deleteSalas=(async(req,res)=>{
    let Salas=new SalasClass;
    Salas.deleted_at=new Date();
    Salas.idsala=req.params.id;
    let respuesta=await Salas.eliminar();
    res.json(respuesta);
})

module.exports={
    addSalas,
    getSalas,
    updateSalas,
    deleteSalas
}