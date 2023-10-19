
import React, { useEffect, useState } from "react";
import {Image, Button,Card, CardBody, Divider} from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
// import {
//   Carousel,
//   initTE,
// } from "tw-elements";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// initTE({ Carousel });

const url=import.meta.env.VITE_ASSET_URL+'/banners/';

export default function Inicio() {
  const navigate=useNavigate();
  const [BannerList,setBannerList]=useState([]);

  useEffect(()=>{
    Lista();
  },[]);

  function Lista(){
    axios.get('/api/banner'
      ).then((res)=>{
          let data=res.data;
          setBannerList(data);
      })
  }
  function IrA(){
    navigate("/cine/peliculas/entradas")
  }
  function IrAProductos(){
    navigate("/cine/productosventa")
  }
  return (
    <div className="container-fluid">
      <div className="grid grid-cols-1">
        <Carousel showArrows={true} showThumbs={false}>
          {(BannerList.map((Banner)=>(
              <div>
                <img src={url+Banner.imgbanner} />
                <p className="legend">Legend 1</p>
              </div>
          )))}
        </Carousel>
      </div>
      <div className="grid grid-cols-3">
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
      </div>

      <div className="grid grid-cols-3 mt-9">
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
      </div>
    </div>
  );
}