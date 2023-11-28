let OrdenProductoClass=require("../models/OrdenProducto");
const validator=require("../helpers/validate");
let OrdenProductoDetalleClass=require("../models/OrdenProductoDetalle");
let ProductoClass=require("../models/Producto");
const transporter=require("../mailqrproducto");
const QRCode = require('qrcode');
const Stripe=require("stripe");

//@desc crear producto
//@route POST /api/ordenproducto
//@access public
const addOrdenProducto=(async (req,res)=>{
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
            amount:(Number(req.body.importe)+(Number(req.body.importe)*0.16).toFixed(2))*100,
            currency:"MXN",
            description:"Venta de productos",
            payment_method:req.body.idpago,
            confirm:true,
            payment_method_types:["card"],
            return_url:"http://127.0.0.1:5173/cine/realizado"
        });
        let OrdenProducto=new OrdenProductoClass;
        OrdenProducto.idempresa=req.body.idempresa;
        OrdenProducto.idsucursal=req.body.idsucursal;
        OrdenProducto.folio='ORD1';
        OrdenProducto.nombrecliente=req.body.nombrecliente;
        OrdenProducto.importe=Number(req.body.importe);
        OrdenProducto.totaliva=Number(req.body.importe)+(Number(req.body.importe)*0.16);
        OrdenProducto.correocliente=req.body.correocliente;
        OrdenProducto.estatus="pagada";
        OrdenProducto.created_at=new Date();
        let respuesta=await OrdenProducto.insertar();
        res.status(200).send({respuesta:respuesta});

        if (req.body.ordenproductosdetalle.length>0) {
            let DetallesOrden=req.body.ordenproductosdetalle;
            DetallesOrden.forEach(async (DetalleOrden) => {
                let OrdenProductoDetalle=new OrdenProductoDetalleClass;
                OrdenProductoDetalle.idproducto=DetalleOrden.idproducto;
                OrdenProductoDetalle.idordenproducto=respuesta.insertId;
                OrdenProductoDetalle.idcombo=0;
                OrdenProductoDetalle.cantidad=DetalleOrden.cantidad_default;
                OrdenProductoDetalle.preciounit=DetalleOrden.valor;
                OrdenProductoDetalle.valortotal=Number(DetalleOrden.valor)*Number(DetalleOrden.cantidad_default);
                await OrdenProductoDetalle.insertar();

                let Producto=new ProductoClass;
                Producto.cantidad=DetalleOrden.cantidad-DetalleOrden.cantidad_default;
                Producto.updated_at=new Date();
                Producto.idproducto=DetalleOrden.idproducto;
                await Producto.ActualizarCantidad();
            });   
        }
        if (req.body.combos.length>0) {
            let combos=req.body.combos;
            combos.forEach(async(combo)=>{
                let OrdenProductoDetalle=new OrdenProductoDetalleClass;
                OrdenProductoDetalle.idproducto=0;
                OrdenProductoDetalle.idordenproducto=respuesta.insertId;
                OrdenProductoDetalle.idcombo=combo.idcombo;
                OrdenProductoDetalle.cantidad=combo.cantidad_default;
                OrdenProductoDetalle.preciounit=combo.valor;
                OrdenProductoDetalle.valortotal=Number(combo.valor)*Number(combo.cantidad_default);
                let respuestadetalle=await OrdenProductoDetalle.insertar();

                // RESTAR CANTIDAD DE PRODUCTO
                combo.productos.forEach(async(Producto) => {
                    let ProductoObj=new ProductoClass;
                    ProductoObj.idproducto=Producto.idproducto;
                    let [ProductoResult]=await ProductoObj.GetCantidad();
                    // console.log(ProductoResult);
                    let cantidad=ProductoResult.cantidad;
                    let nuevacantidad=Number(cantidad)-(Number(combo.cantidad_default)*Number(Producto.cantidad));
                    ProductoObj.cantidad=nuevacantidad;
                    ProductoObj.updated_at=new Date();
                    ProductoObj.ActualizarCantidad();
                });
                
            });
        }
        // console.log(req.body.ordenproductosdetalle);
    }
    
})
//@desc correo de pago
//@route POST /api/pagoproductoemail
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
        let folio='ORD1';
        let nombrecliente=req.body.nombrecliente;
        let idempresa=req.body.idempresa;
        let idsucursal=req.body.idsucursal;
        let correocliente=req.body.correocliente;
        let importe=Number(req.body.importe);
        let iva=Number(req.body.importe)+(Number(req.body.importe)*0.16);
        const qrData = {
            nombrecliente: nombrecliente,
            folio:folio,
            importe:importe,
            iva:iva,
        };
        const qrImage = await generateQRCode(qrData);



        //let productos=req.body.productos;
        //let destinatario=req.body.destinatario;
        let url="127.0.0.1:5173/pago/"+idempresa+"/"+idsucursal;
        await transporter.sendMail({
            from:"cineflashmid@gmail.com",
            to:correocliente,
            subject:"Compra de productos",
            template:"PagoProducto",
            context:{
                folio:folio,
                nombrecliente:nombrecliente,
                importe:importe,
                //productos:productos,
                iva:iva,
                url:url,
                qrImage: qrImage
            }
        });
        res.status(200).send({message:"ok"});
    }
})

const generateQRCode = async (data) => {
    try {
        const qrImage = await QRCode.toDataURL(JSON.stringify(data));
        return `<img src="${qrImage}" alt="QR Code" style="max-width: 100%;">`;
    } catch (error) {
        console.error('Error generando el código QR', error);
        throw error;
    }
};
module.exports={addOrdenProducto,pagoEmail}