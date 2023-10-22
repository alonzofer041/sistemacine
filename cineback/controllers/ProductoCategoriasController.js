let ProductoCategoriaClass=require('../models/ProductoCategoria');

//@desc crear producto categoria
//@route POST /api/productocategoria
//@access public
const addProductoCategoria=((req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.idempresa=1;
    ProductoCategoria.idsucursal=1;
    ProductoCategoria.nombre=req.body.nombre;
    ProductoCategoria.created_at=new Date();
    ProductoCategoria.insertar(res);
});

//@desc listar producto categoria
//@route GET /api/productocategoria
//@access public
const getProductoCategoria=((req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.idempresa=1;
    ProductoCategoria.idsucursal=1;
    ProductoCategoria.listar(res);
});

//@desc actualizar producto categoria
//@route POST /api/productocategoria/:id
//@access public
const updateProductoCategoria=((req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.nombre=req.body.nombre;
    ProductoCategoria.idproductocategoria=req.params.id;
    ProductoCategoria.updated_at=new Date();
    ProductoCategoria.actualizar(res);
});

//@desc borrar producto categoria
//@route DELETE /api/productocategoria/:id
//@access public
const deleteProductoCategoria=((req,res)=>{
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.deleted_at=new Date();
    ProductoCategoria.idproductocategoria=req.params.id;
    ProductoCategoria.eliminar(res);
});

module.exports={addProductoCategoria,getProductoCategoria,updateProductoCategoria,deleteProductoCategoria}