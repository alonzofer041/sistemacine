import {Link, Button } from "@nextui-org/react";
import React from "react";
import {FaGopuram, FaBuilding, FaFilm, FaImages} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SubMenuConfig(){
    const navigate=useNavigate();
    function NavegarCategoria(){
        navigate('/peliculascategoria');
    }
    function NavegarPelicula(){
        navigate('/peliculas');
    }
    function NavegarSala(){
        navigate('/salas');
    }
    function NavegarSucursal(){
        navigate('/sucursales');
    }
    function NavegarBanner(){
        navigate('/banners');
    }
    return(
        <div className="container" style={{height:"34rem"}}>
            <div className="flex gap-3 justify-center">
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarBanner}>
                    <FaImages size="2em"/>
                    Banners
                </Button>

                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarCategoria}>
                    <FaFilm size="2em"/>
                    Género de películas
                </Button>
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarSala}>
                    <FaGopuram size="2em"/>
                    Salas
                </Button>

                {/* <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarSucursal}>
                    <FaBuilding size="2em"/>
                    Sucursal
                </Button> */}

                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarPelicula}>
                    <FaFilm size="2em"/>
                    Películas
                </Button>
            </div>
        </div>
    )
}