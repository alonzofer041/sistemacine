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

module.exports={login}