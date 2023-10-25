let OrdenProductoClass=require("../models/OrdenProducto");

//@desc crear producto
//@route POST /api/ordenproducto
//@access public
const addOrdenProducto=(async (req,res)=>{
    let OrdenProducto=new OrdenProductoClass;
    OrdenProducto.idempresa=1;
    OrdenProducto.idsucursal=1;
    OrdenProducto.folio='ORD1';
    OrdenProducto.nombrecliente=req.body.nombrecliente;
    OrdenProducto.importe=Number(req.body.importe);
    OrdenProducto.totaliva=Number(req.body.importe)+(Number(req.body.importe)*0.16);
    OrdenProducto.correocliente=req.body.correocliente;
    OrdenProducto.estatus="pagada";
    OrdenProducto.created_at=new Date();
    console.log(req.body.ordenproductosdetalle);
    let respuesta=await OrdenProducto.insertar();
})
module.exports={addOrdenProducto}