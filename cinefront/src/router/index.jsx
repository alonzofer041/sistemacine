import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListBanners from "../components/admin/catalogos/banner/ListComponent";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListPeliculaHorario from "../components/admin/catalogos/pelicula/peliculahorario/ListComponent"
import ListPeliculas from "../components/admin/catalogos/pelicula/ListComponent";
import ListProvedores from "../components/admin/catalogos/listaprovedores/ListComponent";
import ListCombo from "../components/admin/catalogos/combo/ListComponent";
import ListComboDetalle from "../components/admin/catalogos/combo/comboxproducto/ListComponent";
import ListProducto from "../components/admin/catalogos/listaproductos/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";
import Productos from "../components/client/products/ProductComponent";
import Pago from "../components/client/payment/PaymentComponent";
import SubMenuProducto from "../components/admin/catalogos/submenuproductos";
import ListSucursal from "../components/admin/catalogos/sucursales/ListComponent";
import ListSalaAsiento from "../components/admin/catalogos/sala/salaasientos/ListComponent";
import Inicio from "../components/client/inicio/InicioComponent";
import NavBarComponent from "../components/admin/NavBarComponent";
import PrincipalChart from "../components/admin/dashboard/PrincipalComponent";
import Login from "../components/client/login/LoginComponent";
import Register from "../components/client/register/RegisterComponent";
import Movies from "../components/client/movies/MoviesComponent";
import GetTickets from "../components/client/moviesprocess/ProcessComponent";
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
              path:"/banners",
              element:<ListBanners/>
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
              path:"/producto",
              element:<ListProducto/>
            },
            {
                path:"/dashboard",
                element:<PrincipalChart/>
            },
            {
                path:"/combo",
                element:<ListCombo/>
            },
            {
                path:"/combodetalle",
                element:<ListComboDetalle/>
            },
            //RUTAS CLIENTE
            {
              path:"/",
              element:<Inicio/>
            },
            {
                path:"/cine/inicio",
                element:<Inicio/>
            },
            {
              path:"/cine/productosventa",
              element:<Productos/>
            },
            {
              path:"/cine/pagarproducto",
              element:<Pago/>
            },
            {
              path:"cine/login",
              element:<Login/>
            },
            {
              path:"cine/register",
              element:<Register/>
            },
            {
              path:"cine/cartelera",
              element:<Movies/>
            },
            {
              path:"cine/peliculas/entradas",
              element:<GetTickets/>
            },
        ]
    }
])
export default router;