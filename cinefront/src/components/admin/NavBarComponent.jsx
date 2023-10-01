import React from "react";

import {Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Divider,
    Button} from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function NavBarComponent() {
  const location=useLocation();
  const pathname=location.pathname;
  const index=pathname.indexOf("cine");
  return (
    <>
      <Navbar className="navigation">
        
      <NavbarContent  className="sm:flex gap-4 " justify="center">
        {index!=-1?(
          <>
            <NavbarItem>
              <Link color="foreground" href="/cine/inicio">
                Inicio
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/cine/cartelera">
                Cartelera
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/cine/productosventa">
                Productos
              </Link>
            </NavbarItem>
          </>
          
          ) : (
          <>
            <NavbarItem>
              <Link color="foreground" href="/dashboard">
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="/configuracion" color="foreground" aria-current="page">
                Configuración
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/productos">
                Productos
              </Link>
            </NavbarItem>
          </>
          

          )
        }
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Bienvenido</Link>
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    
    
    <Outlet></Outlet>
    </>
 
  );
}
// export default NavBarComponent;