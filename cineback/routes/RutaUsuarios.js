const express=require("express");
const router=express.Router();
const {login, addUsuario, updateUsuario, deleteUsuario, getUsuario}=require('../controllers/UsuariosController');

router.route('/api/login').post(login);
router.route('/api/register').post(addUsuario);
router.route('/api/usuario').get(getUsuario);
router.route('/api/usuario/:id').post(updateUsuario).delete(deleteUsuario);

module.exports=router;