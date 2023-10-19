const express=require("express");
const cors=require('cors');
const path=require('path');
const PeliculasRoutes = require('./routes/RutaPeliculas');
const PeliculasCategoriaRoutes=require("./routes/RutaPeliculasCategoria");
const CombosRoutes=require("./routes/RutaCombos");
const CombosDetallesRoutes=require("./routes/RutaCombosDetalles");
const bodyParser = require("body-parser");

const dotenv=require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(path.join(__dirname,'assets')))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(PeliculasRoutes);
app.use(PeliculasCategoriaRoutes);
app.use(CombosRoutes);
app.use(CombosDetallesRoutes);
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})