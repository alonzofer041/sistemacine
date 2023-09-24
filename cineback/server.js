const express=require("express");
const cors=require('cors');

const PeliculasRoutes = require('./routes/RutaPeliculas');
const dotenv=require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(PeliculasRoutes);
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})