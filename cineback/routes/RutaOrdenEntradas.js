const express=require("express");
const router=express.Router();
const {addOrdenEntrada, pagoEmail,uploads}=require("../controllers/OrdenEntradasController");


router.route('/api/ordenentrada').post(uploads.any(),addOrdenEntrada);
router.route('/api/pagoentradaemail').post(pagoEmail);
module.exports=router;