import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Link ,Image} from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../pelicula/FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const navigate=useNavigate();
    const [Pelicula,setPelicula]=useState({
        idpelicula:0,
        idpeliculacategoria:'',
        titulo:'',
        sinopsis:'',
        fechaestreno:'',
        aniorealizacion:'',
        director:'',
        reparto:'',
        duracion:'',
        productora:'',
        distribuidora:'',
        imgportada:''
    });
    const [PeliculaList,setPeliculaList]=useState([
        // {idpelicula:1,titulo:'star wars',fechaestreno:'23 de diciembre de 1977',director:'George Lucas',productora:'lucasfilm',duracion:'121 minutos'}
        // {idpelicula:0,titulo:'',fechaestreno:'',director:'',productora:'',duracion:''}
    ]);
    // ESTADO DE ARCHIVO
    const [File,setFile]=useState({});
    function Lista(){
        axios.get('/api/pelicula'
        ).then((res)=>{
            let data=res.data;
            setPeliculaList(data);
            // console.log(import.meta.env.VITE_ASSET_URL);
        })
    }
    function Limpiar(){
        setPelicula({...Pelicula,
            idpelicula:0,
            idpeliculacategoria:'',
            titulo:'',
            sinopsis:'',
            fechaestreno:'',
            aniorealizacion:'',
            director:'',
            reparto:'',
            duracion:'',
            productora:'',
            distribuidora:'',
            imgportada:'',
        });
    }
    function Eliminar(index){
        setPelicula({...Pelicula,idpelicula:index});
        setSwalProps({
            icon:'warning',
            show: true,
            title: 'Eliminar',
            text: '¿Seguro que quiere eliminar este dato?',
            confirmButtonText:'Si',
            showConfirmButton:true,
            showDenyButton:true
        }); 
    }
    function Editar(index){
        let indexPelicula=PeliculaList.find((element)=>element.idpelicula=index);
        setPelicula({
            ...Pelicula,
            idpelicula:index,
            idpeliculacategoria:PeliculaList[indexPelicula].idpeliculacategoria,
            titulo:PeliculaList[indexPelicula].titulo,
            sinopsis:PeliculaList[indexPelicula].sinopsis,
            fechaestreno:PeliculaList[indexPelicula].fechaestreno,
            aniorealizacion:PeliculaList[indexPelicula].aniorealizacion,
            director:PeliculaList[indexPelicula].director,
            reparto:PeliculaList[indexPelicula].reparto,
            duracion:PeliculaList[indexPelicula].duracion,
            productora:PeliculaList[indexPelicula].productora,
            distribuidora:PeliculaList[indexPelicula].distribuidora,
            imgportada:PeliculaList[indexPelicula].imgportada,
        });
        onOpen();
    }
    function Navegar(idpelicula,titulo){
        navigate('/peliculahorario',{state:{idpelicula:idpelicula,titulo:titulo}})
    }
    function Guardar(){
        var obj={
            idpeliculacategoria:Pelicula.idpeliculacategoria,
            titulo:Pelicula.titulo,
            sinopsis:Pelicula.sinopsis,
            aniorealizacion:Pelicula.aniorealizacion,
            director:Pelicula.director,
            reparto:Pelicula.reparto,
            duracion:Pelicula.duracion,
            productora:Pelicula.productora,
            distribuidora:Pelicula.distribuidora,
            files:File
        }
        axios.post('/api/pelicula',obj,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{Lista()});
        // let formData=new FormData();
        // formData.set("idpeliculacategoria",Pelicula.idpeliculacategoria);
        // formData.set("titulo",Pelicula.titulo);
        // formData.set("sinopsis",Pelicula.sinopsis);
        // formData.set("aniorealizacion",Pelicula.aniorealizacion);
        // formData.set("director",Pelicula.director);
        // formData.set("reparto",Pelicula.reparto);
        // formData.set("duracion",Pelicula.duracion);
        // formData.set("productora",Pelicula.productora);
        // formData.set("distribuidora",Pelicula.distribuidora);
        // formData.append("files",File);
        // axios.post("/api/pelicula",formData,{
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // }).then(()=>{});
    }
    // Lista();
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={1} 
            Titulo={"Películas"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Portada</TableColumn>
                    <TableColumn>Título</TableColumn>
                    <TableColumn>Fecha de Estreno</TableColumn>
                    <TableColumn>Director</TableColumn>
                    <TableColumn>Productora</TableColumn>
                    <TableColumn>Duración</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={PeliculaList}>
                    {(item)=>(
                        <TableRow key={item.idpelicula}>
                            <TableCell>{item.idpelicula}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgportada}></Image>}</TableCell>
                            <TableCell>{item.titulo}</TableCell>
                            <TableCell>{item.fechaestreno}</TableCell>
                            <TableCell>{item.director}</TableCell>
                            <TableCell>{item.productora}</TableCell>
                            <TableCell>{item.duracion}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    
                                    BotonesAdicionales={
                                        <Button as={Link} variant="light" onClick={()=>Navegar(item.idpelicula,item.titulo)}>Asignar Horarios</Button>
                                    }
                                    ></BtnAccionComponent>
                            </TableCell>
                            
                        </TableRow>
                        
                    )}
                </TableBody>
            }
            ></ListGeneralComponent>
            <Modal
            Size="xl"
            EventoGuardar={Guardar}
            Titulo={"Agregar Película"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Pelicula={Pelicula} setPelicula={setPelicula} File={File} setFile={setFile}/>}></Modal>
        </div>
    )  
}