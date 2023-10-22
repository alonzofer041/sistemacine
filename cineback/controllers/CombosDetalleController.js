let ComboDetalleClass=require("../models/ComboDetalle");


//@desc crear combodetalle
//@route POST /api/combodetalle
//@access public
const addComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    // SUBIDA EN BD
    // ComboDetalle.idcombodetalle=req.body.idcombodetalle;
    ComboDetalle.idcombo=1;
    ComboDetalle.idproducto=1;
    ComboDetalle.cantidad=req.body.cantidad;
    ComboDetalle.valor=req.body.valor;
    ComboDetalle.nombre=req.body.nombre;
    ComboDetalle.created_at=new Date();

    ComboDetalle.insertar(res);
})

//@desc listar combodetalle
//@route GET /api/combodetalle
//@access public
const getComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombo=req.query.idcombo;
    ComboDetalle.listar(res);
})

//@desc actualizar combodetalle
//@route POST /api/combodetalle/:id
//@access public
const updateComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombodetalle=req.params.id;
    ComboDetalle.idcombo=req.body.idcombo;
    ComboDetalle.idproducto=req.body.idproducto;
    ComboDetalle.cantidad=req.body.cantidad;
    ComboDetalle.valor=req.body.valor;
    ComboDetalle.nombre=req.body.nombre;
    ComboDetalle.updated_at=new Date();
    ComboDetalle.actualizar(res);
})

//@desc borrar combodetalle
//@route DELETE /api/combodetalle/:id
//@access public
const deleteComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombo=req.params.id;
    ComboDetalle.deleted_at=new Date();
    ComboDetalle.eliminar(res);
})

module.exports={addComboDetalle,getComboDetalle,updateComboDetalle,deleteComboDetalle}