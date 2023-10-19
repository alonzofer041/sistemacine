import React, { useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";

export default function FormComponent({Asientos,setAsientos}){
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
                    <SelectItem key={"A"} value={"A"}>Fila A</SelectItem>
                    <SelectItem key={"B"} value={"B"}>Fila B</SelectItem>
                    <SelectItem key={"C"} value={"C"}>Fila C</SelectItem>
                    <SelectItem key={"D"} value={"D"}>Fila D</SelectItem>
                </Select>
            </div>
        </div>
    )
}