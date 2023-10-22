import { Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Proveedor,setProveedor}){
    function handleNombre(e){
        setProveedor({...Proveedor,nombrecomercial:e.target.value});
    }
    function handleRazonSocial(e){
        setProveedor({...Proveedor,razonsocial:e.target.value});
    }
    function handleEmail(e){
        setProveedor({...Proveedor,email:e.target.value});
    }
    function handleContacto(e){
        setProveedor({...Proveedor,contacto:e.target.value});
    }
    function handleTelefono(e){
        setProveedor({...Proveedor,telefono:e.target.value});
    }
    function handleDireccion(e){
        setProveedor({...Proveedor,direccion:e.target.value});
    }
    function handleEstado(e){
        setProveedor({...Proveedor,estado:e.target.value});
    }
    function handleCiudad(e){
        setProveedor({...Proveedor,ciudad:e.target.value});
    }
    return (
        <div className="container" >
            {/* <div className="grid grid-cols-1">
                <Input className="mb-3" name="nombrecomercial"  label="Nombre"  value={Proveedor.nombrecomercial} onChange={handleNombre}></Input>
                <Input className="mb-3" name="razonsocial" label="Razon Social" value={Proveedor.razonsocial} onChange={handleRazonSocial}></Input>
                <Input className="mb-3" name="email" label="Email" value={Proveedor.email} onChange={handleEmail}></Input>
                <Input className="mb-3" name="contacto" label="Contacto" value={Proveedor.contacto} onChange={handleContacto}></Input>
                <Input className="mb-3" name="telefono" label="Telefono" value={Proveedor.telefono} onChange={handleTelefono}></Input>
                <Input className="mb-3" name="direccion" label="Direccion" value={Proveedor.direccion} onChange={handleDireccion}></Input>
                <Input className="mb-3" name="estado" label="Estado" value={Proveedor.estado} onChange={handleEstado}></Input>
                <Input name="ciudad" label="Ciudad" value={Proveedor.ciudad} onChange={handleCiudad}></Input>
            </div>     */}
            <div className="grid grid-cols-2">
                <Input className="mb-3" name="nombrecomercial"  label="Nombre"  value={Proveedor.nombrecomercial} onChange={handleNombre}></Input>
                <Input className="ml-3" name="razonsocial" label="Razon Social" value={Proveedor.razonsocial} onChange={handleRazonSocial}></Input>
            </div>
            <div className="grid grid-cols-3 mb-3">
                <Input name="email" label="Email" value={Proveedor.email} onChange={handleEmail}></Input>
                <Input className="ml-2" name="contacto" label="Contacto" value={Proveedor.contacto} onChange={handleContacto}></Input>
                <Input className="ml-4" name="telefono" label="Telefono" value={Proveedor.telefono} onChange={handleTelefono}></Input>
            </div>
            <div className="grid grid-cols-3">
                <Input name="direccion" label="Direccion" value={Proveedor.direccion} onChange={handleDireccion}></Input>
                <Input className="ml-2" name="estado" label="Estado" value={Proveedor.estado} onChange={handleEstado}></Input>
                <Input className="ml-4" name="ciudad" label="Ciudad" value={Proveedor.ciudad} onChange={handleCiudad}></Input>
            </div>
        </div>
    )
}