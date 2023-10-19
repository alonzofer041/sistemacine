let ComboDetalleClass=require("../models/ComboDetalle");
const multer=require('multer');

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/combosdetalle');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
})
const uploads=multer({storage:storage});

//@desc crear combodetalle
//@route POST /api/combodetalle
//@access public
const addComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    ComboDetalle.idcombodetalle=req.body.idcombodetalle;
    ComboDetalle.idcombo=1;
    ComboDetalle.idproducto=1;
    ComboDetalle.cantidad=req.body.cantidad;
    ComboDetalle.valor=req.body.valor;
    ComboDetalle.nombre=req.body.nombre;
    ComboDetalle.imgcombo=filename;
    ComboDetalle.created_at=new Date();
    ComboDetalle.fechaestreno=new Date();

    Combo.insertar(res);
})

//@desc listar combodetalle
//@route GET /api/combodetalle
//@access public
const getComboDetalle=((req,res)=>{
    let ComboDetalle=new ComboDetalleClass;
    ComboDetalle.idcombo=1;
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
    ComboDetalle.imgcombo=filename;
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

module.exports={addComboDetalle,getComboDetalle,updateComboDetalle,deleteComboDetalle,uploads}