import React, { useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";
export default function FormComponent({PeliculaHorario,setPeliculaHorario}){
    function handleHorario(e){
        setPeliculaHorario({...PeliculaHorario,horario:e.target.value});
    }
    return(
        <div>
            <div className="grid grid-cols-2">
                <Input name="horario" label="Horario" type="date" value={PeliculaHorario.horario} onChange={handleHorario}/>
                
            </div>
        </div>
    )
}