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
import { MensajeAdvertencia } from "../../../../../helpers/functions";

export default function ListComponent(){
    const location=useLocation();
    const idpelicula=location.state?.idpelicula;
    const titulo=location.state?.titulo;
    const duracion=location.state?.duracion;

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

    const [FechaSeleccionada,setFechaSeleccionada]=useState(null);


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
        let mensajes=[];
        if (PeliculaHorario.idsala==0) {
            mensajes.push("Debe seleccionar una sala");
        }
        if (mensajes.length>0){
            mensajes.forEach((mensaje)=>{
                MensajeAdvertencia(mensaje);
            });
            return false;
        }
        let FechaMinutos=new Date(FechaSeleccionada.getTime()-Number(duracion)*60000);
        let hour=FechaMinutos.getHours();
        let minutes=FechaMinutos.getMinutes();
        let HoraIntervalo=hour+':'+minutes+':00';
        // console.log(HoraIntervalo);
        // return false;

        axios.get("/api/horariosvalidacion",{
            params:{
                idsala:PeliculaHorario.idsala,
                fecha:PeliculaHorario.fecha,
                hora:PeliculaHorario.hora+':00',
                horaintervalo:HoraIntervalo
            }
        }
        ).then((res)=>{
            res.data.validacionmismohorario.forEach((horario)=>{
                // console.log(horario.fecha.substring(0,10));
                if (PeliculaHorario.fecha==horario.fecha.substring(0,10) || PeliculaHorario.hora==horario.hora) {
                    mensajes.push("Este horario ya está asignado");
                }
            });
            // console.log(res.data.validacionperiodo);
            if (res.data.validacionperiodo.length>0) {
                mensajes.push("La función de la película aún no termina en la hora seleccionada");
            }
        }).finally(()=>{
            // console.log(new Date(FechaSeleccionada.getTime()-Number(duracion)*60000));
            // return false;
            if (mensajes.length>0){
                mensajes.forEach((mensaje)=>{
                    MensajeAdvertencia(mensaje);
                });
                return false;
            }
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
        })

        
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
                 CuerpoFormulario={<FormComponent 
                    PeliculaHorario={PeliculaHorario} 
                    setPeliculaHorario={setPeliculaHorario} 
                    FechaSeleccionada={FechaSeleccionada} 
                    setFechaSeleccionada={setFechaSeleccionada}></FormComponent>}
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