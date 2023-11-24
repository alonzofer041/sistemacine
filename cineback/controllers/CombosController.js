const jwt=require("jsonwebtoken");
let ComboClass=require("../models/Combo");
let ComboDetalleClass=require("../models/ComboDetalle");
const multer=require('multer');
const validator = require("../helpers/validate");

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
    const ValidationRule={
        "nombre":"required|string",
        "valor":"required|numeric",
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
        let Combo=new ComboClass;
        uploads.single('files');
        Combo.idcombo=req.body.idcombo;
        Combo.idempresa=decoded.Usuario.idempresa;
        Combo.idsucursal=decoded.Usuario.idsucursal;
        Combo.nombre=req.body.nombre;
        Combo.valor=req.body.valor;
        Combo.imgcombo=filename;
        Combo.created_at=new Date();
        let respuesta=Combo.insertar();
        res.status(200).send({respuesta:respuesta});
    }
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
    const ValidationRule={
        "nombre":"required|string",
        "valor":"required|numeric",
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
        let Combo=new ComboClass;
        Combo.idcombo=req.params.id;
        Combo.idempresa=req.body.empresa;
        Combo.idsucursal=req.body.idsucursal;
        Combo.nombre=req.body.nombre;
        Combo.valor=req.body.valor;
        Combo.imgcombo=filename;
        Combo.updated_at=new Date();
        let respuesta=await Combo.actualizar();
        res.status(200).send({respuesta:respuesta});
    }
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

//@desc obtener combo con lista productos
//@route GET /api/combosxproductos
//@access public
const getCombosxProductos=(async(req,res)=>{
    let Combo=new ComboClass;
    Combo.idempresa=req.query.idempresa;
    Combo.idsucursal=req.query.idsucursal;
    await Combo.listar().then((response)=>{
        response.forEach(async(combo)=>{
            let combodetalle=new ComboDetalleClass;
            combodetalle.idcombo=combo.idcombo;
            combo.productos=await combodetalle.listar();
        });
        setTimeout(() => {
            res.json(response);
        }, 500);
    });
    // res.json(respuesta);
})
module.exports={addCombo,getCombo,updateCombo,deleteCombo,getCombosxProductos,uploads}