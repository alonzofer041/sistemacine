let ProveedorClass=require("../models/Proveedor");
const jwt=require("jsonwebtoken");
const validator = require("../helpers/validate");

//@desc crear proveedor
//@route POST /api/proveedor
//@access public
const addProveedor=(async(req,res)=>{
    const ValidationRule={
        "nombrecomercial":"required|string",
        "razonsocial":"required|string",
        "email":"required|email",
        "contacto":"required|string",
        "telefono":"required|numeric|digits:10",
        "direccion":"required|string",
        "estado":"required|string",
        "ciudad":"required|string",
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
        const token=req.headers.authorization
        const decoded=jwt.verify(token,"jwtSecretKey");
        let Proveedor=new ProveedorClass;
        Proveedor.idempresa=decoded.Usuario.idempresa;
        Proveedor.idsucursal=decoded.Usuario.idsucursal;
        Proveedor.nombrecomercial=req.body.nombrecomercial;
        Proveedor.razonsocial=req.body.razonsocial;
        Proveedor.fechaestreno=req.body.fechaestreno;
        Proveedor.email=req.body.email;
        Proveedor.contacto=req.body.contacto;
        Proveedor.telefono=req.body.telefono;
        Proveedor.direccion=req.body.direccion;
        Proveedor.estado=req.body.estado;
        Proveedor.ciudad=req.body.ciudad;
        Proveedor.created_at=new Date();
        let respuesta=await Proveedor.insertar();
        res.status(200).send({respuesta:respuesta}); 
    }
})

//@desc listar proveedor
//@route GET /api/proveedor
//@access public
const getProveedor=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Proveedor=new ProveedorClass;
    Proveedor.idempresa=decoded.Usuario.idempresa;
    Proveedor.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await Proveedor.listar(res);
    res.json(respuesta);
})

//@desc actualizar proveedor
//@route POST /api/proveedor/:id
//@access public
const updateProveedor=(async(req,res)=>{
    const ValidationRule={
        "nombrecomercial":"required|string",
        "razonsocial":"required|string",
        "email":"required|email",
        "contacto":"required|string",
        "telefono":"required|numeric|digits:10",
        "direccion":"required|string",
        "estado":"required|string",
        "ciudad":"required|string",
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
        let Proveedor=new ProveedorClass;
        Proveedor.nombrecomercial=req.body.nombrecomercial;
        Proveedor.razonsocial=req.body.razonsocial;
        Proveedor.fechaestreno=req.body.fechaestreno;
        Proveedor.email=req.body.email;
        Proveedor.contacto=req.body.contacto;
        Proveedor.telefono=req.body.telefono;
        Proveedor.direccion=req.body.direccion;
        Proveedor.estado=req.body.estado;
        Proveedor.ciudad=req.body.ciudad;
        Proveedor.updated_at=new Date();
        Proveedor.idproveedor=req.params.id;
        let respuesta=await Proveedor.actualizar();
        res.status(200).send({respuesta:respuesta}); 
    }
})

//@desc borrar proveedor
//@route DELETE /api/proveedor/:id
//@access public
const deleteProveedor=(async(req,res)=>{
    let Proveedor=new ProveedorClass;
    Proveedor.idproveedor=req.params.id;
    Proveedor.deleted_at=new Date();
    let respuesta=await Proveedor.eliminar();
    res.json(respuesta);
})

module.exports={addProveedor,getProveedor,updateProveedor,deleteProveedor}