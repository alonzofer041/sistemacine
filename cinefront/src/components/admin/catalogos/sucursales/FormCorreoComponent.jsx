import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormCorreoComponent({DatosCorreo,setDatosCorreo}){
    function handleEmail(e){
        setDatosCorreo({...DatosCorreo,email:e.target.value});
    }
    function handleDestinatario(e){
        setDatosCorreo({...DatosCorreo,destinatario:e.target.value});
    }
    return(
        <div className="container">
            <Input name="correo" label="Correo" value={DatosCorreo.email} onChange={handleEmail}></Input>
            <Input name="destinatario" label="Nombre de Quien Recibe" value={DatosCorreo.destinatario} onChange={handleDestinatario}></Input>
        </div>   
    )
}