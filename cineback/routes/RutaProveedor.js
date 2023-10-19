const express=require("express");
const router=express.Router();
const {addProveedor, getProveedor, updateProveedor, deleteProveedor}=require('../controllers/ProveedorController');

router.route('/api/proveedor').post(addProveedor).get(getProveedor);
router.route('/api/proveedor/:id').post(updateProveedor).delete(deleteProveedor);

module.exports=router;