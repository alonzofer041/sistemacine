const express=require("express");
const router=express.Router();
const {addProducto,updateProducto,getProducto,deleteProducto,uploads}=require('../controllers/ProductoController');

router.route('/api/producto').post(uploads.any(),addProducto).get(getProducto);
router.route('/api/producto/:id').post(uploads.any(),updateProducto).delete(deleteProducto);

module.exports=router