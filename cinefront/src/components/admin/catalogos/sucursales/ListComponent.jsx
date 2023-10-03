import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../sucursales/FormComponent";
import { useState } from "react";
import axios from "axios";
export default function ListComponent(){
    const[Sucursal,setSucursal]=useState({
        idsucursal:0,
        idempresa:0,
        nombre:'',
        direccion:'',
        telefono:'',
        email:''
    });
    const [SucursalList,setSucursalList]=useState([
        {key:"1",idsucursal:"1",nombre:"colectivo",direccion:'calle 99 425 A dolores otero',telefono:'99987788',email:'email@gmail.com'},
        {key:"2",idsucursal:"1",nombre:"norte",direccion:'calle 34 257 san ramon',telefono:'999766777',email:'norte@gmail.com'},
        {key:"3",idsucursal:"1",nombre:"klub",direccion:'la isla',telefono:'9998077678',email:'cine@klub.fr'}
    ]);
    function Lista(){
    
    }
    function Limpiar(){
        setSucursal({...Sucursal,
            idsucursal:0,
            idempresa:0,
            nombre:'',
            direccion:'',
            telefono:'',
            email:''
        })
    }
    function Eliminar(index){
        
    }
    function Editar(index){
    
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){

    }
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={1} 
            Titulo={"Sucursales"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Direccion</TableColumn>
                    <TableColumn>Telefono</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={SucursalList}>
                    {(item)=>(
                        <TableRow key={item.key}>
                            <TableCell>{item.idsucursal}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    BotonesAdicionales={<><Button variant="light">Ver salas</Button></>}>
                                </BtnAccionComponent>
                            </TableCell>
                        </TableRow>
    )}
                </TableBody>
            }></ListGeneralComponent>
            <Modal
            Size="xl"
            EventoGuardar={Guardar}
            Titulo={"Agregar Sucursal"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Sucursal={Sucursal} setSucursal={setSucursal}/>}></Modal>
        </div>
    )
}