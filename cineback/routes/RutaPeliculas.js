const express=require("express");
const router=express.Router();
const {addPelicula,updatePelicula,getPelicula,deletePelicula,uploads}=require('../controllers/PeliculasController');
// const {addPelicula,updatePelicula,getPelicula,deletePelicula}=require('../controllers/PeliculasController');

router.route('/api/pelicula').post(uploads.any(),addPelicula).get(getPelicula);
// router.route('/api/pelicula').post(addPelicula).get(getPelicula);
router.route('api/pelicula/:id').post(updatePelicula).delete(deletePelicula);

module.exports=router