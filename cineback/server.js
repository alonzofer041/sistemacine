const express=require("express");
const cors = require('cors');
const path=require('path');
const PeliculasRoutes = require('./routes/RutaPeliculas');
const PeliculasCategoriaRoutes=require("./routes/RutaPeliculasCategoria");
const BannersRoutes=require("./routes/RutaBanners")

const ProveedorRoutes = require("./routes/RutaProveedor");
const ProductoRoutes = require("./routes/RutaProducto");
const bodyParser = require("body-parser");
const dotenv=require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(path.join(__dirname,'assets')))
app.use(cors());
app.use(PeliculasRoutes);
app.use(PeliculasCategoriaRoutes);
app.use(BannersRoutes);
app.use(ProveedorRoutes);
app.use(ProductoRoutes);
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})