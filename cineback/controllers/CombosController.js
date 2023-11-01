const jwt=require("jsonwebtoken");
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
const addCombo=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Combo=new ComboClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    Combo.idcombo=req.body.idcombo;
    Combo.idempresa=decoded.Usuario.idempresa;
    Combo.idsucursal=decoded.Usuario.idsucursal;
    Combo.nombre=req.body.nombre;
    Combo.valor=req.body.valor;
    Combo.imgcombo=filename;
    Combo.created_at=new Date();
    Combo.fechaestreno=new Date();

    let respuesta=Combo.insertar();
    res.json(respuesta);
})

//@desc listar combo
//@route GET /api/combo
//@access public
const getCombo=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Combo=new ComboClass;
    Combo.idempresa=decoded.Usuario.idempresa;
    Combo.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await Combo.listar();
    res.json(respuesta);
})

//@desc actualizar combo
//@route POST /api/combo/:id
//@access public
const updateCombo=(async (req,res)=>{
    let Combo=new ComboClass;
    Combo.idcombo=req.params.id;
    Combo.idempresa=req.body.empresa;
    Combo.idsucursal=req.body.idsucursal;
    Combo.nombre=req.body.nombre;
    Combo.valor=req.body.valor;
    Combo.imgcombo=filename;
    Combo.updated_at=new Date();
    let respuesta=await Combo.actualizar();
    res.json(respuesta);
})

//@desc borrar combo
//@route DELETE /api/combo/:id
//@access public
const deleteCombo=(async (req,res)=>{
    let Combo=new ComboClass;
    Combo.idcombo=req.params.id;
    Combo.deleted_at=new Date();
    let respuesta=await Combo.eliminar();
    res.json(respuesta);
})

module.exports={addCombo,getCombo,updateCombo,deleteCombo,uploads}