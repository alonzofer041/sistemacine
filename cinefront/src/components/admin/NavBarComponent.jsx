import React from "react";
import { useState, useEffect } from "react";
import LogoCine from "/xampp/htdocs/sistemacine/cinefront/src/assets/logo.png"

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
      
      
      <NavbarContent  className="sm:flex gap-4 " justify="right"  >
        {index!=-1?(
          <>
            <NavbarBrand className="logo">
              <img src={LogoCine} width="150" height="40" alt="CineFlash" />
            </NavbarBrand>
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
              <Link color="foreground" href="/dashboard" >
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem >
              <Link href="/configuracion"  color="foreground" aria-current="page" >
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
        <NavbarItem className=" lg:flex" >
          <Link color="foreground" href="#">Bienvenido</Link>
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