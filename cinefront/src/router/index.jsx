import React from "react";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import ListEmpresa from "../components/admin/catalogos/empresa/ListComponent";
import SubMenuRoot from "../components/admin/catalogos/submenuroot";
import ListBanners from "../components/admin/catalogos/banner/ListComponent";
import ListSalas from "../components/admin/catalogos/sala/ListComponent";
import ListPeliculasCategoria from "../components/admin/catalogos/peliculascategoria/ListComponent";
import ListPeliculaHorario from "../components/admin/catalogos/pelicula/peliculahorario/ListComponent"
import ListPeliculas from "../components/admin/catalogos/pelicula/ListComponent";
import ListProvedores from "../components/admin/catalogos/listaprovedores/ListComponent";
import ListCombo from "../components/admin/catalogos/combo/ListComponent";
import ListComboDetalle from "../components/admin/catalogos/combo/comboxproducto/ListComponent";
import ListProductoCategoria from "../components/admin/catalogos/productocategoria/ListComponent";
import ListProducto from "../components/admin/catalogos/listaproductos/ListComponent";
import SubMenuConfig from "../components/admin/catalogos/submenu";
import Productos from "../components/client/products/ProductComponent";
import Pago from "../components/client/payment/PaymentComponent";
import SubMenuProducto from "../components/admin/catalogos/submenuproductos";
import ListSucursal from "../components/admin/catalogos/sucursales/ListComponent";
import ListAsientos from "../components/admin/catalogos/sala/salaasientos/ListComponent";
import Inicio from "../components/client/inicio/InicioComponent";
import NavBarComponent from "../components/admin/NavBarComponent";
import PrincipalChart from "../components/admin/dashboard/PrincipalComponent";
import Login from "../components/client/login/LoginComponent";
import Register from "../components/client/register/RegisterComponent";
import Movies from "../components/client/movies/MoviesComponent";
import GetTickets from "../components/client/moviesprocess/ProcessComponent";
import { ProtectedRootRoute } from "./ProtectedRootRoute";
import CarteleraComponent from "../components/client/cartelera/CarteleraComponent";

const Routes=()=>{
  const {Token} = useAuth();
  const PublicRoutes=([
    {
      element:<NavBarComponent/>,
      children:[
        {
          path:"/cines/inicio",
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
          path:"/cine/cartelera",
          element:<CarteleraComponent/>
        },
        {
          path:"/cine/peliculas/entradas",
          element:<GetTickets/>
        },
      ]
    }
  ])
  const RoutesForAdminOnly=([
    {
      element:<ProtectedRootRoute/>,
      children:[
        {
          path:"/menuroot",
          element:<SubMenuRoot/>
        },
        {
          path:"/empresa",
          element:<ListEmpresa/>
        },
        {
          path:'/sucursales',
          element:<ListSucursal/>
        },
      ]
    }
  ])
  const RoutesForAuthenticatedOnly=([
    {
      path:"/",
      element:<ProtectedRoute/>,
      children:[
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
              path:"/salas",
              element:<ListSalas/>
            },
            {
              path:"/peliculascategoria",
              element:<ListPeliculasCategoria/>
            },
            {
              path:"/asientos",
              element:<ListAsientos/>
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
              path:"/productocategoria",
              element:<ListProductoCategoria/>
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
          ]
        }
      ]
    }
  ]);
  const RoutesForNotAuthenticatedOnly=[
    {
      path:"/login",
      element:<Login/>
    },
  ]
  const router=createBrowserRouter([
    ...PublicRoutes,
    ...(!Token ? RoutesForNotAuthenticatedOnly : []),
    ...RoutesForAuthenticatedOnly,
    ...RoutesForAdminOnly
  ]);

  return <RouterProvider router={router} />
}
export default Routes;


// const router=createBrowserRouter([

//     {
//         element:<NavBarComponent/>,
//         children:[
//             {
//                 path:"/configuracion",
//                 element:<SubMenuConfig/>
//             },
//             {
//               path:"/banners",
//               element:<ListBanners/>
//             },
//             {
//                 path:"/peliculas",
//                 element:<ListPeliculas/>
//             },
//             {
//                 path:'/sucursales',
//                 element:<ListSucursal/>
//             },
//             {
//                 path:"/salas",
//                 element:<ListSalas/>
//             },
//             {
//                 path:"/peliculascategoria",
//                 element:<ListPeliculasCategoria/>
//             },
//             {
//                 path:"/asientos",
//                 element:<ListAsientos/>
//             },
//             {
//                 path:'/peliculahorario',
//                 element:<ListPeliculaHorario/>
//             },
//             {
//               path:"/productos",
//               element:<SubMenuProducto/>
//             },
//             {
//               path:"/provedores",
//               element:<ListProvedores/>
//             },
//             {
//               path:"/productocategoria",
//               element:<ListProductoCategoria/>
//             },
//             {
//               path:"/producto",
//               element:<ListProducto/>
//             },
//             {
//                 path:"/dashboard",
//                 element:<PrincipalChart/>
//             },
//             {
//                 path:"/combo",
//                 element:<ListCombo/>
//             },
//             {
//                 path:"/combodetalle",
//                 element:<ListComboDetalle/>
//             },

//             {
//               path:"/",
//               element:<Inicio/>
//             },
//             {
//                 path:"/cine/inicio",
//                 element:<Inicio/>
//             },
//             {
//               path:"/cine/productosventa",
//               element:<Productos/>
//             },
//             {
//               path:"/cine/pagarproducto",
//               element:<Pago/>
//             },
//             {
//               path:"cine/login",
//               element:<Login/>
//             },
//             {
//               path:"cine/register",
//               element:<Register/>
//             },
//             {
//               path:"cine/cartelera",
//               element:<Movies/>
//             },
//             {
//               path:"cine/peliculas/entradas",
//               element:<GetTickets/>
//             },
//         ]
//     }
// ])
// export default router;