const jwt=require("jsonwebtoken");
let UsuarioClass=require("../models/Usuario");

//@desc login
//@route POST /api/login
//@access public
const login=(async (req,res)=>{
    let Usuario=new UsuarioClass;
    Usuario.idsucursal=1;
    Usuario.idempresa=1;
    Usuario.correo=req.body.correo;
    Usuario.password=req.body.password;
    let Respuesta=await Usuario.login(res);
    console.log(Respuesta);
    // let id=Respuesta.idusuario;
    const token=jwt.sign({idempresa:Respuesta[0].idempresa,idsucursal:Respuesta[0].idsucursal},"jwtSecretKey",{expiresIn:300});
    res.json({Login:true,token});
});

module.exports={login}