let AsientosClass = require("../models/Asientos");

//@desc crear asientos
//@route POST /api/asientos
//@access public
const addAsientos=(async (req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.idsala=req.body.idsala;
    Asientos.nombre=req.body.nombre;
    Asientos.fila=req.body.fila;
    Asientos.created_at=new Date();
    let respuesta=await Asientos.insertar();
    res.json(respuesta);
})

//@desc listar asientos
//@route GET /api/asientos
//@access public
const getAsientos=(async (req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.idsala=req.query.idsala;
    let respuesta=await Asientos.listar();
    res.json(respuesta);
})

//@desc actualizar asientos
//@route POST /api/asientos/:id
//@access public
const updateAsientos=(async (req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.nombre=req.body.nombre;
    Asientos.fila=req.body.fila;
    Asientos.updated_at=new Date();
    Asientos.idasiento=req.params.id;
    let respuesta=await Asientos.actualizar();
    res.json(respuesta);
})

//@desc borrar asientos
//@route DELETE /api/asientos/:id
//@access public
const deleteAsientos=(async (req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.deleted_at=new Date();
    Asientos.idasiento=req.params.id;
    let respuesta=await Asientos.eliminar(res);
    res.json(respuesta);
})

//@desc listar asientos x sala
//@route GET /api/asientosSala
//@access public
const getAsientosSala=(async(req,res)=>{
    let Asientos=new AsientosClass;
    Asientos.idsala=req.query.idsala;
    let asientosrow=await Asientos.ListarAsientosEntrada();
    res.json(asientosrow);
})

module.exports={
    addAsientos,
    getAsientos,
    updateAsientos,
    deleteAsientos,
    getAsientosSala
}