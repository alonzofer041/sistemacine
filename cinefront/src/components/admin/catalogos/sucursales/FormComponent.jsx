import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Sucursal,setSucursal,Errores}){
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
            <div className="mb-2">
                <Input isRequired name="nombre" label="Nombre de la sucursal" value={Sucursal.nombre} onChange={handleNombre}></Input>
                {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
            </div>
            <div className="mb-2">
                <Input isRequired name="direccion" label="Dirección" value={Sucursal.direccion} onChange={handleDireccion}></Input>
                {!Object.is(Errores.direccion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.direccion[0]}</label> : null}
            </div>
            <div className="mb-2">
                <Input isRequired name="telefono" label="Teléfono" value={Sucursal.telefono} onChange={handleTelefono}></Input>
                {!Object.is(Errores.telefono,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.telefono[0]}</label> : null}
            </div>
            <div>
                <Input isRequired name="email" label="Correo electrónico" value={Sucursal.email} onChange={handleEmail}></Input>
                {!Object.is(Errores.email,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.email[0]}</label> : null}
            </div>

            <br />
            <div>
                <p className="asterisco">* Campos oblogatorios</p>
            </div>
            
        </div>
        
    )
}