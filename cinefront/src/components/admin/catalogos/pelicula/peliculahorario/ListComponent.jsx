import React, { useState } from "react";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import FormComponent from "./FormComponent";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";

export default function ListComponent(){
    const location=useLocation();
    const idpelicula=location.state?.idpelicula
    const titulo=location.state?.titulo
    const [PeliculaHorario,setPeliculaHorario]=useState({
        idpelicula:0,
        titulo: "",
        idsala:0,
        idhorario:0,
        horario: 0,
    });
    const[PeliculaHorarioList,setPeliculaHorarioList]=useState([
        {idpelicula:'1',idsala:'A1',idhorario:'1', titulo:"star wars" ,horario:'23/12/1977 15:15'},
        
    ]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Lista(){

    }
    function Limpiar(){

    }
    function Eliminar(index){

    }
    function Guardar(){

    }
    function Editar(index){

    }
    return(
        <div>
            <ListGeneralComponent
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                EsModal={true}
                Filtro={1} 
                Titulo={"Horario"}
                NombreLista={titulo}
                EventoLimpiar={Limpiar}
                CabeceraTabla={
                   <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Titulo</TableColumn>
                        <TableColumn>Sala</TableColumn>
                        <TableColumn>Horario</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                   </TableHeader> 
                }
                CuerpoTabla={
                    <TableBody items={PeliculaHorarioList}>
                        {(item)=>(
                            <TableRow key={item.idpelicula}>
                                <TableCell>{item.idpelicula}</TableCell>
                                <TableCell>{item.titulo}</TableCell>
                                <TableCell>{item.idsala}</TableCell>
                                <TableCell>{item.horario}</TableCell>
                                <TableCell>
                                    <BtnAccionComponent MostrarBtnEditar={true} MostrarBtnEliminar={true}></BtnAccionComponent>
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
        </div>
    )
}