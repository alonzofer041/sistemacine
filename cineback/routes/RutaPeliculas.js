const express=require("express");
const router=express.Router();
const {addPelicula,updatePelicula,getPelicula,deletePelicula,uploads, getPeliculaCartelera}=require('../controllers/PeliculasController');

router.route('/api/pelicula').post(uploads.any(),addPelicula).get(getPelicula);
router.route('api/pelicula/:id').post(updatePelicula).delete(deletePelicula);
router.route('/api/peliculacartelera').get(getPeliculaCartelera);

module.exports=router