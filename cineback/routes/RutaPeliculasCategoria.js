const express=require("express");
const router=express.Router();
const {addPeliculaCategoria}=require('../controllers/PeliculasCategoriaController');

router.route('/api/peliculacategoria').post(addPeliculaCategoria);