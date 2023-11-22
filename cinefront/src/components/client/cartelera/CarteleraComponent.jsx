import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../footerComponent";
import { Button, Card, CardBody, Chip, Input, Divider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimeRange from 'react-time-range';
import moment from 'moment';

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function CarteleraComponent(){
    const navigate=useNavigate();
    const [Peliculas,setPeliculas]=useState([]);
    const [Filtro,setFiltro]=useState({});
    const {Empresa,setEmpresa}=useContext(EmpresaContext);
    const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
    const [Fecha, setFecha] = useState(new Date());
    const [FechaString,setFechaString]=useState("");
    // const [Hora,setHora]=useState({Inicio:'',Fin:''})
    const [Hora,setHora]=useState("");

    useEffect(()=>{
        ListarPeliculas();
    },[IdSucursal,FechaString]);

    // const BndFiltroFecha=Boolean(FechaString);
    // const FiltroPeliculas=React.useMemo(()=>{
    //     let PeliculasFiltradas=[...Peliculas];
    //     if (BndFiltroFecha) {
    //         PeliculasFiltradas.forEach(element => {
    //             if (element.horarios.length>0) {
    //                 element.horarios=element.horarios.filter((horario)=>
    //                     horario.fecha.includes(FechaString)
    //                 )
    //             }    
    //         });
    //     }
    //     return PeliculasFiltradas;
    // },[Peliculas,FechaString]);

    async function ListarPeliculas(){
        let year=Fecha.getFullYear();
        let month=Fecha.getMonth()+1;
        let day=Fecha.getDate();
        let cadenafecha=year+'-'+month+'-'+day;
        setFechaString(cadenafecha);
        await axios.get('/api/peliculacartelera',{
            params:{
                idempresa:Empresa.idempresa,
                idsucursal:IdSucursal,
                fecha:FechaString
            }
        }
        ).then((res)=>{
          let data=res.data;
          setPeliculas(data);
        })
    }

    function IrAComprarEntrada(idpelicula,titulo,imgportada){
        navigate("/cine/peliculas/entradas",{state:{idpelicula:idpelicula,titulo:titulo,imgportada:imgportada,fecha:Fecha}});
    }
    function TransformarFecha(date){
        setFecha(date);
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let cadenafecha=year+'-'+month+'-'+day;
        setFechaString(cadenafecha);
    }

    return(
        <div>
            <div className="titlescinema">
				<p>Cartelera</p>
			</div>
            
            <div className="container-cartelera">
                <div className="">
                    <h1 className="text-center mb-2">Filtros</h1>
                    <h2 className="text-center mb-2"><Chip color="warning" variant="bordered">Fecha</Chip></h2>
                    <div className="flex justify-center mb-2">
                        <DatePicker selected={Fecha} onChange={(date) => TransformarFecha(date)} customInput={<Input label="Selecciona una Fecha" className="max-w-xs"></Input>}></DatePicker>
                    </div>
                </div>
                <div className="container-cartelera2">
                    {Peliculas.map((Pelicula)=>(
                        <div className="" key={Pelicula.idpelicula}>
                            <Card className="">
                                <CardBody>
                                    <div className="container-cartelera">
                                        <div className="banners">
                                            <figure>
                                                <img className="moviecartelera" src={url+Pelicula.imgportada} alt=""/>
                                            </figure>
                                        </div>
                                        <div className="container">
                                            <p style={{fontSize:"25px"}} className="mb-2">{Pelicula.titulo}</p>
                                            <Chip className="mb-2" color="warning" variant="flat">{Pelicula.categoria}</Chip> / {Pelicula.duracion} minutos <br />
                                            <Chip className="mb-2" color="warning" variant="dot" >Dirigida por:</Chip> {Pelicula.director} <br />
                                            <Chip className="mb-2" color="warning" variant="dot" >Reparto:</Chip> {Pelicula.reparto} <br />
                                            <Divider className="mb-2"/>
                                            <p className="mb-2">{Pelicula.sinopsis}</p>
                                            <Divider className="mb-2"/>
                                            {Pelicula.horarios.length>0 ? 
                                                <Chip className="mb-2" color="warning" variant="light">Horarios disponibles:</Chip>
                                            :null} <br />
                                            {Pelicula.horarios.length>0 ? Pelicula.horarios.map((horario)=>(
                                                <Chip key={horario.idhorariopelicula} className="mr-2">{horario.hora}</Chip>
                                            )):<Chip color="warning" variant="faded">Sin Horarios Disponibles</Chip>}
                                        </div>
                                    </div>
                                    <div className="banners">
                                    {Pelicula.horarios.length>0?(
                                                <Button className="btn" color="warning" onClick={()=>IrAComprarEntrada(Pelicula.idpelicula,Pelicula.titulo,Pelicula.imgportada)}>Conseguir entradas</Button>
                                            ):<Button className="btn" isDisabled>Conseguir entradas</Button>}
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
            <br /><br /><br />
            <div>
                <Footer/>
            </div>
        </div>
    )
}