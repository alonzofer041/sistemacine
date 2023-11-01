import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { MensajeExito } from "../../../../helpers/functions";
import FormCorreoComponent from "./FormCorreoComponent";

export default function ListComponent(){
    const location=useLocation();
    const idempresa=location.state?.idempresa;
    const nombrecomercial=location.state?.nombrecomercial;

    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    // const {isOpen2, onOpen2, onOpenChange2} = useDisclosure();
    // USER STATE
    const [Sucursal,setSucursal]=useState({
        idsucursal:0,
        idempresa:0,
        nombre:"",
        direccion:"",
        telefono:"",
        email:""
    });
    const [ErrorValidacion,setErrorValidacion]=useState([]);
    const [SucursalList,setSucursalList]=useState([
        
    ]);
    const [NombreModal,setNombreModal]=useState("");
    
    const [DatosCorreo,setDatosCorreo]=useState({
        email:'',
        destinatario:''
    })

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
        setErrorValidacion([]);
        setNombreModal("Catalogo");
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
        Limpiar();
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
            axios.post("/api/sucursal",obj
            ).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });   
        }
        else{
            axios.post("/api/sucursal/"+Sucursal.idsucursal,obj
            ).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });;
        }
    }
    function AbrirModalCorreo(index){
        let indexSucursal=SucursalList.findIndex((element)=>element.idsucursal==index);
        setSucursal({...Sucursal,idsucursal:index,
            nombre:SucursalList[indexSucursal].nombre,
        });
        setNombreModal("Correo");
        onOpen();
    }
    function EnviarCorreoRegistro(){
        let obj={
            nombre:nombrecomercial,
            sucursal:Sucursal.nombre,
            idempresa:idempresa,
            idsucursal:Sucursal.idsucursal,
            email:DatosCorreo.email,
            destinatario:DatosCorreo.destinatario
        }
        axios.post("/api/empresaRegistro",obj
        ).then((res)=>{
            MensajeExito("Correo Enviado");
        })
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
                                    Id={item.idsucursal}
                                    BotonesAdicionales={<Button onClick={()=>{AbrirModalCorreo(item.idsucursal);}}>Enviar Correo</Button>}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={NombreModal=="Catalogo" ? Guardar : EnviarCorreoRegistro}
            Titulo={NombreModal=="Catalogo" ? (Sucursal.idsucursal==0 ? "Agregar Sala" : "Editar Sala") : "Enviar Correo de Registro de Usuario"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={
                NombreModal=="Catalogo" ?
                (<FormComponent Sucursal={Sucursal} setSucursal={setSucursal} Errores={ErrorValidacion}/>) :
                (<FormCorreoComponent DatosCorreo={DatosCorreo} setDatosCorreo={setDatosCorreo}/>)
            }></Modal>


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