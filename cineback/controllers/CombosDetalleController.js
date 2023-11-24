let ComboDetalleClass=require("../models/ComboDetalle");
const validator = require("../helpers/validate");

//@desc crear combodetalle
//@route POST /api/combodetalle
//@access public
const addComboDetalle=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "valor":"required|numeric|min:1",
        "cantidad":"required|numeric|min:1"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser un número",
        min:"El valor no puede ser 0"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let ComboDetalle=new ComboDetalleClass;
        ComboDetalle.idcombo=req.body.idcombo;
        ComboDetalle.idproducto=req.body.idproducto;
        ComboDetalle.cantidad=req.body.cantidad;
        ComboDetalle.valor=req.body.valor;
        ComboDetalle.nombre=req.body.nombre;
        ComboDetalle.created_at=new Date();
        let respuesta=await ComboDetalle.insertar();
        res.json(respuesta);
    }
})

//@desc listar combodetalle
//@route GET /api/combodetalle
//@access public
const getComboDetalle=(async (req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombo=req.query.idcombo;
    let respuesta=await ComboDetalle.listar();
    res.json(respuesta);
})

//@desc actualizar combodetalle
//@route POST /api/combodetalle/:id
//@access public
const updateComboDetalle=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "valor":"required|numeric|min:1",
        "cantidad":"required|numeric|min:1"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        numeric:"El valor debe ser un número",
        min:"El valor no puede ser 0"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let ComboDetalle=new ComboDetalleClass;
        ComboDetalle.idcombodetalle=req.params.id;
        ComboDetalle.idcombo=req.body.idcombo;
        ComboDetalle.idproducto=req.body.idproducto;
        ComboDetalle.cantidad=req.body.cantidad;
        ComboDetalle.valor=req.body.valor;
        ComboDetalle.nombre=req.body.nombre;
        ComboDetalle.updated_at=new Date();
        let respuesta=ComboDetalle.actualizar();
        res.status(200).send({respuesta:respuesta});
    }
})

//@desc borrar combodetalle
//@route DELETE /api/combodetalle/:id
//@access public
const deleteComboDetalle=(async (req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombo=req.params.id;
    ComboDetalle.deleted_at=new Date();
    let respuesta=ComboDetalle.eliminar();
    res.json(respuesta);
})

module.exports={addComboDetalle,getComboDetalle,updateComboDetalle,deleteComboDetalle}