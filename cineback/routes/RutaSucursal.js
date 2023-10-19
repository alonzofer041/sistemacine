const express=require("express");
const router=express.Router();
const {addSucursal, getSucursal, updateSucursal, deleteSucursal}=require('../controllers/SucursalController');

router.route('/api/sucursal').post(addSucursal).get(getSucursal);
router.route('/api/sucursal/:id').post(updateSucursal).delete(deleteSucursal);

module.exports=router;