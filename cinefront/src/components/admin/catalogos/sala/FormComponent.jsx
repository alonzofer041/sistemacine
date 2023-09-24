import React, { useState } from "react";
import { Input } from "@nextui-org/react";
export default function FormComponent({Sala,setSala}){
    function handleNombre(e){
        setSala({...Sala,nombre:e.target.value});
    }
    function handleUbicacion(e){
        setSala({...Sala,ubicacion:e.target.value});
    }
    return(
        <div>
            <div className="grid grid-cols-1">
                <Input name="nombre" label="Nombre" value={Sala.nombre} onChange={handleNombre}></Input>
            </div>
            <div className="grid grid-cols-1 mt-2">
                <Input name="ubicacion" label="Ubicacion" value={Sala.ubicacion} onChange={handleUbicacion}></Input>
            </div>
        </div>
    )
}