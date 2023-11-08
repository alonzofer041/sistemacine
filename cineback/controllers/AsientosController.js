let AsientosClass = require("../models/Asientos");
const validator = require("../helpers/validate");

//@desc crear asientos
//@route POST /api/asientos
//@access public
const addAsientos=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let Asientos=new AsientosClass;
        Asientos.idsala=req.body.idsala;
        Asientos.nombre=req.body.nombre;
        Asientos.fila=req.body.fila;
        Asientos.created_at=new Date();
        let respuesta=await Asientos.insertar();
        res.status(200).send({respuesta:respuesta});
    }
});

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
    const ValidationRule={
        "nombre":"required|string"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let Asientos=new AsientosClass;
        Asientos.nombre=req.body.nombre;
        Asientos.fila=req.body.fila;
        Asientos.updated_at=new Date();
        Asientos.idasiento=req.params.id;
        let respuesta=await Asientos.actualizar();
        res.status(200).send({respuesta:respuesta});
    }
});

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