const express=require("express");
const router=express.Router();
const {addHorarioPelicula,updateHorarioPelicula,getHorarioPelicula,deleteHorarioPelicula, getListaSalasDisponibles, getHorarios}=require('../controllers/HorariosPeliculaController');

router.route('/api/horariopelicula').post(addHorarioPelicula).get(getHorarioPelicula);
router.route('/api/horariopelicula/:id').post(updateHorarioPelicula).delete(deleteHorarioPelicula);
router.route('/api/salasdisponibles/:id').get(getListaSalasDisponibles);
router.route('/api/horariosdisponibles').get(getHorarios);
module.exports=router