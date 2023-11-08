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
import { MensajeAdvertencia } from "../../../../helpers/functions";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [ErrorValidacion,setErrorValidacion]=useState([]);

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
        
    ]);
    // ESTADO DE ARCHIVO
    const [File,setFile]=useState({});
    function Lista(){
        axios.get('/api/pelicula',{
            params:{
                origen:'admin'
            }
        }
        ).then((res)=>{
            let data=res.data;
            setPeliculaList(data);
            // console.log(import.meta.env.VITE_ASSET_URL);
        }).finally(()=>{
        });
    }
    function Limpiar(){
        setFile(null);
        setErrorValidacion([]);
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
        Limpiar();
        let indexPelicula=PeliculaList.findIndex((element)=>element.idpelicula==index);
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
            imgportada:PeliculaList[indexPelicula].imgportada
        }
        );
        onOpen();
    }
    function Navegar(idpelicula,titulo){
        navigate('/peliculahorario',{state:{idpelicula:idpelicula,titulo:titulo}})
    }
    function Guardar(){
        let mensajes=[];
        if (Object.is(File,null)) {
            mensajes.push("Debe seleccionar una imagen");
        }
        if (Pelicula.idpeliculacategoria=="") {
            mensajes.push("Debe seleccionar una categoría");
        }
        if (mensajes.length>0){
            mensajes.forEach((mensaje)=>{
                MensajeAdvertencia(mensaje);
            });
            return false;
        }
        var obj={
            idpelicula:Pelicula.idpelicula,
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
        if (obj.idpelicula==0) {
            axios.post("/api/pelicula",obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
        else{
            axios.post("/api/pelicula/"+Pelicula.idpelicula,obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
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
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Pelicula={Pelicula} setPelicula={setPelicula} File={File} setFile={setFile} Errores={ErrorValidacion}/>}></Modal>

            <SweetAlert2 {...swalProps}
                onConfirm={()=>{
                    axios.delete('/api/pelicula/'+Pelicula.idpelicula
                    ).then((res)=>{
                        Lista();
                    });
                }}
                didClose={()=>{
                    Limpiar();
                    setSwalProps({
                        show:false
                    })
                }}
            ></SweetAlert2>
        </div>
    )  
}