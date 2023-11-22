let OrdenEntradaClass=require("../models/OrdenEntrada");
const jwt=require("jsonwebtoken");
//@desc obtener datos de contadores
//@route GET /api/dashboardcontadores
//@access public
const Contadores=(async(req,res)=>{
    let Contadores=[];
    const Token=req.headers.authorization;
    const decoded=jwt.verify(Token,"jwtSecretKey");
    let OrdenEntrada=new OrdenEntradaClass;
    OrdenEntrada.idempresa=decoded.Usuario.idempresa;
    OrdenEntrada.idsucursal=decoded.Usuario.idsucursal;
    OrdenEntrada.MesFiltro=new Date().getMonth()+1;
    let MontoTotalEntradas=await OrdenEntrada.TotalMontoEntradasVendidas();
    res.status(200).send(
            {
                MontoTotalEntradas:MontoTotalEntradas
            }
        );
})

//@desc obtener datos de contadores
//@route GET /api/dashboardticketsgenero
//@access public
const TicketsGenero=(async(req,res)=>{
    let labels=[];
    let values=[];
    let colors=[];
    const Token=req.headers.authorization;
    const decoded=jwt.verify(Token,"jwtSecretKey");
    let OrdenEntrada=new OrdenEntradaClass;
    OrdenEntrada.idempresa=decoded.Usuario.idempresa;
    OrdenEntrada.idsucursal=decoded.Usuario.idsucursal;
    await OrdenEntrada.TotalEntradasGenero().then((response)=>{
        response.forEach(async(element)=>{
            let digit1=Math.random()*255;
            let digit2=Math.random()*255;
            let digit3=Math.random()*255;
            labels.push(element.nombre);
            values.push(element.cantidadentradas);
            colors.push('rgba('+digit1+','+digit2+','+digit3+',1)');
        })
        res.status(200).send({labels:labels,values:values,colors:colors});
    });
})

//@desc obtener datos de tickets vendidos al mes
//@route GET /api/dashboardticketsmes
//@access public
const TicketsMes=(async(req,res)=>{
    let values=[];
    let colors=[];
    let meses=[1,2,3,4,5,6,7,8,9,10,11,12];
    const Token=req.headers.authorization;
    const decoded=jwt.verify(Token,"jwtSecretKey");
    let OrdenEntrada=new OrdenEntradaClass;
    OrdenEntrada.idempresa=decoded.Usuario.idempresa;
    OrdenEntrada.idsucursal=decoded.Usuario.idsucursal;
    OrdenEntrada.AnioFiltro=new Date().getFullYear();
    await OrdenEntrada.TotalTicketsMes().then((response)=>{
        meses.forEach((mes)=>{
            let index=response.findIndex((element)=>mes==element.mes);
            if (index==-1){
                values.push(0);
            }
            else{
                values.push(Number(response[index].cantidadentradas));
            }
        })
        res.status(200).send({values:values});
    })
})

//@desc obtener datos de tickets vendidos al mes
//@route GET /api/dashboardmontoticketsmes
//@access public
const TicketsMontoMes=(async(req,res)=>{
    let values=[];
    let colors=[];
    let meses=[1,2,3,4,5,6,7,8,9,10,11,12];
    const Token=req.headers.authorization;
    const decoded=jwt.verify(Token,"jwtSecretKey");
    let OrdenEntrada=new OrdenEntradaClass;
    OrdenEntrada.idempresa=decoded.Usuario.idempresa;
    OrdenEntrada.idsucursal=decoded.Usuario.idsucursal;
    OrdenEntrada.AnioFiltro=new Date().getFullYear();
    await OrdenEntrada.TotalMontoEntradasMes().then((response)=>{
        meses.forEach((mes)=>{
            let index=response.findIndex((element)=>mes==element.mes);
            if (index==-1){
                values.push(0);
            }
            else{
                values.push(Number(response[index].preciototal));
            }
        })
        res.status(200).send({values:values});
    })
})
module.exports={Contadores,TicketsGenero,TicketsMes,TicketsMontoMes}