const express=require("express");
const router=express.Router();
const {addProductoCategoria,updateProductoCategoria,getProductoCategoria,deleteProductoCategoria,uploads}=require('../controllers/ProductoCategoriasController');

router.route('/api/productocategoria').post(addProductoCategoria).get(getProductoCategoria);
router.route('/api/productocategoria/:id').post(updateProductoCategoria).delete(deleteProductoCategoria);

module.exports=router