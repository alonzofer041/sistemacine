const express=require("express");
// const errorHandler = require("./middelware/errorHandler");
const dotenv=require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
// app.use("/api/contactos", require("./routes/RutaContactos"));
// app.use(errorHandler);
app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})