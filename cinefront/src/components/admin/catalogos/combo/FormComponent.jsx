import React from "react";
import { Input } from "@nextui-org/react";
import { ImagePreview } from "../../../../helpers/functions";
import { FaUpload } from "react-icons/fa";
const url=import.meta.env.VITE_ASSET_URL+'/combos/';

export default function FormComponent({Combo,setCombo,File,setFile, Errores}){
    function handleNombre(e){
        setCombo({...Combo,nombre:e.target.value});
    }
    function handleValor(e){
        setCombo({...Combo,valor:e.target.value});
    }
    function handleFile(e){
        if(ImagePreview(e)){
            let value=e.target.files;
            setFile(value[0]);
        }
    }
    return(
        <div>
            <div className="grid grid-cols-2">
                <div className="previaimagen col-span-4">
                    <div className="contenedorinputimagen">
                        <input id="file" type="file" name="files"  onChange={handleFile}/><input/>
                        <label htmlFor="file">
                            <FaUpload className="iconoupload"/>
                        </label>
                    </div>
                    <div className="contenedorimagenprevia mb-2">
                        <div id="ImagePreview" style={{backgroundImage:"url('"+url+Combo.imgcombo+"')"}}></div>
                    </div>
                </div>
                <div className="col-span-8">
                    <div className="mb-2">
                        <Input isRequired name="nombre" label="Nombre" value={Combo.nombre} onChange={handleNombre}></Input>
                        {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
                    </div>
                    <div className="mb-2">
                        <Input isRequired name="valor" label="Precio" value={Combo.valor} onChange={handleValor}></Input>
                        {!Object.is(Errores.valor,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.valor[0]}</label> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}