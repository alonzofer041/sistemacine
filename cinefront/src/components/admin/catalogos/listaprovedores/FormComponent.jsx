import { Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({ProvedorData,setProvedorData}){
    function handleNombre(e){
        setProvedorData({...ProvedorData,nombre:e.target.value});
    }
    function handleDireccion(e){
        setProvedorData({...ProvedorData,direccion:e.target.value});
    }
    return (
        <div className="container" >
            <div className="grid grid-cols-1">
                <Input className="mb-3" name="nombre"  label="Nombre"  value={ProvedorData.nombre} onChange={handleNombre}></Input>
                <Input className="mb-3" name="direccion" label="Direccion" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                <Input className="mb-3" name="email" label="Email" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                <Input className="mb-3" name="numero" label="Numero" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                    <Input className="mb-3" name="estado" label="Estado" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                    <Input name="ciudad" label="Ciudad" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
            </div>    
        </div>
    )
}