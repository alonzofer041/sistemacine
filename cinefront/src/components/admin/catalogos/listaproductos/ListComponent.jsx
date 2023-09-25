import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";

export default function ListComponent(){
    const [ProductoData,setProductoData]=useState({
        nombre:"",
        precio: 0,
        cantidad: 0,
    });
    const [ProductoList,setProductoList]=useState([
        {key:"1",nombre:"Palomitas grandes", precio:"$"+250, cantidad:3},
        {key:"2",nombre:"Nachos Grandes", precio:"$"+90, cantidad:5},
        {key:"3",nombre:"Hot-dog", precio:"$"+ 60, cantidad:9},
        
    ]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){
        fetch('/api/listaproductos').then((res)=>console.log(res));
        
    }
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={""} 
            Titulo={"Producto"}
            NombreLista={"Configuración"}
            
            
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Producto</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                   
                    <TableColumn></TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={ProductoList}>
                    {(item)=>(
                        <TableRow key={item.key}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.precio}</TableCell>
                            <TableCell>{item.cantidad}</TableCell>
                            
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
            Titulo={"Agregar Producto"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent ProductoData={ProductoData} setProductoData={setProductoData}/>}></Modal>
        
        </div>

    )
}