const express=require("express");
const router=express.Router();
const {addSalas, getSalas, updateSalas, deleteSalas}=require('../controllers/SalasController');

router.route('/api/salas').post(addSalas).get(getSalas);
router.route('/api/salas/:id').post(updateSalas).delete(deleteSalas);

module.exports=router;