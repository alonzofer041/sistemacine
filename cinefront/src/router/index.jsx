import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";
import Productos from "../components/client/ProductComponent";
import Pago from "../components/client/PaymentComponent";

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
        path:"/productosventa",
        element:<Productos/>
    },
    {
        path:"/pagoventa",
        element:<Pago/>
    },
])
export default router;