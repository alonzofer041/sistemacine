import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { ImagePreview } from "../../../../helpers/functions";
import { FaUpload } from "react-icons/fa";
const url=import.meta.env.VITE_ASSET_URL+'/empresas/';

export default function FormComponent({Empresa,setEmpresa,File,setFile,Errores}){
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
    function handleFile(e){
        if(ImagePreview(e)){
            let value=e.target.files;
            setFile(value[0]);
        }
    }

    return (
        <div className="container">
            <div className="grid grid-cols-12 mb-3">
                <div className="previaimagen col-span-4">
                    <div className="contenedorinputimagen">
                        <input id="file" type="file" name="files"  onChange={handleFile}/><input/>
                        <label htmlFor="file">
                            <FaUpload className="iconoupload"/>
                        </label>
                    </div>
                    <div className="contenedorimagenprevia mb-2">
                        <div id="ImagePreview" style={{backgroundImage:"url('"+url+Empresa.imgempresa+"')"}}></div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="mb-2">
                        <Input isRequired name="nombrecomercial" label="Nombre comercial" value={Empresa.nombrecomercial} onChange={handleNombreComercial}></Input>
                        {!Object.is(Errores.nombrecomercial,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombrecomercial[0]}</label> : null}
                    </div>
                    <div className="mb-2">
                        <Input isRequired name="razonsocial" label="Razón social" value={Empresa.razonsocial} onChange={handleRazonSocial}></Input>
                        {!Object.is(Errores.razonsocial,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.razonsocial[0]}</label> : null}
                    </div>
                    <div className="mb-2">
                        <Input maxLength={12} isRequired name="rfc" label="RFC" value={Empresa.rfc} onChange={handleRfc}></Input>
                        {!Object.is(Errores.rfc,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.rfc[0]}</label> : null}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
                <div>
                    <Input isRequired name="direccion" label="Dirección" value={Empresa.direccion} onChange={handleDireccion}></Input>
                    {!Object.is(Errores.direccion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.direccion[0]}</label> : null}
                </div>
                <div>
                    <Input maxLength={10} isRequired className="ml-2" name="telefono" label="Teléfono" value={Empresa.telefono} onChange={handleTelefono}></Input>
                    {!Object.is(Errores.telefono,undefined) ? <label className="mensajeerrorvalidacion ml-2" htmlFor="">{Errores.telefono[0]}</label> : null}
                </div>
            </div>

            <div className="grid grid-cols-2 mb-2">
                <div>
                    <Input isRequired name="email" label="Correo electrónico" value={Empresa.email} onChange={handleEmail}></Input>
                    {!Object.is(Errores.email,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.email[0]}</label> : null}
                </div>
                <div>
                    <Input isRequired className="ml-2" name="estado" label="Estado" value={Empresa.estado} onChange={handleEstado}></Input>
                    {!Object.is(Errores.estado,undefined) ? <label className="mensajeerrorvalidacion ml-2" htmlFor="">{Errores.estado[0]}</label> : null}
                </div>
            </div>

            <div className="grid grid-cols-2">
                <div>
                    <Input isRequired name="ciudad" label="Ciudad" value={Empresa.ciudad} onChange={handleCiudad}></Input>
                    {!Object.is(Errores.ciudad,undefined) ? <label className="mensajeerrorvalidacion ml-2" htmlFor="">{Errores.ciudad[0]}</label> : null}
                </div>
            </div>

            <div>
                <br /><p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
        
    )
}