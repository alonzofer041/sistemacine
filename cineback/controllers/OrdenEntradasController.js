let OrdenEntradaClass=require("../models/OrdenEntrada");
let HorarioxAsientoClass=require("../models/HorarioxAsiento");

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
//@desc crear orden de entrada
//@route POST /api/ordenentrada
//@access public
const addOrdenEntrada=(async(req,res)=>{
    let OrdenEntrada=new OrdenEntradaClass;
    OrdenEntrada.idempresa=req.body.idempresa;
    OrdenEntrada.idsucursal=req.body.idsucursal;
    OrdenEntrada.idsala=req.body.idsala;
    OrdenEntrada.idpelicula=req.body.idpelicula;
    OrdenEntrada.nombrecliente=req.body.nombrecliente;
    OrdenEntrada.cantidadentradas=req.body.cantidadentradas;
    OrdenEntrada.correocliente=req.body.correocliente;
    OrdenEntrada.estatus=req.body.estatus;
    OrdenEntrada.preciototal=req.body.preciototal;
    OrdenEntrada.created_at=new Date();
    let respuesta=await OrdenEntrada.insertar();
    let asientos=req.body.asientos;
    asientos.forEach(async(asiento) => {
        let HorarioxAsiento=new HorarioxAsientoClass;
        HorarioxAsiento.idhorario=req.body.idhorario;
        HorarioxAsiento.idasiento=asiento.idasiento;
        await HorarioxAsiento.insertar();
    });
    res.json(respuesta);
})
module.exports={addOrdenEntrada,uploads}