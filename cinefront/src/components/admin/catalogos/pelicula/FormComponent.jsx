import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ImagePreview } from "../../../../helpers/functions";
import { FaUpload } from "react-icons/fa";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';

export default function FormComponent({Pelicula,setPelicula,File,setFile, Errores}){
    const [startDate, setStartDate] = useState(new Date());
    const [PeliculaCategoriaList,setPeliculasCategoriaList]=useState([]);
    useEffect(()=>{
        ListaCategoria();
    },[]);
    function handleIdPeliculaCategoria(e){
        setPelicula({...Pelicula,idpeliculacategoria:e.target.value});
    }
    function handleTitulo(e){
        setPelicula({...Pelicula,titulo:e.target.value});
    }
    function handleSinopsis(e){
        setPelicula({...Pelicula,sinopsis:e.target.value});
    }
    function handleFechaEstreno(e){
        setPelicula({...Pelicula,fechaestreno:e.target.value});
    }
    function handleReparto(e){
        setPelicula({...Pelicula,reparto:e.target.value});
    }
    function handleProductora(e){
        setPelicula({...Pelicula,productora:e.target.value});
    }
    function handleDuracion(e){
        setPelicula({...Pelicula,duracion:e.target.value});
    }
    function handleAnioRealizacion(e){
        setPelicula({...Pelicula,aniorealizacion:e.target.value});
    }
    function handleDirector(e){
        setPelicula({...Pelicula,director:e.target.value});
    }
    function handleDistribuidora(e){
        setPelicula({...Pelicula,distribuidora:e.target.value});
    }
    function handleFile(e){
        if(ImagePreview(e)){
            let value=e.target.files;
            setFile(value[0]);
        }
    }
    function ListaCategoria(){
        axios.get("/api/peliculacategoria"
        ).then((res)=>{
            let data=res.data;
            setPeliculasCategoriaList(data);
        });
    }
    return (
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
                        <div id="ImagePreview" style={{backgroundImage:"url('"+url+Pelicula.imgportada+"')"}}></div>
                    </div>
                </div>
                <div>
                    <Select onChange={handleIdPeliculaCategoria} label="Seleccione una Categoría">
                        {PeliculaCategoriaList.map((PeliculaCategoria)=>(
                            <SelectItem key={PeliculaCategoria.idpeliculacategoria} value={PeliculaCategoria.idpeliculacategoria}>
                                {PeliculaCategoria.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 mb-2">
                <div>
                    <Input name="titulo" label="Titulo de la pelicula" value={Pelicula.titulo} onChange={handleTitulo}></Input>
                    {!Object.is(Errores.titulo,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.titulo[0]}</label> : null}
                </div>
            </div>
            <div className="grid grid-cols-1 mb-2">
                <div>
                    <Textarea value={Pelicula.sinopsis} onChange={handleSinopsis} label="Sinopsis" labelPlacement="inside"></Textarea>
                    {!Object.is(Errores.sinopsis,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.sinopsis[0]}</label> : null}
                </div>
            </div>
            <div className="grid grid-cols-3 mb-2">
                <div>
                    <DatePicker customInput={<Input label="Fecha"></Input>} selected={startDate} onChange={(date)=>setStartDate(date)}/>
                </div>
                <div className="mb-2 ml-2">
                    <Input value={Pelicula.aniorealizacion} onChange={handleAnioRealizacion} name="aniorealizacion" label="Año de estreno"></Input>
                    {!Object.is(Errores.aniorealizacion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.aniorealizacion[0]}</label> : null}
                </div>
                <div className="mb-2 ml-2">
                    <Input value={Pelicula.director} onChange={handleDirector}  name="director" label="Director"></Input>
                    {!Object.is(Errores.director,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.director[0]}</label> : null}
                </div>
            </div>
            <div className="grid grid-cols-1 mb-2">
                <Textarea value={Pelicula.reparto} onChange={handleReparto} label="Reparto" labelPlacement="intside" placeholder="Reparto"></Textarea>
                {!Object.is(Errores.reparto,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.reparto[0]}</label> : null}
            </div>
            <div className="grid grid-cols-3">
                <div>
                    <Input name="productora" label="Productora" value={Pelicula.productora} onChange={handleProductora}></Input>
                    {!Object.is(Errores.productora,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.productora[0]}</label> : null}
                </div>
                <div className="ml-2">
                    <Input name="productora" label="Distribuidora" value={Pelicula.distribuidora} onChange={handleDistribuidora}></Input>
                    {!Object.is(Errores.distribuidora,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.distribuidora[0]}</label> : null}
                </div>
                <div className="ml-2">
                    <Input name="duracion" label="Duración" value={Pelicula.duracion} onChange={handleDuracion}></Input>
                    {!Object.is(Errores.duracion,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.duracion[0]}</label> : null}
                </div>
            </div>
        </div>
    )
}