import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
export default function ListComponent(){
    // USER STATE
    const [PeliculaCategoria,setPeliculaCategoria]=useState({
        nombre:""
    });
    const [PeliculasCategoriaList,setPeliculasCategoriaList]=useState([
        {key:"1",nombre:"Terror"},
        {key:"2",nombre:"Magia"},
        {key:"3",nombre:"Accion"},
    ]);
    
    function Lista(){

    }
    function Limpiar(){
        setPeliculaCategoria({...PeliculaCategoria,nombre:""});
    }
    function Eliminar(index){
        
    }
    function Editar(index){

    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){
        fetch('/api/peliculacategoria').then((res)=>console.log(res));
        // console.log(PeliculaCategoria.nombre);
    }
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={1} 
            Titulo={"Géneros de Películas"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={PeliculasCategoriaList}>
                    {(item)=>(
                        <TableRow key={item.key}>
                            <TableCell>{item.key}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
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
            Titulo={"Agregar Genero"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent PeliculaCategoria={PeliculaCategoria} setPeliculaCategoria={setPeliculaCategoria}/>}></Modal>
        </div>

    )
}