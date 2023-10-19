import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({PeliculaCategoria,setPeliculaCategoria}){
    function handleNombre(e){
        setPeliculaCategoria({...PeliculaCategoria,nombre:e.target.value});
    }
    return (
        <div className="container">
            <Input name="nombre" label="Nombre del Género" value={PeliculaCategoria.nombre} onChange={handleNombre}></Input>
        </div>
        
    )
}