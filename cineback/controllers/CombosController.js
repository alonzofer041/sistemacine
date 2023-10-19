let ComboClass=require("../models/Combo");
const multer=require('multer');

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/combos');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
})
const uploads=multer({storage:storage});

//@desc crear combo
//@route POST /api/combo
//@access public
const addCombo=((req,res)=>{
    let Combo=new ComboClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    Combo.idcombo=req.body.idcombo;
    Combo.idempresa=1;
    Combo.idsucursal=1;
    Combo.nombre=req.body.nombre;
    Combo.valor=req.body.valor;
    Combo.imgcombo=filename;
    Combo.created_at=new Date();
    Combo.fechaestreno=new Date();

    Combo.insertar(res);
})

//@desc listar combo
//@route GET /api/combo
//@access public
const getCombo=((req,res)=>{
    let Combo=new ComboClass;
    Combo.idempresa=1;
    Combo.idsucursal=1;
    Combo.listar(res);
})

//@desc actualizar combo
//@route POST /api/combo/:id
//@access public
const updateCombo=((req,res)=>{
    let Combo=new ComboClass;
    Combo.idcombo=req.params.id;
    Combo.idempresa=req.body.empresa;
    Combo.idsucursal=req.body.idsucursal;
    Combo.nombre=req.body.nombre;
    Combo.valor=req.body.valor;
    Combo.imgcombo=filename;
    Combo.updated_at=new Date();
    Combo.actualizar(res);
})

//@desc borrar combo
//@route DELETE /api/combo/:id
//@access public
const deleteCombo=((req,res)=>{
    let Combo=new ComboClass;
    Combo.idcombo=req.params.id;
    Combo.deleted_at=new Date();
    Combo.eliminar(res);
})

module.exports={addCombo,getCombo,updateCombo,deleteCombo,uploads}