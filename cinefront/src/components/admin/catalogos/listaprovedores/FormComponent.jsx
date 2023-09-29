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
            <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
                <Input name="nombre"  label="Nombre"  value={ProvedorData.nombre} onChange={handleNombre}></Input>
                <Input name="direccion" label="Direccion" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                <Input name="email" label="Email" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                <Input name="numero" label="Numero" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                <div className="flex gap-2 flex w-full">
                    <Input name="estado" label="Estado" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                    <Input name="ciudad" label="Ciudad" value={ProvedorData.direccion} onChange={handleDireccion}></Input>
                </div>
            </div>    
        </div>
    )
}