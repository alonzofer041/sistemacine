import React, { useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";

export default function FormComponent({Asientos,setAsientos,NumFilas, Errores}){
    function handleNombre(e){
        setAsientos({...Asientos,nombre:e.target.value});
    }
    function handleFila(e){
        setAsientos({...Asientos,fila:e.target.value});
    }

    return(
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <Input isRequired name="nombre" label="Nombre" value={Asientos.nombre} onChange={handleNombre}/>
                    {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
                </div>
                <div className="ml-2">
                <Select isRequired label="Fila" onChange={handleFila}>
                    <SelectItem key={0} value={0}>0</SelectItem>
                    {Array.from({length:NumFilas}).map((fila,index)=><SelectItem key={index+1} value={index+1}>{(index+1).toString()}</SelectItem>)}
                </Select>

                </div>
            </div>

            <div>
                <br /><p className="asterisco">* Campos obligatorios</p>
            </div>
        </div>
    )
}