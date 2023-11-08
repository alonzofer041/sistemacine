import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({PeliculaCategoria,setPeliculaCategoria,Errores}){
    function handleNombre(e){
        setPeliculaCategoria({...PeliculaCategoria,nombre:e.target.value});
    }
    return (
        <div className="container">
            <div>
                <Input isRequired name="nombre" label="Nombre del género" value={PeliculaCategoria.nombre} onChange={handleNombre}></Input>
                {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label>:null}
            </div>

            <div>
                <br /><p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
        
    )
}