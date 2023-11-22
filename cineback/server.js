const express=require("express");
const fetch=require("node-fetch");
// import fetch from "node-fetch";
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

const DashboardRoutes = require("./routes/RutaDashboard");

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

app.use(DashboardRoutes);

app.listen(port,()=>{
    console.log(`servidor corriendo en puerto ${port}`);
})

// REACOMODAR COSAS PARA SUPERSET
async function fetchAccessToken() {
    try {
      const body = {
        username: "admin2",
        password: "Revan.12.34.5",
        provider: "db",
        refresh: true,
      }
  
      const response = await fetch(
        "http://20.172.33.244:8088/api/v1/security/login",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
  
      const jsonResponse = await response.json()
      return jsonResponse?.access_token
    } catch (e) {
      console.error(error)
    }
  }
  

async function fetchGuestToken() {
    const accessToken = await fetchAccessToken()
    try {
      const body = {
        resources: [
          {
            type: "dashboard",
            id: "c688722b-442b-46a7-bbed-636bc647ccab",
          },
        ],
        rls: [],
        user: {
          username: "alonzofer",
          first_name: "fernando",
          last_name: "react",
        },
      }
      const response = await fetch(
        "http://20.172.33.244:8088/api/v1/security/guest_token",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      const jsonResponse = await response.json()
      return jsonResponse?.token
    } catch (error) {
      console.error(error)
    }
  }
  
  app.get("/guest-token", async (req, res) => {
    const token = await fetchGuestToken()
    res.json(token)
  })