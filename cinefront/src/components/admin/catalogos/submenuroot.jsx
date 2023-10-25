import {Link, Button } from "@nextui-org/react";
import React from "react";
import {FaBuilding} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SubMenuRoot(){
    const navigate=useNavigate();
    function NavegarEmpresa(){
        navigate('/empresa');
    }
    return(
        <div className="container" style={{height:"34rem"}}>
            <div className="flex gap-3 justify-center">
            <Button className="btn-menu" as={Link} variant="shadow" onClick={NavegarEmpresa}>
                    <FaBuilding size="2em"/>
                    Empresas
                </Button>
            </div>
        </div>
    )
}