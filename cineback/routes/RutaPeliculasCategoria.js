const express=require("express");
const router=express.Router();
const {addPeliculaCategoria, getPeliculaCategoria, updatePeliculaCategoria, deletePeliculaCategoria}=require('../controllers/PeliculasCategoriaController');

router.route('/api/peliculacategoria').post(addPeliculaCategoria).get(getPeliculaCategoria);
router.route('/api/peliculacategoria/:id').post(updatePeliculaCategoria).delete(deletePeliculaCategoria);
module.exports=router;