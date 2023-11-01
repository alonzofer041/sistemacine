let OrdenProductoClass=require("../models/OrdenProducto");
let OrdenProductoDetalleClass=require("../models/OrdenProductoDetalle");

//@desc crear producto
//@route POST /api/ordenproducto
//@access public
const addOrdenProducto=(async (req,res)=>{
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

    let DetallesOrden=req.body.ordenproductosdetalle;
    DetallesOrden.forEach(async (DetalleOrden) => {
        let OrdenProductoDetalle=new OrdenProductoDetalleClass;
        OrdenProductoDetalle.idproducto=DetalleOrden.idproducto;
        OrdenProductoDetalle.idordenproducto=respuesta.insertId;
        OrdenProductoDetalle.idcombo=0;
        OrdenProductoDetalle.cantidad=DetalleOrden.cantidad_default;
        OrdenProductoDetalle.preciounit=DetalleOrden.valor;
        OrdenProductoDetalle.valortotal=Number(DetalleOrden.valor)*Number(DetalleOrden.cantidad_default);
        let respuestadetalle=await OrdenProductoDetalle.insertar();
    });
    // console.log(req.body.ordenproductosdetalle);

    res.json(respuesta);
})
module.exports={addOrdenProducto}