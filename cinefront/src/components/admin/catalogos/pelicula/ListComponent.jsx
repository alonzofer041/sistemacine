import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../pelicula/FormComponent";
import { useState } from "react";
import axios from "axios";
export default function ListComponent(){
    const [Pelicula,setPelicula]=useState({
        idpelicula:0,
        idpeliculacategoria:0,
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
        {idpelicula:1,titulo:'star wars',fechaestreno:'23 de diciembre de 1977',director:'George Lucas',productora:'lucasfilm',duracion:'121 minutos'}
    ]);
    function Lista(){
    
    }
    function Limpiar(){
        setPelicula({...Pelicula,
            idpelicula:0,
            titulo:'',
            sinopsis:'',
            fechaestreno:'',
            aniorealizacion:'',
            director:'',
            reparto:'',
            duracion:'',
            productora:'',
            distribuidora:'',
            imgportada:''});
    }
    function Eliminar(index){
        
    }
    function Editar(index){
    
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){
        var obj={
            titulo:Pelicula.titulo,
            sinopsis:Pelicula.sinopsis,
            aniorealizacion:Pelicula.aniorealizacion,
            director:Pelicula.director,
            reparto:Pelicula.reparto,
            duracion:Pelicula.duracion,
            productora:Pelicula.productora,
            distribuidora:Pelicula.distribuidora,
        }
        axios.post('http://127.0.0.1:5001/api/pelicula',obj).then((res)=>{console.log(res)});
    }
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
                            <TableCell>{item.titulo}</TableCell>
                            <TableCell>{item.fechaestreno}</TableCell>
                            <TableCell>{item.director}</TableCell>
                            <TableCell>{item.productora}</TableCell>
                            <TableCell>{item.duracion}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
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
            CuerpoFormulario={<FormComponent Pelicula={Pelicula} setPelicula={setPelicula}/>}></Modal>
        </div>
    )  
}