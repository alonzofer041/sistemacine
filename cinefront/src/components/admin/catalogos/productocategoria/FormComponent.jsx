import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({ProductoCategoria,setProductoCategoria, Errores}){
    function handleNombre(e){
        setProductoCategoria({...ProductoCategoria,nombre:e.target.value});
    }
    return (
        <div>
            <div className="container">
                <Input isRequired name="nombre" label="Nombre del tipo de producto" value={ProductoCategoria.nombre} onChange={handleNombre}></Input>
                {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
            </div>
            <div>
                <p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
    )
}