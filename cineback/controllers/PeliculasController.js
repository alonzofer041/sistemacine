let PeliculaClass=require("../models/Pelicula");
const multer=require('multer');

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/peliculas');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
})
const uploads=multer({storage:storage});

//@desc crear pelicula
//@route POST /api/pelicula
//@access public
const addPelicula=((req,res)=>{
    let Pelicula=new PeliculaClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    Pelicula.idpeliculacategoria=req.body.idpeliculacategoria;
    Pelicula.idempresa=1;
    Pelicula.idsucursal=1;
    Pelicula.titulo=req.body.titulo;
    Pelicula.sinopsis=req.body.sinopsis;
    Pelicula.fechaestreno=req.body.fechaestreno;
    Pelicula.aniorealizacion=req.body.aniorealizacion;
    Pelicula.director=req.body.director;
    Pelicula.reparto=req.body.reparto;
    Pelicula.duracion=req.body.duracion;
    Pelicula.productora=req.body.productora;
    Pelicula.distribuidora=req.body.distribuidora;
    Pelicula.imgportada=filename;
    Pelicula.created_at=new Date();
    Pelicula.fechaestreno=new Date();

    Pelicula.insertar(res);
})

//@desc listar pelicula
//@route GET /api/pelicula
//@access public
const getPelicula=((req,res)=>{
    let Pelicula=new PeliculaClass;
    Pelicula.idempresa=1;
    Pelicula.idsucursal=1;
    Pelicula.listar(res);
})

//@desc actualizar pelicula
//@route POST /api/pelicula/:id
//@access public
const updatePelicula=((req,res)=>{
    let Pelicula=new PeliculaClass;
    Pelicula.idpelicula=req.params.id;
    Pelicula.idpeliculacategoria=req.body.idpeliculacategoria;
    Pelicula.titulo=req.body.titulo;
    Pelicula.sinopsis=req.body.sinopsis;
    Pelicula.fechaestreno=req.body.fechaestreno;
    Pelicula.aniorealizacion=req.body.aniorealizacion;
    Pelicula.director=req.body.director;
    Pelicula.reparto=req.body.reparto;
    Pelicula.duracion=req.body.duracion;
    Pelicula.productora=req.body.productora;
    Pelicula.distribuidora=req.body.distribuidora;
    Pelicula.imgportada=req.body.imgportada;
    Pelicula.updated_at=new Date();
    Pelicula.actualizar(res);
})

//@desc borrar pelicula
//@route DELETE /api/pelicula/:id
//@access public
const deletePelicula=((req,res)=>{
    let Pelicula=new PeliculaClass;
    Pelicula.idpelicula=req.params.id;
    Pelicula.deleted_at=new Date();
    Pelicula.eliminar(res);
})

module.exports={addPelicula,getPelicula,updatePelicula,deletePelicula,uploads}