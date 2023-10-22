const express=require("express");
const router=express.Router();
const {addComboDetalle,updateComboDetalle,getComboDetalle,deleteComboDetalle}=require('../controllers/CombosDetalleController');
// const {addComboDetalle,updateComboDetalle,getComboDetalle,deleteComboDetalle=require('../controllers/CombosDetalleController');

router.route('/api/combodetalle').post(addComboDetalle).get(getComboDetalle);
// router.route('/api/ComboDetalle').post(addComboDetalle).get(getComboDetalle);
router.route('api/combodetalle/:id').post(updateComboDetalle).delete(deleteComboDetalle);

module.exports=router