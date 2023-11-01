const express=require("express");
const cors = require('cors');
const path=require('path');
const UsuariosRoutes = require('./routes/RutaUsuarios');
const EmpresasRoutes = require('./routes/RutaEmpresas');
const PeliculasRoutes = require('./routes/RutaPeliculas');
const HorarioPeliculaRoutes = require('./routes/RutaHorarioPelicula');
const PeliculasCategoriaRoutes=require("./routes/RutaPeliculasCategoria");
const ProductoCategoriaRoutes=require("./routes/RutaProductoCategoria");
const CombosRoutes=require("./routes/RutaCombos");
const CombosDetallesRoutes=require("./routes/RutaCombosDetalles");
const SalasRoutes=require("./routes/RutaSalas");
const SucursalRoutes=require("./routes/RutaSucursal");
const AsientosRoutes=require("./routes/RutaAsientos");

const BannersRoutes=require("./routes/RutaBanners")
const ProveedorRoutes = require("./routes/RutaProveedor");
const ProductoRoutes = require("./routes/RutaProducto");
const OrdenProductosRoutes = require("./routes/RutaOrdenProductos");
const OrdenEntradasRoutes = require("./routes/RutaOrdenEntradas");

const bodyParser = require("body-parser");
const dotenv=require('dotenv').config();
const app=express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(path.join(__dirname,'assets')))
app.use(cors());

app.use(UsuariosRoutes);
app.use(EmpresasRoutes);
app.use(PeliculasRoutes);
app.use(HorarioPeliculaRoutes);
app.use(PeliculasCategoriaRoutes);
app.use(ProductoCategoriaRoutes);

app.use(CombosRoutes);
app.use(CombosDetallesRoutes);
app.use(SalasRoutes);
app.use(SucursalRoutes);
app.use(AsientosRoutes);
app.use(BannersRoutes);
app.use(ProveedorRoutes);
app.use(ProductoRoutes);
app.use(OrdenProductosRoutes);
app.use(OrdenEntradasRoutes);

app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})