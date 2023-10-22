const express=require("express");
const router=express.Router();
const {login}=require('../controllers/UsuariosController');

router.route('/api/login').post(login);

module.exports=router;