import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function FormComponent({Pelicula,setPelicula,File,setFile}){
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
        let value=e.target.files;
        console.log(value[0]);
        setFile(value[0]);
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
                <div>
                    <input type="file" name="files" onChange={handleFile}/>
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
            <div className="grid grid-cols-1">
                <div>
                    <Input name="titulo" label="Titulo de la pelicula" value={Pelicula.titulo} onChange={handleTitulo}></Input>
                </div>
            </div>
            <div className="grid grid-cols-1">
                <div>
                    <Textarea value={Pelicula.sinopsis} onChange={handleSinopsis} label="Sinopsis" labelPlacement="inside"></Textarea>
                </div>
            </div>
            <div className="grid grid-cols-3">
                <DatePicker customInput={<Input label="Fecha"></Input>} selected={startDate} onChange={(date)=>setStartDate(date)}/>
                <Input value={Pelicula.aniorealizacion} onChange={handleAnioRealizacion} name="anioestreno" label="Año de estreno"></Input>
                <Input value={Pelicula.director} onChange={handleDirector}  name="director" label="Director"></Input>
            </div>
            <div className="grid grid-cols-1">
                <Textarea value={Pelicula.reparto} onChange={handleReparto} label="Reparto" labelPlacement="intside" placeholder="Reparto"></Textarea>
            </div>
            <div className="grid grid-cols-3">
                <Input name="productora" label="Productora" value={Pelicula.productora} onChange={handleProductora}></Input>
                <Input name="productora" label="Distribuidora" value={Pelicula.distribuidora} onChange={handleDistribuidora}></Input>
                <Input name="duracion" label="Duración" value={Pelicula.duracion} onChange={handleDuracion}></Input>
            </div>
        </div>
    )
}