import { Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Proveedor,setProveedor, Errores}){
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
            <div className="grid grid-cols-1 mb-2">
                <Input isRequired className="mb-3" name="nombrecomercial"  label="Nombre"  value={Proveedor.nombrecomercial} onChange={handleNombre}></Input>
                {!Object.is(Errores.nombrecomercial,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombrecomercial[0]}</label> : null}
            </div>
            <div className="grid grid-cols-1 mb-2">
                <Input isRequired className="mb-3" name="razonsocial" label="Razon Social" value={Proveedor.razonsocial} onChange={handleRazonSocial}></Input>
                {!Object.is(Errores.razonsocial,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.razonsocial[0]}</label> : null}
            </div>
            <div className="grid grid-cols-3 mb-3">
                <div className="mb-2">
                    <Input isRequired name="email" label="Email" value={Proveedor.email} onChange={handleEmail}></Input>
                    {!Object.is(Errores.email,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.email[0]}</label> : null}
                </div>
                <div className="mb-2 ml-2">
                    <Input isRequired name="contacto" label="Contacto" value={Proveedor.contacto} onChange={handleContacto}></Input>
                    {!Object.is(Errores.contacto,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.contacto[0]}</label> : null}
                </div>
                <div className="mb-2 ml-2">
                    <Input isRequired name="telefono" label="Telefono" value={Proveedor.telefono} onChange={handleTelefono}></Input>
                    {!Object.is(Errores.telefono,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.telefono[0]}</label> : null}
                </div>
            </div>
            <div className="grid grid-cols-3 mb-3">
                <div className="mb-2">
                    <Input isRequired name="direccion" label="Direccion" value={Proveedor.direccion} onChange={handleDireccion}></Input>
                    {!Object.is(Errores.direccion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.direccion[0]}</label> : null}
                </div>
                <div className="mb-2 ml-2">
                    <Input isRequired className="ml-2" name="estado" label="Estado" value={Proveedor.estado} onChange={handleEstado}></Input>
                    {!Object.is(Errores.estado,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.estado[0]}</label> : null}
                </div>
                <div className="mb-2 ml-2">
                    <Input isRequired className="ml-4" name="ciudad" label="Ciudad" value={Proveedor.ciudad} onChange={handleCiudad}></Input>
                    {!Object.is(Errores.ciudad,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.ciudad[0]}</label> : null}
                </div>
            </div>

            <br />
            <div>
                <p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
    )
}