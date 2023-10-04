import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";

export default function ListComponent(){
    const [ProvedorData,setProvedorData]=useState({
        nombre:"",
        email:"",
        direccion:"",
        numero:"",
        estado:"",
        ciudad:""
    });
    const [ProvedorList,setNombreProvedorList]=useState([
        {key:"1",nombre:"Coca-cola", direccion:"C 29 #456 Col.Emiliano Zapata", email:"coca_cola@gmail.com", numero:"9992354120", estado:"Yucatan", ciudad:"Merida"},
        
    ]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){
        fetch('/api/listaprovedores').then((res)=>console.log(res));
        
    }
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={""} 
            Titulo={"Provedores"}
            NombreLista={"Configuración"}
            
            
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Provedor</TableColumn>
                    <TableColumn>Direccion</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Numero</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Ciudad</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={ProvedorList}>
                    {(item)=>(
                        <TableRow key={item.key}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.numero}</TableCell>
                            <TableCell>{item.estado}</TableCell>
                            <TableCell>{item.ciudad}</TableCell>
                            <TableCell>
                                <BtnAccionComponent MostrarBtnEditar={true} MostrarBtnEliminar={true}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Size={"xl"}
            Titulo={"Agregar Provedor"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent ProvedorData={ProvedorData} setProvedorData={setProvedorData}/>}></Modal>
        
        </div>

    )
}