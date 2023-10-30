let ProductoCategoriaClass=require('../models/ProductoCategoria');

//@desc crear producto categoria
//@route POST /api/productocategoria
//@access public
const addProductoCategoria=(async(req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.idempresa=1;
    ProductoCategoria.idsucursal=1;
    ProductoCategoria.nombre=req.body.nombre;
    ProductoCategoria.created_at=new Date();
    let respuesta=await ProductoCategoria.insertar();
    res.json(respuesta);
});

//@desc listar producto categoria
//@route GET /api/productocategoria
//@access public
const getProductoCategoria=(async (req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.idempresa=1;
    ProductoCategoria.idsucursal=1;
    let respuesta=await ProductoCategoria.listar(res);
    res.json(respuesta);
});

//@desc actualizar producto categoria
//@route POST /api/productocategoria/:id
//@access public
const updateProductoCategoria=(async(req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.nombre=req.body.nombre;
    ProductoCategoria.idproductocategoria=req.params.id;
    ProductoCategoria.updated_at=new Date();
    let respuesta=await ProductoCategoria.actualizar();
    res.json(respuesta);
});

//@desc borrar producto categoria
//@route DELETE /api/productocategoria/:id
//@access public
const deleteProductoCategoria=(async(req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.deleted_at=new Date();
    ProductoCategoria.idproductocategoria=req.params.id;
    let respuesta=await ProductoCategoria.eliminar();
    res.json(respuesta);
});

module.exports={addProductoCategoria,getProductoCategoria,updateProductoCategoria,deleteProductoCategoria}