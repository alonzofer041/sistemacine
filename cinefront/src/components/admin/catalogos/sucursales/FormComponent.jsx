import React, { useState } from "react";
import { Input } from "@nextui-org/react";
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
    return(
        <div>
            <div className="grid grid-cols-1">
                <Input name="nombre" label="Nombre" value={Sucursal.nombre} onChange={handleNombre}></Input>
            </div>
            <div className="grid grid-cols-1 mt-2">
                <Input name="direccion" label="Direccion" value={Sucursal.direccion} onChange={handleDireccion}></Input>
            </div>
            <div className="grid grid-cols-1 mt-2">
                <Input name="telefono" label="Telefono" value={Sucursal.telefono} onChange={handleTelefono}></Input>
            </div>
            <div className="grid grid-cols-1 mt-2">
                <Input name="email" label="Email" value={Sucursal.email} onChange={handleEmail}></Input>
            </div>
        </div>
    )
}