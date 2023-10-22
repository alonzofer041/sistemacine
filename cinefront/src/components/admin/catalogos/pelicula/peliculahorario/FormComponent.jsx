import React, { useEffect, useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";
import axios from "axios";
export default function FormComponent({PeliculaHorario,setPeliculaHorario}){
    const [ListaSalas,setListaSalas]=useState([
    ]);
    useEffect(()=>{
        ListarSalas();
    },[])
    function handleHora(e){
        setPeliculaHorario({...PeliculaHorario,hora:e.target.value});
    }
    function changeIdSala(e){
        setPeliculaHorario({...PeliculaHorario,idsala:e.target.value});
    }
    function ListarSalas(){
        axios.get("/api/salas"
        ).then((res)=>{
            let data=res.data;
            setListaSalas(data);
        });
    }
    return(
        <div>
            <div className="grid grid-cols-2">
                <Select label="Selecciona una sala" onChange={changeIdSala}>
                {ListaSalas.map((Sala)=>(
                        <SelectItem key={Sala.idsala} value={Sala.idsala}>
                            {Sala.nombre}
                        </SelectItem>
                    ))}
                </Select>
                <Input name="horario" label="Horario" type="text" value={PeliculaHorario.hora} onChange={handleHora}/> 
            </div>
        </div>
    )
}