import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import Modal from "../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ListComponent(){
    const navigate=useNavigate();
    const [Combo,setCombo]=useState({
        idcombo:0,
        nombre:'',
        valor:0,
        imgcombo:'',
    });
    const[ComboList,setComboList]=useState([
        {idcombo:1,nombre:'combo amigos',valor:'216',imgcombo:'nada.png'},
        {idcombo:2,nombre:'combo pareja',valor:'220',imgcombo:'nada.png'}
    ]);
    function Lista(){
    
    }
    function Limpiar(){
        setCombo({...Combo,
        idcombo:0,nombre:'',valor:0,imgcombo:''});
    }
    function Eliminar(index){
        
    }
    function Editar(index){
    
    }
    function Navegar(idcombo,nombre){
        navigate('/combodetalle',{state:{idcombo:idcombo,nombre:nombre}});
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){

    }
    return (
        <div>
            <ListGeneralComponent
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                EsModal={true}
                Filtro={1} 
                Titulo={"Combos"}
                NombreLista={"Configuración"}
                EventoLimpiar={Limpiar}
                CabeceraTabla={
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Valor</TableColumn>
                        <TableColumn>Imagen</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                }
                CuerpoTabla={
                    <TableBody items={ComboList}>
                    {(item)=>(
                        <TableRow key={item.idcombo}>
                            <TableCell>{item.idcombo}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.imagen}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    BotonesAdicionales={
                                        <Button onClick={()=>Navegar(item.idcombo,item.nombre)}>Asignar Productos</Button>
                                    }
                                    ></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                }
            ></ListGeneralComponent>
             <Modal
            Size="xl"
            EventoGuardar={Guardar}
            Titulo={"Agregar Combo"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Combo={Combo} setCombo={setCombo}/>}></Modal>
        </div>
    )
}