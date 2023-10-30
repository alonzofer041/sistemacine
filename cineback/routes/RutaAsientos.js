const express=require("express");
const router=express.Router();
const {addAsientos, getAsientos, updateAsientos, deleteAsientos, getAsientosSala}=require('../controllers/AsientosController');

router.route('/api/asientos').post(addAsientos).get(getAsientos);
router.route('/api/asientos/:id').post(updateAsientos).delete(deleteAsientos);
router.route('/api/asientosSala').get(getAsientosSala);

module.exports=router;