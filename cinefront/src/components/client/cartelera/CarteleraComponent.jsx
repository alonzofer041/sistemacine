import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function CarteleraComponent(){
    const navigate=useNavigate();
    const [Peliculas,setPeliculas]=useState([]);
    const [Filtro,setFiltro]=useState({});
    const {Empresa,setEmpresa}=useContext(EmpresaContext);
    const {IdSucursal,setIdSucursal}=useContext(SucursalContext);

    useEffect(()=>{
        ListarPeliculas();
    },[IdSucursal]);

    async function ListarPeliculas(){
        await axios.get('/api/pelicula',{
            params:{
                origen:'cliente',
                idempresa:Empresa.idempresa,
                idsucursal:IdSucursal
            }
        }
        ).then((res)=>{
          let data=res.data;
          setPeliculas(data);
        })
    }

    function IrAComprarEntrada(idpelicula,titulo,imgportada){
        navigate("/cine/peliculas/entradas",{state:{idpelicula:idpelicula,titulo:titulo,imgportada:imgportada}});
    }

    return(
        <div className="container">
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">

                </div>
                <div className="col-span-8">
                    {Peliculas.map((Pelicula)=>(
                        <div className="mb-3" key={Pelicula.idpelicula}>
                            <Card className="">
                                <CardBody>
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-3">
                                            <img width={150} src={url+Pelicula.imgportada} alt=""/>
                                            <br />
                                            <Button className="btn" onClick={()=>IrAComprarEntrada(Pelicula.idpelicula,Pelicula.titulo,Pelicula.imgportada)}>Conseguir Entradas</Button>
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