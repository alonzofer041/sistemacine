import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListPeliculaHorario from "../components/admin/catalogos/pelicula/peliculahorario/ListComponent"
import ListPeliculas from "../components/admin/catalogos/pelicula/ListComponent";
import ListProvedores from "../components/admin/catalogos/listaprovedores/ListComponent";
import ListProducto from "../components/admin/catalogos/listaproductos/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";
import Productos from "../components/client/ProductComponent";
import Pago from "../components/client/PaymentComponent";
import SubMenuProducto from "../components/admin/catalogos/submenuproductos";
import ListSucursal from "../components/admin/catalogos/sucursales/ListComponent";
import ListSalaAsiento from "../components/admin/catalogos/sala/salaasientos/ListComponent";
import Inicio from "../components/client/inicio/iniciocomponent";
import NavBarComponent from "../components/admin/NavBarComponent";
import Cartelera from "../components/client/inicio/cartelera";
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
            {
              path:"/productos",
              element:<SubMenuProducto/>
            },
            {
              path:"/provedores",
              element:<ListProvedores/>
            },
            {
              path:"/productoslista",
              element:<ListProducto/>
            },
            //RUTAS CLIENTE
            {
                path:"/cine/inicio",
                element:<Inicio/>
            },
            {
              path:"/cine/productosventa",
              element:<Productos/>
            },
            {
              path:"/cine/pagoventa",
              element:<Pago/>
            },
            {
                path:"/cine/Cartelera",
                element:<Cartelera/>
              },
        ]
    }
])
export default router;