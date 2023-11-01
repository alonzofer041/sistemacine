const express=require("express");
const router=express.Router();
const {addEmpresa,updateEmpresa,getEmpresa,deleteEmpresa,RegistroEmail,uploads}=require('../controllers/EmpresasController');

router.route('/api/empresa').post(uploads.any(),addEmpresa).get(getEmpresa);
router.route('/api/empresa/:id').post(uploads.any(),updateEmpresa).delete(deleteEmpresa);
router.route('/api/empresaRegistro').post(RegistroEmail);

module.exports=router