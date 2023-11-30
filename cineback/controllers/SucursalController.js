const jwt=require("jsonwebtoken");
let SucursalClass = require("../models/Sucursal");
const validator = require("../helpers/validate");

//@desc crear sucursal
//@route POST /api/sucursal
//@access public
const addSucursal=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "direccion":"required|string",
        "telefono":"required|numeric|digits:10",
        "email":"required|email",
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser nunérico",
        digits:"Ingrese un número de teléfono válido",
        email:"Ingrese un correo electrónico válido"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let Sucursal=new SucursalClass;
        Sucursal.idempresa=req.body.idempresa;
        Sucursal.nombre=req.body.nombre;
        Sucursal.direccion=req.body.direccion;
        Sucursal.telefono=req.body.telefono;
        Sucursal.email=req.body.email;
        Sucursal.created_at=new Date();
        let respuesta=await Sucursal.insertar();
        res.status(200).send({respuesta:respuesta}); 
    }
})

//@desc listar sucursal
//@route GET /api/sucursal
//@access public
const getSucursal=(async (req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.idempresa=req.query.idempresa;
    let respuesta=await Sucursal.listar();
    res.json(respuesta);
})

//@desc actualizar sucursal
//@route POST /api/sucursal/:id
//@access public
const updateSucursal=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "direccion":"required|string",
        "telefono":"required|numeric|digits:10",
        "email":"required|email",
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser nunérico",
        digits:"Ingrese un número de teléfono válido",
        email:"Ingrese un correo electrónico válido"
    }
    let estatus=false;

    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let Sucursal=new SucursalClass;
        Sucursal.nombre=req.body.nombre;
        Sucursal.direccion=req.body.direccion;
        Sucursal.telefono=req.body.telefono;
        Sucursal.email=req.body.email;
        Sucursal.updated_at=new Date();
        Sucursal.idsucursal=req.params.id;
        let respuesta=await Sucursal.actualizar();
        res.status(200).send({respuesta:respuesta}); 
    }
})

//@desc borrar sucursal
//@route DELETE /api/sucursal/:id
//@access public
const deleteSucursal=(async (req,res)=>{
    let Sucursal=new SucursalClass;
    Sucursal.deleted_at=new Date();
    Sucursal.idsucursal=req.params.id;
    let respuesta=await Sucursal.eliminar();
    res.json(respuesta);
})


//@desc cambiar precio boleto
//@route POST /api/sucursalprecio/:id
//@access public
const ActualizarPrecio=(async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Sucursal=new SucursalClass;
    Sucursal.idsucursal=decoded.Usuario.idsucursal;
    Sucursal.precioentrada=req.body.precioentrada;
    let respuesta=await Sucursal.ActualizarEntrada();
    res.json(respuesta);
})

//@desc recuperar sucursal
//@route GET /api/sucursalrecovery
//@access public
const Recovery=(async(req,res)=>{
    let idsucursal=0;
    if (req.query.origen=='cliente') {
        idsucursal=req.query.idsucursal;
    }
    else{
        const token=req.headers.authorization
        const decoded=jwt.verify(token,"jwtSecretKey");
        idsucursal=decoded.Usuario.idsucursal;
    }
    let Sucursal=new SucursalClass;
    Sucursal.idsucursal=idsucursal;
    let respuesta=await Sucursal.Recovery();
    res.json(respuesta);
})
module.exports={
    addSucursal,
    getSucursal,
    updateSucursal,
    deleteSucursal,
    ActualizarPrecio,
    Recovery
}