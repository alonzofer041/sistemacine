import React, { useState } from "react";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
export default function ListComponent(){
    const location=useLocation();
    const idsala=location.state?.idsala
    const [SalaAsientos,setSalaAsientos]=useState({
        idsalaasiento:0,
        idsala:0,
        nombre:'',
        fila:''
    });
    const[SalaAsientosList,setSalaAsientosList]=useState([
        {idsalaasiento:'1',idsala:'1',nombre:'A1',fila:'A'},
        {idsalaasiento:'2',idsala:'1',nombre:'B1',fila:'B'}
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
                Titulo={"Asientos"}
                NombreLista={"Sala "+idsala}
                EventoLimpiar={Limpiar}
                CabeceraTabla={
                   <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Fila</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                   </TableHeader> 
                }
                CuerpoTabla={
                    <TableBody items={SalaAsientosList}>
                        {(item)=>(
                            <TableRow key={item.idsalaasiento}>
                                <TableCell>{item.idsalaasiento}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.fila}</TableCell>
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
                 Titulo={"Agregar Asiento"}
                 isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                 CuerpoFormulario={<FormComponent SalaAsientos={SalaAsientos} setSalaAsientos={setSalaAsientos}></FormComponent>}
            ></Modal>
        </div>
    )
}