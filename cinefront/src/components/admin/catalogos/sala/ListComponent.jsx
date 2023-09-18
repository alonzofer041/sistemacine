import React, { useState } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableBody, TableCell, TableColumn,TableHeader, TableRow, useDisclosure } from "@nextui-org/react";

const ListaPrueba=[
    {key:"1",nombre:"sala 1",ubicacion:"a la vuelta"},
    {key:"2",nombre:"sala 2",ubicacion:"al fondo"},
];
export default function ListComponent(){
    // const[ListaPrueba,setListaPrueba]=useState([]);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [Filtro,setFiltro]=useState(0);
    function click(e){
        e.preventDefault();
        setFiltro(Filtro+1);
    }
    return(
        <ListGeneralComponent
        isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} 
        Filtro={Filtro} 
        Titulo={"Salas"}
        NombreLista={"Configuración"}
        CabeceraTabla={
            <TableHeader>
                <TableColumn>Nombre</TableColumn>
                <TableColumn>Ubicacion</TableColumn>
            </TableHeader>
        }
        CuerpoTabla={
            <TableBody items={ListaPrueba}>
                {(item)=>(
                    <TableRow>
                        <TableCell>{item.nombre}</TableCell>
                        <TableCell>{item.ubicacion}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        }
        >
        </ListGeneralComponent>
    )
}