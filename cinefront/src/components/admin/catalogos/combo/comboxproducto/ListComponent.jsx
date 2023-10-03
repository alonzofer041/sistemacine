import React from "react";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ListComponent(){
    const location=useLocation();
    const idcombo=location.state?.idcombo;
    const nombre=location.state?.nombre;
    const [ComboDetalle,setComboDetalle]=useState({
        idcombodetalle:0,
        idproducto:0,
        idcombo:0,
        nombre:'',
        cantidad:0,
        valor:0
    })
    const [ComboDetalleList,setComboDetalleList]=useState([]);
    function Lista(){
    
    }
    function Limpiar(){
        setComboDetalle({...ComboDetalle,idproducto:0,cantidad:0,valor:0,nombre:''});
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
                 Titulo={"Elementos de " + nombre}
                 NombreLista={"Listados de Combos"}
                 EventoLimpiar={Limpiar}
                 CabeceraTabla={
                     <TableHeader>
                         <TableColumn>#</TableColumn>
                         <TableColumn>Nombre</TableColumn>
                         <TableColumn>Valor</TableColumn>
                         <TableColumn>Cantidad</TableColumn>
                         <TableColumn>Acciones</TableColumn>
                     </TableHeader>
                 }
                 CuerpoTabla={
                    <TableBody items={ComboDetalleList}>
                    {(item)=>(
                        <TableRow key={item.idcombodetalle}>
                            <TableCell>{item.idcombodetalle}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.cantidad}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
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
                Titulo={"Agregar Producto a "+nombre} 
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                CuerpoFormulario={
                    <FormComponent ComboDetalle={ComboDetalle} setComboDetalle={setComboDetalle}></FormComponent>
                }
            ></Modal>
        </div>
    )
}