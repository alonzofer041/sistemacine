import React, { useState, useEffect } from "react";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';

export default function ListComponent(){
    const location=useLocation();
    const idsala=location.state?.idsala;
    const numfilas=location.state?.numfilas;
    const [AsientosList,setAsientosList]=useState([ 
        
    ]);
    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    // USER STATE
    const [Asientos,setAsientos]=useState({
        idasiento:0,
        nombre:"",
        fila:""
    });

    function Lista(){
        axios.get("/api/asientos",{
            params:{
                idsala:idsala
            }
        }
        ).then((res)=>{
            let data=res.data;
            setAsientosList(data);
        });
    }
    function Limpiar(){
        setAsientos({...Asientos,idasiento:0,nombre:"",fila:""});
    }
    function Eliminar(index){
        setAsientos({...Asientos,idasiento:index});
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
        let indexAsientos=AsientosList.findIndex((element)=>element.idasiento==index);
        setAsientos({...Asientos,idasiento:index,
            nombre:AsientosList[indexAsientos].nombre,
            fila:AsientosList[indexAsientos].fila
        });
        onOpen();
    }
    function Guardar(){
        var obj={
            idasiento:Asientos.idasiento,
            idsala:idsala,
            nombre:Asientos.nombre,
            fila:Asientos.fila
        };
        if (obj.idasiento==0) {
            axios.post("/api/asientos",obj
            ).then((res)=>{
                Lista();
                onClose();
            });   
        }
        else{
            axios.post("/api/asientos/"+Asientos.idasiento,obj).then((res)=>{
                Lista();
                onClose();
            });
        }
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
                    <TableBody items={AsientosList}>
                        {(item)=>(
                            <TableRow key={item.idasiento}>
                                <TableCell>{item.idasiento}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.fila}</TableCell>
                                <TableCell>
                                    <BtnAccionComponent 
                                        MostrarBtnEditar={true} 
                                        MostrarBtnEliminar={true} 
                                        EventoEditar={Editar}
                                        EventoEliminar={Eliminar}
                                        Id={item.idasiento}></BtnAccionComponent>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Titulo={Asientos.idasiento==0 ? "Agregar Asiento" : "Editar Asiento"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Asientos={Asientos} setAsientos={setAsientos} NumFilas={numfilas}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/asientos/'+Asientos.idasiento
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