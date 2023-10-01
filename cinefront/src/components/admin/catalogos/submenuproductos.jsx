import { Button } from "@nextui-org/react";
import React from "react";
import {FaGopuram, FaBuilding, FaFilm, FaPeopleCarry, FaHotdog} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SubMenuProducto(){
    const navigate=useNavigate();
    function NavegarCategoria(){
        navigate('/provedores', );
    }
    function NavegarProducto(){
        navigate('/productoslista', );
    }
    return(
        <div className="container">
            <div className="flex gap-3 justify-center">
                <Button className="btn btn-menu" onClick={NavegarCategoria}>
                    <FaPeopleCarry size="2em"/>
                    Provedores
                </Button>
                <Button className="btn btn-menu" onClick={NavegarProducto}>
                    <FaHotdog size="2em"/>
                    Productos
                </Button>
                <Button className="btn btn-menu" >
                    <FaHotdog size="2em"/>
                    Combos
                </Button>
                
            </div>
        </div>
    )
}