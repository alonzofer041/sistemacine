const express=require("express");
const router=express.Router();
const {addCombo,updateCombo,getCombo,deleteCombo,uploads}=require('../controllers/CombosController');
// const {addCombo,updateCombo,getCombo,deleteCombo}=require('../controllers/CombosController');

router.route('/api/combo').post(uploads.any(),addCombo).get(getCombo);
// router.route('/api/Combo').post(addCombo).get(getCombo);
router.route('api/combo/:id').post(updateCombo).delete(deleteCombo);

module.exports=router