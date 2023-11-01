import React, { useContext } from "react";
import { useState, useEffect } from "react";
import LogoCine from "../../assets/logo.png";
import { EmpresaContext } from "../../provider/EmpresaProvider";
import { SucursalContext } from "../../provider/SucursalProvider";

import {Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Divider,
    Button,
    Select,
    SelectItem} from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function NavBarComponent() {
  const navigate=useNavigate();
  const location=useLocation();
  const pathname=location.pathname;
  const index=pathname.indexOf("cine");
  const {Empresa,setEmpresa}=useContext(EmpresaContext);
  const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
  const [Sucursales,setSucursales]=useState([]);

  useEffect(()=>{
    if (index!=-1) {
      ListarSucursales();
    }
  },[])
  function Navegar(url){
    navigate(url);
  }
  function ListarSucursales(){
    axios.get("/api/sucursal",{
      params:{
        idempresa:Empresa.idempresa
      }
    }).then((res)=>{
      let data=res.data;
      setSucursales(data);
    })
  }
  function handleIdSucursal(e){
    setIdSucursal(e.target.value);
  }
  
  return (
    <>
      <Navbar className={"navigation navmain"}>
      
      
      <NavbarContent  className="sm:flex gap-4 " justify="right"  >
        {index!=-1?(
          <>
            <NavbarBrand className="logo">
              <img src={LogoCine} width="150" height="40" alt="CineFlash" />
            </NavbarBrand>
            <NavbarItem>
              <Link color="foreground" onClick={()=>{Navegar("/cine/inicio")}}>
                Inicio
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" onClick={()=>{Navegar("/cine/cartelera")}}>
                Cartelera
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" onClick={()=>{Navegar("/cine/productosventa")}}>
                Productos
              </Link>
            </NavbarItem>
          </>
          
          ) : (
          <>
            <NavbarItem>
              <Link color="foreground" onClick={()=>{Navegar("/dashboard")}} >
                Dashboard
              </Link>
            </NavbarItem>
            <NavbarItem >
              <Link onClick={()=>{Navegar("/configuracion")}} color="foreground" aria-current="page" >
                Configuración
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" onClick={()=>{Navegar("/productos")}}>
                Productos
              </Link>
            </NavbarItem>
          </>
          

          )
        }
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex" >
          {/* <Link color="foreground" href="#">Bienvenido</Link> */}
        </NavbarItem>
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
        </NavbarItem>
      </NavbarContent>
      {index!=-1?(
        <NavbarContent>
          <Link color="foreground">{Empresa.nombrecomercial}</Link>
          <Select size="sm" variant="underlined" className="max-w-xs" placeholder="selecciona una sucursal" onChange={handleIdSucursal}>
            {Sucursales.map((Sucursal)=>(
              <SelectItem key={Sucursal.idsucursal} value={Sucursal.idsucursal}>{Sucursal.nombre}</SelectItem>
            ))}
          </Select>
        </NavbarContent>
      ):null}
      <NavbarContent>

      </NavbarContent>
    </Navbar>
    
    
    <Outlet></Outlet>
    </>
 
  );
}
// export default NavBarComponent;