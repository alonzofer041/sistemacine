import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListProvedores from "../components/admin/catalogos/listaprovedores/ListComponent"
import SubMenuConfig from "../components/admin/catalogos/submenu";
import SubMenuProducto from "../components/admin/catalogos/submenuproductos";

// CAMBIAR POR LA RUTA DE INDEX
const router=createBrowserRouter([
    {
        path:"/configuracion",
        element:<SubMenuConfig/>
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
        path:"/productos",
        element:<SubMenuProducto/>
    },
    {
        path:"/productos",
        element:<SubMenuProducto/>
    },
    {
        path:"/provedores",
        element:<ListProvedores/>
    },
])
export default router;