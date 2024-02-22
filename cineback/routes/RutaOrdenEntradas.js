const express=require("express");
const router=express.Router();
const {addOrdenEntrada, pagoEmail,uploads, Recovery, updateEstatusEntrada}=require("../controllers/OrdenEntradasController");

router.route('/api/ordenentradaestado').post(updateEstatusEntrada);
router.route('/api/ordenentrada').get(Recovery).post(uploads.any(),addOrdenEntrada);
router.route('/api/pagoentradaemail').post(pagoEmail);
module.exports=router;