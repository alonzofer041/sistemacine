const express=require("express");
const router=express.Router();
const {addOrdenProducto, pagoEmail}=require('../controllers/OrdenProductosController');
router.route('/api/ordenproducto').post(addOrdenProducto);
router.route('/api/pagoproductoemail').post(pagoEmail);
module.exports=router; 