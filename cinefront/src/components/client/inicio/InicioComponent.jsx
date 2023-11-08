import React, { useContext, useEffect, useState } from "react";
import {Image, Button,Card, CardBody, Divider, CardHeader} from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
// import {
//   Carousel,
//   initTE,
// } from "tw-elements";
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
        <Carousel dynamicHeight={true} showArrows={true} showThumbs={false}>
          {(BannerList.map((Banner)=>(
              <div key={Banner.idbanner}>
                <img width="100px" src={url+Banner.imgbanner}/>
              </div>
          )))}
        </Carousel>
      </div>
      <div className="grid grid-cols-1">
        <h1 className="text-center">Para Ver Hoy</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 ml-4 mr-4">
      {PeliculasEstreno.map((Pelicula)=>(
          <div key={Pelicula.idpelicula} className="mb-2">
            <Card style={{width:"80%"}}>
              <CardHeader className="justify-center">
                <Image src={urlpelicula+Pelicula.imgportada} width={150}></Image>
              </CardHeader>
              <Divider/>
              <CardBody>
                <h1 className="text-center">{Pelicula.titulo}</h1>
                <Button onClick={()=>{IrA(Pelicula.idpelicula,Pelicula.titulo,Pelicula.imgportada)}} className="mt-4 mb-4" color="default" size="sl" radius="sm" style={{height:"40px"}}>Conseguir Entradas</Button>
              </CardBody>
            </Card>
           
          </div>
        ))}
      </div>
      {/* <div className="grid grid-cols-3">
        <div>
          <h1 className="text-center">DESCUBRE LO NUEVO</h1>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula1.jpg"></Image>
          </div>
          <h1 className="text-center">Jesucristo cazador de vampiros</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>

        <div>
          <h1 className="text-center">SERA EMOCIONANTE!</h1>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula2.jpg"></Image>
          </div>
          <h1 className="text-center">Sonic la Película 2</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>

        <div>
          <h1 className="text-center">Y DIVERTIDO!</h1>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula3.jpg"></Image>
          </div>
          <h1 className="text-center">Avengers: EndGame</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula4.jpg"></Image>
          </div>
          <h1 className="text-center">Barbie</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula5.jpg"></Image>
          </div>
          <h1 className="text-center">Tortugas Ninja: Caos Mutante</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>

        <div>
          <div className="flex justify-center">
            <Image width={200} alt="nextui hero image" src="../src/components/client/inicio/imagenes/pelicula6.jpg"></Image>
          </div>
          <h1 className="text-center">Five Nights At Freddy's</h1>
          <div className="flex justify-center">
            <Button onClick={()=>{IrA()}} className="btn mt-4 mb-4" color="default" size="sl" radius="lg">Comprar Boletos</Button>
          </div>
        </div>
      </div> */}

      {/* <div className="grid grid-cols-3 mt-9">
        <div>
          <h1 className="text-center">¿Qué tal algo para degustar?</h1>
          <div className="flex justify-center">
            <Image
              width={300}
              alt="NextUI hero Image"
              src="../src/components/client/inicio/imagenes/anuncio1.png"
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={()=>{IrAProductos()}} className="btn mt-4 mb-4" color="default" size="sl"radius="sm">
              Comprar
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-center">¿Tal vez algo dulce?</h1>
          <div className="flex justify-center">
            <Image
              width={300}
              alt="NextUI hero Image"
              src="../src/components/client/inicio/imagenes/anuncio2.png"
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={()=>{IrAProductos()}} className="btn mt-4 mb-4" color="default" size="sl"radius="sm">
              Comprar
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-center">¿Quizás algo refrescante?</h1>
          <div className="flex justify-center">
            <Image
              width={300}
              alt="NextUI hero Image"
              src="../src/components/client/inicio/imagenes/anuncio3.png"
            />
          </div>
          <div className="flex justify-center">
            <Button onClick={()=>{IrAProductos()}} className="btn mt-4 mb-4" color="default" size="sl"radius="sm">
              Comprar
            </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}