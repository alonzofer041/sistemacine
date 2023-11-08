import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardBody, Chip, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function CarteleraComponent(){
    const navigate=useNavigate();
    const [Peliculas,setPeliculas]=useState([]);
    const [Filtro,setFiltro]=useState({});
    const {Empresa,setEmpresa}=useContext(EmpresaContext);
    const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
    const [Fecha, setFecha] = useState(new Date());

    useEffect(()=>{
        ListarPeliculas();
    },[IdSucursal]);

    async function ListarPeliculas(){
        await axios.get('/api/peliculacartelera',{
            params:{
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
                <div className="col-span-4 align-content-center">
                    <h1 className="text-center">Filtros</h1>
                    <div>
                        <h2>Fecha</h2>
                        <DatePicker selected={Fecha} onChange={(date) => setFecha(date)} customInput={<Input label="Selecciona una Fecha" className="max-w-xs"></Input>}></DatePicker>
                    </div>
                    <div>
                        <h2>Hora</h2>
                        <DatePicker
                            selected={Fecha}
                            onChange={date => setFecha(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            />
                    </div>
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
                                            <br />
                                            <h2>Horarios disponibles:</h2>
                                            {Pelicula.horarios.map((horario)=>(
                                                <Chip key={horario.idhorariopelicula} className="mr-2">{horario.hora}</Chip>
                                            ))}
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