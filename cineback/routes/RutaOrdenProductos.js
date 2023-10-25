const express=require("express");
const router=express.Router();
const {addOrdenProducto}=require('../controllers/OrdenProductosController');
router.route('/api/ordenproducto').post(addOrdenProducto);
module.exports=router; 