let SalasClass = require("../models/Salas");

//@desc crear sala
//@route POST /api/salas
//@access public
const addSalas=((req,res)=>{
    let Salas=new SalasClass;
    Salas.idempresa=1;
    Salas.idsucursal=1;
    Salas.nombre=req.body.nombre;
    Salas.ubicacion=req.body.ubicacion;
    Salas.created_at=new Date();
    Salas.insertar(res);
})

//@desc listar salas
//@route GET /api/salas
//@access public
const getSalas=((req,res)=>{
    let Salas=new SalasClass;
    Salas.idempresa=1;
    Salas.idsucursal=1;
    Salas.listar(res);
})

//@desc actualizar salas
//@route POST /api/salas/:id
//@access public
const updateSalas=((req,res)=>{
    let Salas=new SalasClass;
    Salas.nombre=req.body.nombre;
    Salas.ubicacion=req.body.ubicacion;
    Salas.updated_at=new Date();
    Salas.idsala=req.params.id;
    Salas.actualizar(res);
})

//@desc borrar salas
//@route DELETE /api/salas/:id
//@access public
const deleteSalas=((req,res)=>{
    let Salas=new SalasClass;
    Salas.deleted_at=new Date();
    Salas.idsala=req.params.id;
    Salas.eliminar(res);
})

module.exports={
    addSalas,
    getSalas,
    updateSalas,
    deleteSalas
}