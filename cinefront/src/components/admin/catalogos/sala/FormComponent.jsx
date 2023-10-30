import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Sala,setSala}){
    function handleNombre(e){
        setSala({...Sala,nombre:e.target.value});
    }
    function handleUbicacion(e){
        setSala({...Sala,ubicacion:e.target.value});
    }
    function handleNumFilas(e){
        setSala({...Sala,numfilas:e.target.value});
    }
    return (
        <div className="container">
            <Input name="nombre" label="Nombre de la sala" value={Sala.nombre} onChange={handleNombre}></Input>
            <Input name="ubicacion" label="Ubicación" value={Sala.ubicacion} onChange={handleUbicacion}></Input>
            <Input name="numfilas" label="Número de Filas" value={Sala.numfilas} onChange={handleNumFilas}></Input>
        </div>
        
    )
}