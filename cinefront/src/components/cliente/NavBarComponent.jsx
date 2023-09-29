import React from "react";

import {Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
export default function NavBarComponent(){
    return (
        <Navbar>
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/dashboard">
              Inicio
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/configuracion" aria-current="page">
              Cartelera
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Comprar Productos
            </Link>
          </NavbarItem>
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
      );
}