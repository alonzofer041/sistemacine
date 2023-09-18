//@desc crear categoria pelicula
//@route POST /api/cpeliculacategoria
//@access public
const addPeliculaCategoria=((req,res)=>{
    res.status(200).json({message:"conectado"});
})
module.exports={addPeliculaCategoria}