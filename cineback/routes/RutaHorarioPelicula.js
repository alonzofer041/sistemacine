const express=require("express");
const router=express.Router();
const {addHorarioPelicula,updateHorarioPelicula,getHorarioPelicula,deleteHorarioPelicula, getListaSalasDisponibles, getHorarios, getAsientosOcupados}=require('../controllers/HorariosPeliculaController');

router.route('/api/horariopelicula').post(addHorarioPelicula).get(getHorarioPelicula);
router.route('/api/horariopelicula/:id').post(updateHorarioPelicula).delete(deleteHorarioPelicula);
router.route('/api/salasdisponibles/:id').get(getListaSalasDisponibles);
router.route('/api/horariosdisponibles').get(getHorarios);
router.route('/api/asientosocupados').get(getAsientosOcupados);
module.exports=router