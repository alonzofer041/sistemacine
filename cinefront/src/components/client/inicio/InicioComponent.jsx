
import React from "react";
import {Image, Button,Card, CardBody, Divider} from "@nextui-org/react";
import {
  Carousel,
  initTE,
} from "tw-elements";
import { useNavigate } from "react-router-dom";

initTE({ Carousel });
export default function Inicio() {
  const navigate=useNavigate();
  function IrA(){
    navigate("/cine/peliculas/entradas")
  }
  function IrAProductos(){
    navigate("/cine/productosventa")
  }
  return (
    <div className="container-fluid">
      {/* <div className="grid grid-cols-1"> */}
        {/* Hello world */}
  <div
    id="carouselExampleCaptions"
    className="relative"
    data-te-carousel-init=""
    data-te-ride="carousel"
  >
    {/*Carousel indicators*/}
    <div
      className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
      data-te-carousel-indicators=""
    >
      <button
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide-to={0}
        data-te-carousel-active=""
        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
        aria-current="true"
        aria-label="Slide 1"
      />
      <button
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide-to={1}
        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
        aria-label="Slide 2"
      />
      <button
        type="button"
        data-te-target="#carouselExampleCaptions"
        data-te-slide-to={2}
        className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
        aria-label="Slide 3"
      />
    </div>
    {/*Carousel items*/}
    <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
      {/*First item*/}
      <div
        className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-active=""
        data-te-carousel-item=""
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src="../src/components/client/inicio/imagenes/cinesprogreso-10c121d8.png"
          className="block w-full"
          alt="..."
        />
        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
          <h5 className="text-xl">First slide label</h5>
          <p>Some representative placeholder content for the first slide.</p>
        </div>
      </div>
      {/*Second item*/}
      <div
        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item=""
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src="../src/components/client/inicio/imagenes/cinesprogreso-beb7c31d.png"
          className="block w-full"
          alt="..."
        />
        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
          <h5 className="text-xl">Second slide label</h5>
          <p>Some representative placeholder content for the second slide.</p>
        </div>
      </div>
      {/*Third item*/}
      <div
        className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
        data-te-carousel-item=""
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src="../src/components/client/inicio/imagenes/Fb5_Lk4XEAII16P.jpg"
          className="block w-full"
          alt="..."
        />
        <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
          <h5 className="text-xl">Third slide label</h5>
          <p>Some representative placeholder content for the third slide.</p>
        </div>
      </div>
    </div>
    {/*Carousel controls - prev item*/}
    <button
      className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide="prev"
    >
      <span className="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Previous
      </span>
    </button>
    {/*Carousel controls - next item*/}
    <button
      className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
      type="button"
      data-te-target="#carouselExampleCaptions"
      data-te-slide="next"
    >
      <span className="inline-block h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Next
      </span>
    </button>
  </div>
      {/* </div> */}
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