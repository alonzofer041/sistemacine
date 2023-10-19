let AsientosClass = require("../models/Asientos");

//@desc crear asientos
//@route POST /api/asientos
//@access public
const addAsientos=((req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.idsala=req.body.idsala;
    Asientos.nombre=req.body.nombre;
    Asientos.fila=req.body.fila;
    Asientos.created_at=new Date();
    Asientos.insertar(res);
})

//@desc listar asientos
//@route GET /api/asientos
//@access public
const getAsientos=((req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.idsala=req.query.idsala;
    Asientos.listar(res);
})

//@desc actualizar asientos
//@route POST /api/asientos/:id
//@access public
const updateAsientos=((req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.nombre=req.body.nombre;
    Asientos.fila=req.body.fila;
    Asientos.updated_at=new Date();
    Asientos.idasiento=req.params.id;
    Asientos.actualizar(res);
})

//@desc borrar asientos
//@route DELETE /api/asientos/:id
//@access public
const deleteAsientos=((req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.deleted_at=new Date();
    Asientos.idasiento=req.params.id;
    Asientos.eliminar(res);
})

module.exports={
    addAsientos,
    getAsientos,
    updateAsientos,
    deleteAsientos
}