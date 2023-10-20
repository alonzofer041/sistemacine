import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({ProductoCategoria,setProductoCategoria}){
    function handleNombre(e){
        setProductoCategoria({...ProductoCategoria,nombre:e.target.value});
    }
    return (
        <div className="container">
            <Input name="nombre" label="Nombre del Tipo de Producto" value={ProductoCategoria.nombre} onChange={handleNombre}></Input>
        </div>
        
    )
}