import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function CarteleraComponent(){
    const navigate=useNavigate();
    const [Peliculas,setPeliculas]=useState([]);
    const [Filtro,setFiltro]=useState({});

    useEffect(()=>{
        ListarPeliculas();
    },[]);

    async function ListarPeliculas(){
        await axios.get('/api/pelicula'
        ).then((res)=>{
          let data=res.data;
          setPeliculas(data);
        })
    }

    function IrAComprarEntrada(idpelicula){
        navigate("/cine/peliculas/entradas",{state:{idpelicula:idpelicula}});
    }

    return(
        <div className="container">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">

                </div>
                <div className="col-span-8">
                    {Peliculas.map((Pelicula)=>(
                        <div className="mb-3">
                            <Card className="">
                                <CardBody>
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-3">
                                            <img width={150} src={url+Pelicula.imgportada} alt=""/>
                                            <br />
                                            <Button className="btn" onClick={()=>IrAComprarEntrada(Pelicula.idpelicula)}>Conseguir Entradas</Button>
                                        </div>
                                        <div className="col-span-9">
                                            <h2 className="text-white">{Pelicula.titulo}</h2>
                                            <p>{Pelicula.categoria} / {Pelicula.fechaestreno} / {Pelicula.duracion}</p>
                                            <p>Dirigida por: {Pelicula.director}</p>
                                            <p>Reparto: {Pelicula.reparto}</p>
                                            <br />
                                            <p>{Pelicula.sinopsis}</p>
                                        </div>
                                        
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}