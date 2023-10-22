const express=require("express");
const router=express.Router();
const {addCombo,updateCombo,getCombo,deleteCombo,uploads}=require('../controllers/CombosController');

router.route('/api/combo').post(uploads.any(),addCombo).get(getCombo);
router.route('/api/combo/:id').post(uploads.any(),updateCombo).delete(deleteCombo);

module.exports=router