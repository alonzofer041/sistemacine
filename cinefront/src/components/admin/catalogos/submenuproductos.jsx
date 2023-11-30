import { Link, Button } from "@nextui-org/react";
import React from "react";
import {FaGopuram, FaBuilding, FaFilm, FaPeopleCarry, FaHotdog, FaTag} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SubMenuProducto(){
    const navigate=useNavigate();
    function NavegarCategoria(){
        navigate('/provedores', );
    }
    function NavegarProducto(){
        navigate('/producto', );
    }
    function NavegarProductoCategoria(){
        navigate('/productocategoria', );
    }
    function NavegarCombo(){
        navigate('/combo', );
    }
    return(
        <div className="container" style={{height:"34rem"}}>
            <div className="flex gap-3 justify-center">
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarCategoria}>
                    <FaPeopleCarry size="2em"/>
                    Provedores
                </Button>
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarProductoCategoria}>
                    <FaTag size="2em"/>
                    Tipos de producto
                </Button>
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarProducto}>
                    <FaHotdog size="2em"/>
                    Productos
                </Button>
                <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarCombo}>
                    <FaHotdog size="2em"/>
                    Promociones
                </Button>
                
            </div>
        </div>
    )
}