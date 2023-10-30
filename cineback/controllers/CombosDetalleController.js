let ComboDetalleClass=require("../models/ComboDetalle");


//@desc crear combodetalle
//@route POST /api/combodetalle
//@access public
const addComboDetalle=(async (req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    // SUBIDA EN BD
    // ComboDetalle.idcombodetalle=req.body.idcombodetalle;
    ComboDetalle.idcombo=1;
    ComboDetalle.idproducto=1;
    ComboDetalle.cantidad=req.body.cantidad;
    ComboDetalle.valor=req.body.valor;
    ComboDetalle.nombre=req.body.nombre;
    ComboDetalle.created_at=new Date();

    let respuesta=await ComboDetalle.insertar();
    res.json(respuesta);
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
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombodetalle=req.params.id;
    ComboDetalle.idcombo=req.body.idcombo;
    ComboDetalle.idproducto=req.body.idproducto;
    ComboDetalle.cantidad=req.body.cantidad;
    ComboDetalle.valor=req.body.valor;
    ComboDetalle.nombre=req.body.nombre;
    ComboDetalle.updated_at=new Date();
    let respuesta=ComboDetalle.actualizar();
    res.json(respuesta);
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