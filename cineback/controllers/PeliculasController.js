const jwt=require("jsonwebtoken");
let PeliculaClass=require("../models/Pelicula");
let HorarioPeliculaClass=require("../models/HorarioPelicula");
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
const addPelicula=(async(req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let Pelicula=new PeliculaClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    Pelicula.idpeliculacategoria=req.body.idpeliculacategoria;
    Pelicula.idempresa=decoded.Usuario.idempresa;
    Pelicula.idsucursal=decoded.Usuario.idsucursal;
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

    let respuesta=await Pelicula.insertar();
    res.json(respuesta);
})

//@desc listar pelicula
//@route GET /api/pelicula
//@access public
const getPelicula=(async (req,res)=>{
    let idempresa=0;
    let idsucursal=0;
    if (req.query.origen=='cliente') {
        idempresa=req.query.idempresa;
        idsucursal=req.query.idsucursal;
    }
    else{
        const token=req.headers.authorization
        const decoded=jwt.verify(token,"jwtSecretKey");
        idempresa=decoded.Usuario.idempresa;
        idsucursal=decoded.Usuario.idsucursal;
    }

    let Pelicula=new PeliculaClass;
    Pelicula.idempresa=idempresa;
    Pelicula.idsucursal=idsucursal;
    let respuesta=await Pelicula.listar();
    res.json(respuesta);
})

//@desc actualizar pelicula
//@route POST /api/pelicula/:id
//@access public
const updatePelicula=(async(req,res)=>{
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
    let respuesta=await Pelicula.actualizar();
    res.json(respuesta);
})

//@desc borrar pelicula
//@route DELETE /api/pelicula/:id
//@access public
const deletePelicula=(async(req,res)=>{
    let Pelicula=new PeliculaClass;
    Pelicula.idpelicula=req.params.id;
    Pelicula.deleted_at=new Date();
    let respuesta=await Pelicula.eliminar();
    res.json(respuesta);
})

//@desc listar peliculas para cartelera
//@route get /api/peliculacarletera
//@access public
const getPeliculaCartelera=(async(req,res)=>{
    let Pelicula=new PeliculaClass;
    let fecha=req.query.fecha;
    Pelicula.idempresa=req.query.idempresa;
    Pelicula.idsucursal=req.query.idsucursal;
    await Pelicula.listar().then((response)=>{
        response.forEach(async (pelicula)=>{
            pelicula.horarios=[];
            let HorarioPelicula=new HorarioPeliculaClass;
            HorarioPelicula.idpelicula=pelicula.idpelicula;
            HorarioPelicula.FechaFiltro=fecha;
            let respuesta=await HorarioPelicula.listarFiltro();
            pelicula.horarios=respuesta;
            // peliculas.push(pelicula);
        });
        setTimeout(() => {
            res.json(response);
        }, 500);
    });
})

module.exports={addPelicula,getPelicula,updatePelicula,deletePelicula,getPeliculaCartelera,uploads}