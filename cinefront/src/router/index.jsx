import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListPeliculas from "../components/admin/catalogos/pelicula/ListComponent";
import ListSucursal from "../components/admin/catalogos/sucursales/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";
import ListSalaAsiento from "../components/admin/catalogos/sala/salaasientos/ListComponent";
import ListPeliculaHorario from "../components/admin/catalogos/pelicula/peliculahorario/ListComponent";
import HomeComponent from "../components/cliente/HomeComponent";
import NavBarComponent from "../components/admin/NavBarComponent";
// CAMBIAR POR LA RUTA DE INDEX
const router=createBrowserRouter([
    // RUTAS ADMIN
    {
        element:<NavBarComponent/>,
        children:[
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
            {
                path:"/salaasiento",
                element:<ListSalaAsiento/>
            },
            {
                path:'/peliculahorario',
                element:<ListPeliculaHorario/>
            },
            //RUTAS CLIENTE
            {
                path:'/cine/inicio',
                element:<HomeComponent/>
            }
        ]
    }
])
export default router;