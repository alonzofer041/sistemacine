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
const addBanner=((req,res)=>{
    let Banner=new BannerClass;
    uploads.single('files');
    Banner.idempresa=1;
    Banner.idsucursal=1;
    Banner.imgbanner=filename;
    Banner.created_at=new Date();
    Banner.insertar(res);
});

//@desc listar banner
//@route GET /api/banner
//@access public
const getBanner=((req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    console.log(decoded.idempresa);
    let Banner=new BannerClass;
    // Banner.idempresa=decoded.Usuario.idempresa;
    // Banner.idsucursal=decoded.Usuario.idsucursal;
    // Banner.listar(res);
});

//@desc actualizar banner
//@route POST /api/banner/:id
//@access public
const updateBanner=((req,res)=>{
    let Banner=new BannerClass;
    uploads.single('files');
    Banner.imgbanner=filename;
    Banner.idbanner=req.params.id;
    Banner.updated_at=new Date();
    Banner.actualizar(res);
});

//@desc borrar banner
//@route DELETE /api/banner/:id
//@access public
const deleteBanner=((req,res)=>{
    let Banner=new BannerClass;
    Banner.deleted_at=new Date();
    Banner.idbanner=req.params.id;
    Banner.eliminar(res);
})

module.exports={addBanner,getBanner,updateBanner,deleteBanner,uploads}