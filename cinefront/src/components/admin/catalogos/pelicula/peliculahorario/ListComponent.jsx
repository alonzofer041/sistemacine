import React, { useEffect, useState } from "react";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import FormComponent from "./FormComponent";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { FormatearFecha } from "../../../../../helpers/functions";

export default function ListComponent(){
    const location=useLocation();
    const idpelicula=location.state?.idpelicula
    const titulo=location.state?.titulo

    const[PeliculaHorarioList,setPeliculaHorarioList]=useState([
        
    ]);
    useEffect(()=>{
        Lista();
    },[])
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    const [PeliculaHorario,setPeliculaHorario]=useState({
        idhorariopelicula:0,
        idpelicula:0,
        titulo: '',
        idsala:0,
        hora: '',
        fecha:''
    });


    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    function Lista(){
        axios.get("/api/horariopelicula",
        {params:{
            idpelicula:idpelicula
        }}
        ).then((res)=>{
            let data=res.data;
            setPeliculaHorarioList(data);
        });
    }
    function Limpiar(){
        setPeliculaHorario({...PeliculaHorario, idhorariopelicula:0, idsala:0,hora:''})
    }
    function Eliminar(index){
        setPeliculaHorario({...PeliculaHorario, idhorariopelicula:index})
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
    function Guardar(){
        var obj={
            idhorariopelicula:PeliculaHorario.idhorariopelicula,
            idpelicula:idpelicula,
            idsala:PeliculaHorario.idsala,
            hora:PeliculaHorario.hora,
            fecha:PeliculaHorario.fecha
        }
        if (obj.idhorariopelicula==0) {
            axios.post("/api/horariopelicula",obj).then((res)=>{
                Lista();
                onClose();
            });   
        }
        else{
            axios.post("/api/horariopelicula/"+PeliculaHorario.idhorariopelicula,obj).then((res)=>{
                Lista();
                onClose();
            });
        }
    }
    function Editar(index){
        let indexPeliculaHorario=PeliculaHorarioList.findIndex((element)=>element.idhorariopelicula==index);
        setPeliculaHorario({...PeliculaHorario,
            idhorariopelicula:index,
            idpelicula:PeliculaHorarioList[indexPeliculaHorario].idpelicula,
            idsala:PeliculaHorarioList[indexPeliculaHorario].idsala,
            hora:PeliculaHorarioList[indexPeliculaHorario].hora
        });
        onOpen();
    }
    return(
        <div>
            <ListGeneralComponent
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                EsModal={true}
                ShowInput={false}
                ShowPaginador={false} 
                Filtro={1}
                Titulo={"Horario"}
                NombreLista={titulo}
                EventoLimpiar={Limpiar}
                CabeceraTabla={
                   <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Titulo</TableColumn>
                        <TableColumn>Sala</TableColumn>
                        <TableColumn>Fecha</TableColumn>
                        <TableColumn>Horario</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                   </TableHeader> 
                }
                CuerpoTabla={
                    <TableBody items={PeliculaHorarioList}>
                        {(item)=>(
                            <TableRow key={item.idhorariopelicula}>
                                <TableCell>{item.idhorariopelicula}</TableCell>
                                <TableCell>{titulo}</TableCell>
                                <TableCell>{item.idsala}</TableCell>
                                <TableCell>{FormatearFecha(item.fecha)}</TableCell>
                                <TableCell>{item.hora}</TableCell>
                                <TableCell>
                                    <BtnAccionComponent MostrarBtnEditar={true} MostrarBtnEliminar={true}  
                                        EventoEditar={Editar}
                                        EventoEliminar={Eliminar}
                                        Id={item.idhorariopelicula}></BtnAccionComponent>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                }
            ></ListGeneralComponent>
            <Modal
                 Size="xl"
                 EventoGuardar={Guardar}
                 Titulo={"Agregar Horario"}
                 isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                 CuerpoFormulario={<FormComponent PeliculaHorario={PeliculaHorario} setPeliculaHorario={setPeliculaHorario}></FormComponent>}
            ></Modal>
            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/horariopelicula/'+PeliculaHorario.idhorariopelicula
                ).then((res)=>{
                    Lista();
                });
            }}
            didClose={()=>{
                Limpiar();
                setSwalProps({
                    show:false
                })
            }}></SweetAlert2>
        </div>
    )
}