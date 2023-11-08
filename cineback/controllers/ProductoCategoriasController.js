const jwt=require("jsonwebtoken");
let ProductoCategoriaClass=require('../models/ProductoCategoria');
const validator = require("../helpers/validate");

//@desc crear producto categoria
//@route POST /api/productocategoria
//@access public
const addProductoCategoria=(async(req,res)=>{
    const ValidationRule={
        "nombre":"required|string"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        const token=req.headers.authorization
        const decoded=jwt.verify(token,"jwtSecretKey");
        let ProductoCategoria=new ProductoCategoriaClass;
        ProductoCategoria.idempresa=decoded.Usuario.idempresa;
        ProductoCategoria.idsucursal=decoded.Usuario.idsucursal;
        ProductoCategoria.nombre=req.body.nombre;
        ProductoCategoria.created_at=new Date();
        let respuesta=await ProductoCategoria.insertar();
        res.status(200).send({respuesta:respuesta});
    }
});

//@desc listar producto categoria
//@route GET /api/productocategoria
//@access public
const getProductoCategoria=(async (req,res)=>{
    const token=req.headers.authorization
    const decoded=jwt.verify(token,"jwtSecretKey");
    let ProductoCategoria=new ProductoCategoriaClass;
    ProductoCategoria.idempresa=decoded.Usuario.idempresa;
    ProductoCategoria.idsucursal=decoded.Usuario.idsucursal;
    let respuesta=await ProductoCategoria.listar(res);
    res.json(respuesta);
});

//@desc actualizar producto categoria
//@route POST /api/productocategoria/:id
//@access public
const updateProductoCategoria=(async(req,res)=>{
    const ValidationRule={
        "nombre":"required|string"
    };
    const Messages={
        required:"El campo es requerido",
        string:"El campo es requerido"
    }
    let estatus=false;
    await validator(req.body,ValidationRule,Messages,(err,status)=>{
        if (!status) {
            res.status(412).send({errors:err});
        }
        estatus=status
    })
    if (estatus) {
        let ProductoCategoria=new ProductoCategoriaClass;
        ProductoCategoria.nombre=req.body.nombre;
        ProductoCategoria.idproductocategoria=req.params.id;
        ProductoCategoria.updated_at=new Date();
        let respuesta=await ProductoCategoria.actualizar();
        res.status(200).send({respuesta:respuesta});
    }
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