import React, { useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";

export default function FormComponent({Asientos,setAsientos,NumFilas}){
    function handleNombre(e){
        setAsientos({...Asientos,nombre:e.target.value});
    }
    function handleFila(e){
        setAsientos({...Asientos,fila:e.target.value});
    }

    return(
        <div>
            <div className="grid grid-cols-2">
                <Input name="nombre" label="Nombre" value={Asientos.nombre} onChange={handleNombre}/>
                <Select label="Fila" onChange={handleFila}>
                    <SelectItem key={0} value={0}>0</SelectItem>
                    {Array.from({length:NumFilas}).map((fila,index)=><SelectItem key={index+1} value={index+1}>{(index+1).toString()}</SelectItem>)}
                </Select>
            </div>
        </div>
    )
}