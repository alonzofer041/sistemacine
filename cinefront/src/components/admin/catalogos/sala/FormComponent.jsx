import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Sala,setSala,Errores}){
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
            <div className="mb-2">
                <Input isRequired name="nombre" label="Nombre de la sala" value={Sala.nombre} onChange={handleNombre}></Input>
                {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
            </div>
            <div className="mb-2">
                <Input isRequired name="ubicacion" label="Ubicación" value={Sala.ubicacion} onChange={handleUbicacion}></Input>
                {!Object.is(Errores.ubicacion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.ubicacion[0]}</label> : null}
            </div>
            <div>
                <Input isRequired name="numfilas" label="Número de Filas" value={Sala.numfilas} onChange={handleNumFilas}></Input>
                {!Object.is(Errores.numfilas,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.numfilas[0]}</label> : null}
            </div>

            <div>
                <br /><p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
        
    )
}