import React, { useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";
export default function FormComponent({SalaAsientos,setSalaAsientos}){
    function handleNombre(e){
        setSalaAsientos({...SalaAsientos,nombre:e.target.value});
    }
    function handleFila(e){
        setSalaAsientos({...SalaAsientos,fila:e.target.value});
    }
    return(
        <div>
            <div className="grid grid-cols-2">
                <Input name="nombre" label="Nombre" value={SalaAsientos.nombre} onChange={handleNombre}/>
                <Select label="Fila" onChange={handleFila}>
                    <SelectItem value={"A"}>Fila A</SelectItem>
                    <SelectItem value={"B"}>Fila B</SelectItem>
                    <SelectItem value={"C"}>Fila C</SelectItem>
                    <SelectItem value={"D"}>Fila D</SelectItem>
                </Select>
            </div>
        </div>
    )
}