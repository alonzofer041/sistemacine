let EmpresaClass=require("../models/Empresa");
const transporter=require("../mail");
const multer=require('multer');
const validator = require("../helpers/validate");

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/empresas');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
})
const uploads=multer({storage:storage});


//@desc crear empresa
//@route POST /api/empresa
//@access public
const addEmpresa=(async (req,res)=>{
    const ValidationRule={
        "nombrecomercial":"required|string",
        "razonsocial":"required|string",
        "rfc":"required|string|digits:12",
        "direccion":"required|string",
        "telefono":"required|numeric|digits:10",
        "email":"required|email",
        "estado":"required|string",
        "ciudad":"required|string"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        email:"Ingresa un correo electrónico válido",
        digits:"Ingresa un :attribute válido",
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
        uploads.single('files');
        let Empresa=new EmpresaClass;
        Empresa.nombrecomercial=req.body.nombrecomercial;
        Empresa.razonsocial=req.body.razonsocial;
        Empresa.rfc=req.body.rfc;
        Empresa.direccion=req.body.direccion;
        Empresa.telefono=req.body.telefono;
        Empresa.email=req.body.email;
        Empresa.estado=req.body.estado;
        Empresa.ciudad=req.body.ciudad;
        Empresa.imgempresa=filename;
        Empresa.created_at=new Date();
        let respuesta=await Empresa.insertar();
        res.status(200).send({respuesta:respuesta});
    }
});

//@desc listar empresa
//@route GET /api/empresa
//@access public
const getEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    let rows=await Empresa.listar();
    res.json(rows);
});

//@desc actualizar empresa
//@route POST /api/empresa/:id
//@access public
const updateEmpresa=(async (req,res)=>{
    const ValidationRule={
        "nombrecomercial":"required|string",
        "razonsocial":"required|string",
        "rfc":"required|string|digits:12",
        "direccion":"required|string",
        "telefono":"required|numeric|digits:10",
        "email":"required|email",
        "estado":"required|string",
        "ciudad":"required|string",
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido",
        email:"Ingresa un correo electrónico válido",
        digits:"Ingresa un número teléfonico válido",
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
        let Empresa=new EmpresaClass;
        uploads.single('files');
        Empresa.nombrecomercial=req.body.nombrecomercial;
        Empresa.razonsocial=req.body.razonsocial;
        Empresa.rfc=req.body.rfc;
        Empresa.direccion=req.body.direccion;
        Empresa.telefono=req.body.telefono;
        Empresa.email=req.body.email;
        Empresa.estado=req.body.estado;
        Empresa.ciudad=req.body.ciudad;
        Empresa.imgempresa=filename;
        Empresa.updated_at=new Date();
        Empresa.idempresa=req.params.id;
        let respuesta=await Empresa.actualizar();
        res.status(200).send({respuesta:respuesta});
    }
});

//@desc borrar empresa
//@route DELETE /api/empresa/:id
//@access public
const deleteEmpresa=(async (req,res)=>{
    let Empresa=new EmpresaClass;
    Empresa.deleted_at=new Date();
    Empresa.idempresa=req.params.id;
    let respuesta=await Empresa.eliminar(res);
    res.json(respuesta);
})

//@desc correo de registro
//@route POST /api/empresaRegistro
//@access public
const RegistroEmail=(async (req,res)=>{
    let nombreempresa=req.body.nombre;
    let nombresucursal=req.body.sucursal;
    let idempresa=req.body.idempresa;
    let idsucursal=req.body.idsucursal;
    let email=req.body.email;
    let destinatario=req.body.destinatario;
    let url="127.0.0.1:5173/registro/"+idempresa+"/"+idsucursal;
    await transporter.sendMail({
        from:"cineflashmid@gmail.com",
        to:email,
        subject:"Registro de usuario",
        template:"Registro",
        context:{
            nombre:destinatario,
            nombrecine:nombreempresa,
            nombresucursal:nombresucursal,
            url:url
        }
    });
    res.json({message:"ok"});
})

module.exports={addEmpresa,getEmpresa,updateEmpresa,deleteEmpresa,RegistroEmail,uploads}