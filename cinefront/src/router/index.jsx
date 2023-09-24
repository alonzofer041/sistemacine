import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListPeliculas from "../components/admin/catalogos/pelicula/ListComponent";
import ListSucursal from "../components/admin/catalogos/sucursales/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";

// CAMBIAR POR LA RUTA DE INDEX
const router=createBrowserRouter([
    {
        path:"/configuracion",
        element:<SubMenuConfig/>
    },
    {
        path:"/peliculas",
        element:<ListPeliculas/>
    },
    {
        path:'/sucursales',
        element:<ListSucursal/>
    },
    {
        path:"/salas",
        element:<ListSalas/>
    },
    {
        path:"/peliculascategoria",
        element:<ListPeliculasCategoria/>
    },
])
export default router;