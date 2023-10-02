import React, { useEffect, useState } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { Button, TableBody, TableCell, TableColumn,TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../sala/FormComponent";
import Modal from "../../../base/ModalComponent";
import { Link, useNavigate } from "react-router-dom";

const ListaPrueba=[
    {key:"1",idsala:"1",nombre:"sala 1",ubicacion:"a la vuelta"},
    {key:"2",idsala:"2",nombre:"sala 2",ubicacion:"al fondo"},
];
export default function ListComponent(){
    const navigate=useNavigate();
    const[Sala,setSala]=useState({
        idsala:0,
        idempresa:0,
        idsucursal:0,
        nombre:'',
        ubicacion:''
    })
    // const[ListaPrueba,setListaPrueba]=useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen2, onOpen2, onOpenChange2} = useDisclosure();
    const [Filtro,setFiltro]=useState(0);
    // useEffect(()=>{})
    function click(e){
        e.preventDefault();
        setFiltro(Filtro+1);
    }
    function Guardar(){
        
    }
    function Navegar(idsala){
        navigate('/salaasiento',{state:{idsala:idsala}});
    }
    return(
        <div>
            <ListGeneralComponent
                EsModal={true}
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} 
                Filtro={Filtro} 
                Titulo={"Salas"}
                NombreLista={"Configuración"}
                CabeceraTabla={
                    <TableHeader>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Ubicacion</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                }
                CuerpoTabla={
                    <TableBody items={ListaPrueba}>
                        {(item)=>(
                            <TableRow>
                                <TableCell className="fuenteprueba">{item.nombre}</TableCell>
                                <TableCell>{item.ubicacion}</TableCell>
                                <TableCell>
                                    <BtnAccionComponent 
                                        MostrarBtnEditar={true} 
                                        MostrarBtnEliminar={true}
                                        BotonesAdicionales={
                                        <>
                                           <Button variant="light" onClick={()=>Navegar(item.idsala)} className="ml-2">Asignar asientos</Button>    
                                        </>}
                                    ></BtnAccionComponent>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                }
                >
                </ListGeneralComponent>
                <Modal
                 Size="xl"
                 EventoGuardar={Guardar}
                 Titulo={"Agregar Sala"} 
                 isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                 CuerpoFormulario={<FormComponent Sala={Sala} setSala={setSala}/>}></Modal>

        </div>
    )
}