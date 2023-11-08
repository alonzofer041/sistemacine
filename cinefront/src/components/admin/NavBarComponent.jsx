import React, { useContext } from "react";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import LogoCine from "../../assets/logo.png";
import { EmpresaContext } from "../../provider/EmpresaProvider";
import { SucursalContext } from "../../provider/SucursalProvider";
import {useAuth} from "../../provider/AuthProvider";

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
    SelectItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Image} from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
// import {AcmeLogo} from "./AcmeLogo.jsx";
const urlempresa=import.meta.env.VITE_ASSET_URL+'/empresas/';

export default function NavBarComponent() {
  const navigate=useNavigate();
  const location=useLocation();
  const pathname=location.pathname;
  const index=pathname.indexOf("cine");
  const {Empresa,setEmpresa}=useContext(EmpresaContext);
  const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
  const [Sucursales,setSucursales]=useState([]);
  const {Token}=useAuth();

  useEffect(()=>{
    if (index!=-1) {
      ListarSucursales();
    }
  },[])
  useEffect(()=>{
    if (Sucursales.length>0) {
      let idsucursal=Sucursales[0].idsucursal;
      setIdSucursal(idsucursal); 
    }
  },[Sucursales]);
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
    }).finally(()=>{

    })
  }
  function handleIdSucursal(e){
    setIdSucursal(e.target.value);
  }
  function logout(){
    localStorage.removeItem("token");
    navigate("/login")
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
            <NavbarBrand>
              <Image radius="none" width={80} src={urlempresa+jwtDecode(Token).Usuario.imgempresa}></Image>
            </NavbarBrand>
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
          {Sucursales.length>0?(
            <Select defaultSelectedKeys={[Sucursales[0].idsucursal].toString()} size="sm" variant="underlined" className="max-w-xs" placeholder="selecciona una sucursal" onChange={handleIdSucursal}>
              {Sucursales.map((Sucursal)=>(
                <SelectItem key={Sucursal.idsucursal} value={Sucursal.idsucursal}>{Sucursal.nombre}</SelectItem>
              ))}
            </Select>
          ):null}
        </NavbarContent>
      ):(
        <NavbarContent justify="end">
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent" radius="sm" variant="light"
                endContent={<FaChevronDown className="ml-2"></FaChevronDown>}>
                  Bienvenido {jwtDecode(Token).Usuario.nombre}
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu>
              <DropdownItem onClick={logout} key="cerrarsesion">Cerrar Sesión</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
      <NavbarContent>

      </NavbarContent>
    </Navbar>
    
    
    <Outlet></Outlet>
    </>
 
  );
}
// export default NavBarComponent;