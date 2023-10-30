const express=require("express");
const router=express.Router();
const {addEmpresa,updateEmpresa,getEmpresa,deleteEmpresa,RegistroEmail}=require('../controllers/EmpresasController');

router.route('/api/empresa').post(addEmpresa).get(getEmpresa);
router.route('/api/empresa/:id').post(updateEmpresa).delete(deleteEmpresa);
router.route('/api/empresaRegistro').post(RegistroEmail);

module.exports=router