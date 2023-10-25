import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';

export default function ListComponent(){
    const location=useLocation();
    const idempresa=location.state?.idempresa;
    const nombrecomercial=location.state?.nombrecomercial;

    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // USER STATE
    const [Sucursal,setSucursal]=useState({
        idsucursal:0,
        idempresa:0,
        nombre:"",
        direccion:"",
        telefono:"",
        email:""
    });
    const [SucursalList,setSucursalList]=useState([
        
    ]);
    
    function Lista(){
        axios.get("/api/sucursal",{
            params:{
                idempresa:idempresa
            }
        }
        ).then((res)=>{
            let data=res.data;
            setSucursalList(data);
        });
    }
    function Limpiar(){
        setSucursal({...Sucursal,idsucursal:0,idempresa:0,nombre:"",direccion:"",telefono:"",email:""});
    }
    function Eliminar(index){
        setSucursal({...Sucursal,idsucursal:index});
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
        let indexSucursal=SucursalList.findIndex((element)=>element.idsucursal==index);
        setSucursal({...Sucursal,idsucursal:index,
            nombre:SucursalList[indexSucursal].nombre,
            direccion:SucursalList[indexSucursal].direccion,
            telefono:SucursalList[indexSucursal].telefono,
            email:SucursalList[indexSucursal].email
        });
        onOpen();
    }
    function Guardar(){
        var obj={
            idsucursal:Sucursal.idsucursal,
            idempresa:idempresa,
            nombre:Sucursal.nombre,
            direccion:Sucursal.direccion,
            telefono:Sucursal.telefono,
            email:Sucursal.email
        };
        if (obj.idsucursal==0) {
            axios.post("/api/sucursal",obj).then((res)=>{Lista()});   
        }
        else{
            axios.post("/api/sucursal/"+Sucursal.idsucursal,obj).then((res)=>Lista());
        }
    }

    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={1} 
            Titulo={"Sucursales"}
            NombreLista={nombrecomercial}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Dirección</TableColumn>
                    <TableColumn>Teléfono</TableColumn>
                    <TableColumn>Correo electrónico</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={SucursalList}>
                    {(item)=>(
                        <TableRow key={item.idsucursal}>
                            <TableCell>{item.idsucursal}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true} 
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idsucursal}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Titulo={Sucursal.idsucursal==0 ? "Agregar Sala" : "Editar Sala"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Sucursal={Sucursal} setSucursal={setSucursal}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/sucursal/'+Sucursal.idsucursal
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