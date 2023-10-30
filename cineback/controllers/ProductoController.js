const validator = require("../helpers/validate");
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
const addProducto=(async (req,res)=>{
    const ValidationRule={
        "nombre":"required|string",
        "valor":"required|numeric",
        "cantidad":"required|numeric"
    }
    let estatus=await validator(req.body,ValidationRule,{},(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        return status;
    });
    if (estatus) {
        let Producto=new ProductoClass;
        // req.body=JSON.stringify(req.body);
        // console.log(req.body);
        // SUBIDA DE ARCHIVO
        uploads.single('files');
        // SUBIDA EN BD
        Producto.idproductocategoria=req.body.idproductocategoria;
        Producto.idproveedor=req.body.idproveedor;
        Producto.idempresa=1;
        Producto.idsucursal=1;
        Producto.nombre=req.body.nombre;
        Producto.valor=req.body.valor;
        Producto.cantidad=req.body.cantidad;
        Producto.imgproducto=filename;
        Producto.created_at=new Date();
        
        let respuesta=await Producto.insertar(res);
        res.json(respuesta);
    }
    
})

//@desc listar producto
//@route GET /api/producto
//@access public
const getProducto=(async (req,res)=>{
    let Producto=new ProductoClass;
    Producto.idempresa=1;
    Producto.idsucursal=1;
    let respuesta=await Producto.listar();
    res.json(respuesta);
})

//@desc actualizar producto
//@route POST /api/producto/:id
//@access public
const updateProducto=(async(req,res)=>{
    let Producto=new ProductoClass;
    uploads.single('files');
    Producto.idproductocategoria=req.body.idproductocategoria;
    Producto.idproveedor=req.body.idproveedor;
    Producto.nombre=req.body.nombre;
    Producto.valor=req.body.valor;
    Producto.cantidad=req.body.cantidad;
    Producto.imgproducto=filename;
    Producto.updated_at=new Date();
    Producto.idproducto=req.params.id;
    let respuesta=await Producto.actualizar();
    res.json(respuesta);
})

//@desc borrar producto
//@route DELETE /api/producto/:id
//@access public
const deleteProducto=(async(req,res)=>{
    let Producto=new ProductoClass;
    Producto.idproducto=req.params.id;
    Producto.deleted_at=new Date();
    let respuesta=await Producto.eliminar();
    res.json(respuesta);
})

module.exports={addProducto,getProducto,updateProducto,deleteProducto,uploads}