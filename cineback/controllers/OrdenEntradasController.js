let OrdenEntradaClass=require("../models/OrdenEntrada");
let HorarioxAsientoClass=require("../models/HorarioxAsiento");
let PeliculaClass=require("../models/Pelicula");
const transporter=require("../mailqrentrada");
const validator=require("../helpers/validate");
const Stripe=require("stripe");

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
    const ValidationRule={
        "nombrecliente":"required|string",
        "correocliente":"required|string",
    };
    const Messages={
        required:{
            string:"El Campo es Requerido"
        }
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus){
        const stripe=new Stripe("sk_test_xZewoUrJvoMVFL9eo7TwUTej001yK0CtiJ");
        const payment=await stripe.paymentIntents.create({
            amount:req.body.preciototal*100,
            currency:"MXN",
            description:"Entrada para la película "+req.body.idpelicula,
            payment_method:req.body.IdPago,
            payment_method_types:["card"],
            confirm:true,
            return_url:"http://127.0.0.1:5173/cine/realizado"
        });
        let OrdenEntrada=new OrdenEntradaClass;
        OrdenEntrada.idempresa=req.body.idempresa;
        OrdenEntrada.idsucursal=req.body.idsucursal;
        OrdenEntrada.idsala=req.body.idsala;
        OrdenEntrada.idpelicula=req.body.idpelicula;
        OrdenEntrada.nombrecliente=req.body.nombrecliente;
        OrdenEntrada.cantidadentradas=Number(req.body.cantidadentradas);
        OrdenEntrada.correocliente=req.body.correocliente;
        OrdenEntrada.estatus=req.body.estatus;
        OrdenEntrada.preciototal=req.body.preciototal;
        OrdenEntrada.created_at=new Date();

        let respuesta=await OrdenEntrada.insertar();
        res.status(200).send({respuesta:respuesta});
        let asientos=req.body.asientos;
        asientos.forEach(async(asiento) => {
            let HorarioxAsiento=new HorarioxAsientoClass;
            HorarioxAsiento.idhorario=req.body.idhorario;
            HorarioxAsiento.idasiento=asiento.idasiento;
            await HorarioxAsiento.insertar();
        });
    }
    
})

//@desc correo de pago
//@route POST /api/pagoentradaemail
//@access public
const pagoEmail=(async (req,res)=>{
    const ValidationRule={
        "nombrecliente":"required|string",
        "correocliente":"required|string",
    };
    const Messages={
        required:{
            string:"El Campo es Requerido"
        }
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus){
        let nombrecliente=req.body.nombrecliente;
        let idempresa=req.body.idempresa;
        let idsucursal=req.body.idsucursal;
        let correocliente=req.body.correocliente;
        let preciototal=req.body.preciototal;
        let cantidadentradas=Number(req.body.cantidadentradas);
        let titulo=req.body.titulo;
        let nombreasiento=req.body.nombreasiento;
        let hora=req.body.hora;
        let nombresala=req.body.nombresala;
        //let destinatario=req.body.destinatario;
        let url="127.0.0.1:5173/pagoentrada/"+idempresa+"/"+idsucursal;
        await transporter.sendMail({
            from:"cineflashmid@gmail.com",
            to:correocliente,
            subject:"Compra de entadras",
            template:"PagoEntrada",
            context:{
                nombrecliente:nombrecliente,
                pagototal:preciototal,
                NumEntradasSeleccionadas:cantidadentradas,
                pelicula:titulo,
                asiento:nombreasiento,
                hora:hora,
                sala:nombresala,
                url:url
            }
        });
        res.status(200).send({message:"ok"});
    }
}) 
module.exports={addOrdenEntrada, pagoEmail, uploads}