const jwt=require("jsonwebtoken");
let BannerClass=require('../models/Banner');
const multer=require('multer');

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/banners');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
});
const uploads=multer({storage:storage});

//@desc crear banner
//@route POST /api/banner
//@access public
const addBanner=(async (req,res)=>{
    let Banner=new BannerClass;
    uploads.single('files');
    Banner.idempresa=1;
    Banner.idsucursal=1;
    Banner.imgbanner=filename;
    Banner.created_at=new Date();
    let respuesta=await Banner.insertar(res);
    res.json(respuesta);
});

//@desc listar banner
//@route GET /api/banner
//@access public
const getBanner=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Banner=new BannerClass;
    Banner.idempresa=decoded.Usuario.idempresa;
    Banner.idsucursal=decoded.Usuario.idsucursal;
    let rows=await Banner.listar();
    res.json(rows);
});

//@desc actualizar banner
//@route POST /api/banner/:id
//@access public
const updateBanner=(async (req,res)=>{
    let Banner=new BannerClass;
    uploads.single('files');
    Banner.imgbanner=filename;
    Banner.idbanner=req.params.id;
    Banner.updated_at=new Date();
    let respuesta=await Banner.actualizar();
    res.json(respuesta);
});

//@desc borrar banner
//@route DELETE /api/banner/:id
//@access public
const deleteBanner=(async(req,res)=>{
    let Banner=new BannerClass;
    Banner.deleted_at=new Date();
    Banner.idbanner=req.params.id;
    let respuesta=await Banner.eliminar();
    res.json(respuesta);
})

module.exports={addBanner,getBanner,updateBanner,deleteBanner,uploads}