import React from "react";
import { Input } from "@nextui-org/react";
export default function FormComponent({Combo,setCombo,File,setFile}){
    function handleNombre(e){
        setCombo({...Combo,nombre:e.target.value});
    }
    function handleValor(e){
        setCombo({...Combo,valor:e.target.value});
    }
    function handleFile(e){
        let value=e.target.files;
        console.log(value[0]);
        setFile(value[0]);
    }
    return(
        <div>
            <div className="grid grid-cols-2"></div>
             <div>
                    <input type="file" name="files" onChange={handleFile}/>
                </div>
            <div className="grid-cols-1 mb-3">
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