import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Sucursal,setSucursal}){
    function handleNombre(e){
        setSucursal({...Sucursal,nombre:e.target.value});
    }
    function handleDireccion(e){
        setSucursal({...Sucursal,direccion:e.target.value});
    }
    function handleTelefono(e){
        setSucursal({...Sucursal,telefono:e.target.value});
    }
    function handleEmail(e){
        setSucursal({...Sucursal,email:e.target.value});
    }
    return (
        <div className="container">
            <Input name="nombre" label="Nombre de la sucursal" value={Sucursal.nombre} onChange={handleNombre}></Input>
            <Input name="direccion" label="Dirección" value={Sucursal.ubicacion} onChange={handleDireccion}></Input>
            <Input name="telefono" label="Teléfono" value={Sucursal.telefono} onChange={handleTelefono}></Input>
            <Input name="email" label="Correo electrónico" value={Sucursal.email} onChange={handleEmail}></Input>
        </div>
        
    )
}