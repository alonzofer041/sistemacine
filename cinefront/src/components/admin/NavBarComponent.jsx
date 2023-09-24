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
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function NavBarComponent() {
  // const navigate=useNavigate();
  // function NavegarDashboard(){
  //   navigate("/dashboard");
  // }
  // function NavegarConfiguracion(){
  //   navigate("/configuracion");
  // }
  // function NavegarProductos(){
  //   navigate("/productos");
  // }
  return (
    <Navbar>
    <NavbarContent className="sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/dashboard">
          Dashboard
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="/configuracion" aria-current="page">
          Configuración
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="/productos" color="foreground">
          Productos
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
// export default NavBarComponent;