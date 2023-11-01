const express=require("express");
const router=express.Router();
const {addOrdenEntrada,uploads}=require("../controllers/OrdenEntradasController");

router.route('/api/ordenentrada').post(uploads.any(),addOrdenEntrada);
module.exports=router;