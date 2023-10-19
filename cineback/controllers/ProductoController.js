let ProductoClass=require("../models/Producto");
const multer=require('multer');

let filename="";
const storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,__dirname+'/../assets/files/productos');
    },
    filename:function(req,file,callback){
        filename=new Date().getTime()+'_'+file.originalname;
        callback(null,filename);
    }
})
const uploads=multer({storage:storage});

//@desc crear producto
//@route POST /api/producto
//@access public
const addProducto=((req,res)=>{
    let Producto=new ProductoClass;
    // req.body=JSON.stringify(req.body);
    // console.log(req.body);
    // SUBIDA DE ARCHIVO
    uploads.single('files');
    // SUBIDA EN BD
    Producto.idproductocategoria=1;
    Producto.idproveedor=1;
    Producto.idempresa=1;
    Producto.idsucursal=1;
    Producto.nombre=req.body.nombre;
    Producto.valor=req.body.valor;
    Producto.cantidad=req.body.cantidad;
    Producto.imgproducto=filename;
    Producto.created_at=new Date();

    Producto.insertar(res);
})

//@desc listar producto
//@route GET /api/producto
//@access public
const getProducto=((req,res)=>{
    let Producto=new ProductoClass;
    Producto.idproductocategoria=1;
    Producto.idproveedor=1;
    Producto.idempresa=1;
    Producto.idsucursal=1;
    Producto.listar(res);
})

//@desc actualizar producto
//@route POST /api/producto/:id
//@access public
const updateProducto=((req,res)=>{
    let Producto=new ProductoClass;
    uploads.single('files');
    Producto.nombre=req.body.nombre;
    Producto.valor=req.body.valor;
    Producto.cantidad=req.body.cantidad;
    Producto.imgproducto=filename;
    Producto.updated_at=new Date();
    Producto.idproducto=req.params.id;
    Producto.actualizar(res);
})

//@desc borrar producto
//@route DELETE /api/producto/:id
//@access public
const deleteProducto=((req,res)=>{
    let Producto=new ProductoClass;
    Producto.idproducto=req.params.id;
    Producto.deleted_at=new Date();
    Producto.eliminar(res);
})

module.exports={addProducto,getProducto,updateProducto,deleteProducto,uploads}