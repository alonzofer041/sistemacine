import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Empresa,setEmpresa}){
    function handleNombreComercial(e){
        setEmpresa({...Empresa,nombrecomercial:e.target.value});
    }
    function handleRazonSocial(e){
        setEmpresa({...Empresa,razonsocial:e.target.value});
    }
    function handleRfc(e){
        setEmpresa({...Empresa,rfc:e.target.value});
    }
    function handleDireccion(e){
        setEmpresa({...Empresa,direccion:e.target.value});
    }
    function handleTelefono(e){
        setEmpresa({...Empresa,telefono:e.target.value});
    }
    function handleEmail(e){
        setEmpresa({...Empresa,email:e.target.value});
    }
    function handleEstado(e){
        setEmpresa({...Empresa,estado:e.target.value});
    }
    function handleCiudad(e){
        setEmpresa({...Empresa,ciudad:e.target.value});
    }
    return (
        <div className="container">
            <div className="grid grid-cols-2">
                <Input name="nombrecomercial" label="Nombre Comercial" value={Empresa.nombrecomercial} onChange={handleNombreComercial}></Input>
                <Input name="razonsocial" label="Razón Social" value={Empresa.razonsocial} onChange={handleRazonSocial}></Input>
            </div>

            <div className="grid grid-cols-2">
                <Input name="rfc" label="RFC" value={Empresa.rfc} onChange={handleRfc}></Input>
                <Input name="direccion" label="Dirección" value={Empresa.direccion} onChange={handleDireccion}></Input>
            </div>

            <div className="grid grid-cols-2">
                <Input name="telefono" label="Teléfono" value={Empresa.telefono} onChange={handleTelefono}></Input>
                <Input name="email" label="Email" value={Empresa.email} onChange={handleEmail}></Input>
            </div>

            <div className="grid grid-cols-2">
                <Input name="estado" label="Estado" value={Empresa.estado} onChange={handleEstado}></Input>
                <Input name="ciudad" label="Ciudad" value={Empresa.ciudad} onChange={handleCiudad}></Input>
            </div>
        </div>
        
    )
}