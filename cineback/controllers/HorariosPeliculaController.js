let HorarioPeliculaClass = require("../models/HorarioPelicula");

//@desc crear horario pelicula
//@route POST /api/horariopelicula
//@access public
const addHorarioPelicula=((req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.body.idpelicula;
    HorarioPelicula.idsala=req.body.idsala;
    HorarioPelicula.hora=req.body.hora;
    HorarioPelicula.created_at=new Date();
    HorarioPelicula.insertar(res);
})

//@desc listar horario pelicula
//@route GET /api/horariopelicula
//@access public
const getHorarioPelicula=((req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.query.idpelicula;
    HorarioPelicula.listar(res);
})

//@desc actualizar horario pelicula
//@route POST /api/horariopelicula/:id
//@access public
const updateHorarioPelicula=((req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idsala=req.body.idsala;
    HorarioPelicula.hora=req.body.hora;
    HorarioPelicula.updated_at=new Date();
    HorarioPelicula.idhorariopelicula=req.params.id;
    HorarioPelicula.actualizar(res);
})

//@desc borrar horario pelicula
//@route DELETE /api/horariopelicula/:id
//@access public
const deleteHorarioPelicula=((req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.deleted_at=new Date();
    HorarioPelicula.idhorariopelicula=req.params.id;
    HorarioPelicula.eliminar(res);
})

module.exports={
    addHorarioPelicula,
    getHorarioPelicula,
    updateHorarioPelicula,
    deleteHorarioPelicula
}