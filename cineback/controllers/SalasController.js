const jwt=require("jsonwebtoken");
let SalasClass = require("../models/Salas");
const validator = require("../helpers/validate");

//@desc crear sala
//@route POST /api/salas
//@access public
const addSalas=(async(req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "ubicacion":"required|string",
        "numfilas":"required|numeric",
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser numérico"
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
        let Salas=new SalasClass;
        Salas.idempresa=decoded.Usuario.idempresa;
        Salas.idsucursal=decoded.Usuario.idsucursal;
        Salas.nombre=req.body.nombre;
        Salas.ubicacion=req.body.ubicacion;
        Salas.numfilas=req.body.numfilas;
        Salas.created_at=new Date();
        let respuesta=await Salas.insertar();
        res.status(200).send({respuesta:respuesta});
    }

})

//@desc listar salas
//@route GET /api/salas
//@access public
const getSalas=(async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Salas=new SalasClass;
    Salas.idempresa=decoded.Usuario.idempresa;
    Salas.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await Salas.listar();
    res.json(respuesta);
})

//@desc actualizar salas
//@route POST /api/salas/:id
//@access public
const updateSalas=(async(req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "ubicacion":"required|string",
        "numfilas":"required|numeric",
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser numérico"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let Salas=new SalasClass;
        Salas.nombre=req.body.nombre;
        Salas.ubicacion=req.body.ubicacion;
        Salas.numfilas=req.body.numfilas;
        Salas.updated_at=new Date();
        Salas.idsala=req.params.id;
        let respuesta=await Salas.actualizar();
        res.status(200).send({respuesta:respuesta});
    }

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