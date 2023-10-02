import React from "react";
import { Input } from "@nextui-org/react";
export default function FormComponent({Combo,setCombo}){
    function handleNombre(e){
        setCombo({...Combo,nombre:e.target.value});
    }
    function handleValor(e){
        setCombo({...Combo,valor:e.target.value});
    }
    return(
        <div>
            <div className="grid-cols-1">
                <div>
                    <Input name="nombre" label="Nombre" value={Combo.nombre} onChange={handleNombre}></Input>
                </div>
            </div>
            <div className="grid-cols-1">
                <div>
                    <Input name="valor" label="Valor" value={Combo.valor} onChange={handleValor}></Input>
                </div>
            </div>
        </div>
    )
}