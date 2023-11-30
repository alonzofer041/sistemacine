const express=require("express");
const router=express.Router();
const {addSucursal, getSucursal, updateSucursal, deleteSucursal, ActualizarPrecio, Recovery}=require('../controllers/SucursalController');

router.route('/api/sucursal').post(addSucursal).get(getSucursal);
router.route('/api/sucursal/:id').post(updateSucursal).delete(deleteSucursal);
router.route('/api/sucursalprecio').post(ActualizarPrecio);
router.route('/api/sucursalrecovery').get(Recovery);

module.exports=router;