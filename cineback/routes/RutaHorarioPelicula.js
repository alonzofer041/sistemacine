const express=require("express");
const router=express.Router();
const {addHorarioPelicula,updateHorarioPelicula,getHorarioPelicula,deleteHorarioPelicula}=require('../controllers/HorariosPeliculaController');

router.route('/api/horariopelicula').post(addHorarioPelicula).get(getHorarioPelicula);
router.route('/api/horariopelicula/:id').post(updateHorarioPelicula).delete(deleteHorarioPelicula);

module.exports=router