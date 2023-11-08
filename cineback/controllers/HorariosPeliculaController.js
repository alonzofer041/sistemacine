let HorarioPeliculaClass = require("../models/HorarioPelicula");
let HorarioxAsientoClass=require("../models/HorarioxAsiento");

//@desc crear horario pelicula
//@route POST /api/horariopelicula
//@access public
const addHorarioPelicula=(async (req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.body.idpelicula;
    HorarioPelicula.idsala=req.body.idsala;
    HorarioPelicula.hora=req.body.hora;
    HorarioPelicula.fecha=req.body.fecha;
    HorarioPelicula.created_at=new Date();
    let respuesta=await HorarioPelicula.insertar();
    res.json(respuesta);
})

//@desc listar horario pelicula
//@route GET /api/horariopelicula
//@access public
const getHorarioPelicula=(async (req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.query.idpelicula;
    let respuesta=await HorarioPelicula.listar();
    res.json(respuesta);
})

//@desc actualizar horario pelicula
//@route POST /api/horariopelicula/:id
//@access public
const updateHorarioPelicula=(async (req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idsala=req.body.idsala;
    HorarioPelicula.hora=req.body.hora;
    HorarioPelicula.updated_at=new Date();
    HorarioPelicula.idhorariopelicula=req.params.id;
    let respuesta=await HorarioPelicula.actualizar();
    res.json(respuesta);
})

//@desc borrar horario pelicula
//@route DELETE /api/horariopelicula/:id
//@access public
const deleteHorarioPelicula=(async (req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.deleted_at=new Date();
    HorarioPelicula.idhorariopelicula=req.params.id;
    let respuesta=await HorarioPelicula.eliminar();
    res.json(respuesta);
})

//@desc obtener horario pelicula para entrada
//@route GET /api/salasdisponibles/:id
//@access public
const getListaSalasDisponibles=(async(req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.params.id;
    let SalasDisponibles=await HorarioPelicula.listarSalasDisponibles();
    // console.log(SalasDisponibles);
    res.json(SalasDisponibles);
})

//@desc obtener lista de horarios pelicula
//@route GET /api/horariosdisponibles
//@access public
const getHorarios=(async(req,res)=>{
    let HorarioPelicula=new HorarioPeliculaClass;
    HorarioPelicula.idpelicula=req.query.idpelicula;
    HorarioPelicula.idsala=req.query.idsala;
    let Horarios=await HorarioPelicula.listarHorariosxSala();
    res.json(Horarios);
})

//@desc obtener lista de asientos para validacion
//@route GET /api/asientosocupados
//@access public
const getAsientosOcupados=(async(req,res)=>{
    let HorarioxAsiento=new HorarioxAsientoClass;
    HorarioxAsiento.idhorario=req.query.idhorario;
    let AsientosOcupados=await HorarioxAsiento.listar();
    res.json(AsientosOcupados);
})

module.exports={
    addHorarioPelicula,
    getHorarioPelicula,
    updateHorarioPelicula,
    deleteHorarioPelicula,
    getListaSalasDisponibles,
    getHorarios,
    getAsientosOcupados
}