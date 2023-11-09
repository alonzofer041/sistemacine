const express=require("express");
const router=express.Router();
const {addPelicula,updatePelicula,getPelicula,deletePelicula,uploads, getPeliculaCartelera, getPeliculasEstreno}=require('../controllers/PeliculasController');

router.route('/api/pelicula').post(uploads.any(),addPelicula).get(getPelicula);
router.route('/api/pelicula/:id').post(uploads.any(),updatePelicula).delete(deletePelicula);
router.route('/api/peliculacartelera').get(getPeliculaCartelera);
router.route('/api/ultimosestrenos').get(getPeliculasEstreno);

module.exports=router