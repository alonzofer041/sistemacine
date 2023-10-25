const jwt=require("jsonwebtoken");
let UsuarioClass=require("../models/Usuario");

//@desc login
//@route POST /api/login
//@access public
const login=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.correo=req.body.correo;
    Usuario.password=req.body.password;
    let Respuesta=await Usuario.login(res);
    console.log(Respuesta);
    const token=jwt.sign({Usuario:Respuesta[0]},"jwtSecretKey",{expiresIn:300});
    res.json({Login:true,token});
});

//@desc registrar usuario
//@route POST /api/register
//@access public
const addUsuario=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.nombre=req.body.nombre;
    Usuario.correo=req.body.correo;
    Usuario.password=req.body.password;
    Usuario.rol='admin';
    Usuario.created_at=new Date();
    let respuesta=await Usuario.insertar();
    res.json(respuesta);
})

//@desc listar usuarios
//@route GET /api/usuario
//@access public
const getUsuario=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.idempresa=req.query.idempresa;
    Usuario.idsucursal=req.query.idsucursal;
    let respuesta=await Usuario.listar();
    res.json(respuesta);
})

//@desc actualizar usuario
//@route POST /api/usuario/:id
//@access public
const updateUsuario=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.idusuario=req.params.id;
    Usuario.nombre=req.body.nombre;
    Usuario.correo=req.body.correo;
    Usuario.password=req.body.password;
    Usuario.updated_at=new Date();
    let respuesta=await Usuario.actualizar();
    res.json(respuesta);
})

//@desc eliminar usuario
//@route DELETE /api/usuario/:id
//@access public
const deleteUsuario=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.idusuario=req.params.id;
    Usuario.deleted_at_at=new Date();
    let respuesta=await Usuario.eliminar();
    res.json(respuesta);
})

module.exports={login, addUsuario, getUsuario, deleteUsuario, updateUsuario}