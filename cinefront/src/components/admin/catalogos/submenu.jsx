import { Button } from "@nextui-org/react";
import React from "react";
import {FaGopuram, FaBuilding, FaFilm} from "react-icons/fa";
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
    return(
        <div className="container">
            <div className="flex gap-3 justify-center">
                <Button className="btn btn-menu" onClick={NavegarCategoria}>
                    <FaFilm size="2em"/>
                    Género de Películas
                </Button>
                <Button className="btn btn-menu" onClick={NavegarSala}>
                    <FaGopuram size="2em"/>
                    Salas
                </Button>

                <Button className="btn btn-menu" onClick={NavegarSucursal}>
                    <FaBuilding size="2em"/>
                    Sucursales
                </Button>

                <Button className="btn btn-menu" onClick={NavegarPelicula}>
                    <FaFilm size="2em"/>
                    Películas
                </Button>
            </div>
        </div>
    )
}