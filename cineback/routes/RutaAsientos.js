const express=require("express");
const router=express.Router();
const {addAsientos, getAsientos, updateAsientos, deleteAsientos}=require('../controllers/AsientosController');

router.route('/api/asientos').post(addAsientos).get(getAsientos);
router.route('/api/asientos/:id').post(updateAsientos).delete(deleteAsientos);

module.exports=router;