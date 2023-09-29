const express=require("express");
const router=express.Router();
const {addPelicula}=require('../controllers/PeliculasController');
router.route('/api/pelicula').post(addPelicula);
module.exports=router