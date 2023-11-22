import React, { useContext, useEffect, useState } from "react";
import {Image, Button,Card, CardBody, Divider, CardHeader, Tooltip} from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import Footer from "../footerComponent";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SucursalContext } from "../../../provider/SucursalProvider";

// initTE({ Carousel });

const url=import.meta.env.VITE_ASSET_URL+'/banners/';
const urlpelicula=import.meta.env.VITE_ASSET_URL+'/peliculas/';

export default function Inicio() {
  const navigate=useNavigate();
  const [BannerList,setBannerList]=useState([]);
  const {Empresa,setEmpresa}=useContext(EmpresaContext);
  const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
  const [PeliculasEstreno,setPeliculasEstreno]=useState([]);

  useEffect(()=>{
    Lista();
    UltimosEstrenos();
  },[IdSucursal]);

  function Lista(){
    axios.get('/api/banner',{
      params:{
        origen:'cliente',
        idempresa:Empresa.idempresa,
        idsucursal:IdSucursal
      }
    }
      ).then((res)=>{
          let data=res.data;
          setBannerList(data);
          // console.log(IdEmpresa);
      })
  }
  function UltimosEstrenos(){
    let fecha=new Date();
    let year=fecha.getFullYear();
      let month=fecha.getMonth()+1;
      let day=fecha.getDate();
      let cadenafecha=year+'-'+month+'-'+day;
      axios.get("/api/ultimosestrenos",{
        params:{
          idempresa:Empresa.idempresa,
          idsucursal:IdSucursal,
          fechaestreno:cadenafecha
        }
      }).then((res)=>{
        let data=res.data;
        setPeliculasEstreno(data);
      })
  }
  function IrA(idpelicula,titulo,imgportada){
    navigate("/cine/peliculas/entradas",{state:{idpelicula:idpelicula,titulo:titulo,imgportada:imgportada,fecha:new Date()}})
  }
  function IrAProductos(){
    navigate("/cine/productosventa")
  }
  return (
    <div className="container-fluid">
      <div className="grid grid-cols-1">
        <Carousel className="banners white-background" 
                  showStatus={false}
                  autoPlay={true}
                  interval={5000}
                  infiniteLoop
                  dynamicHeight={false}
                  showArrows={true}
                  showThumbs={false}>
          {(BannerList.map((Banner)=>(
              <div key={Banner.idbanner}>
                <img className="banerfoto" src={url+Banner.imgbanner}/>
              </div>
          )))}
        </Carousel>
      </div>
      <div className="mb-2">
        <div className="titlescinema">
			  	<p>ESTRENOS</p>
			  </div>
      </div>
      <div className="cards-movie">
        {PeliculasEstreno.map((Pelicula)=>(
          <div className="item" key={Pelicula.idpelicula}>
            <Card>
              <Tooltip content={Pelicula.titulo}>
                <figure>
                  <img className="moviephoto" src={urlpelicula+Pelicula.imgportada}></img>
                </figure>
              </Tooltip> 
              <CardBody>
                <Button onClick={()=>{IrA(Pelicula.idpelicula,Pelicula.titulo,Pelicula.imgportada)}} className="mt-4 mb-4" color="warning" size="sl" radius="sm" style={{height:"40px"}}>Conseguir Entradas</Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <br /><br /><br />
      <div>
        <Footer/>
      </div>
    </div>
  );
}