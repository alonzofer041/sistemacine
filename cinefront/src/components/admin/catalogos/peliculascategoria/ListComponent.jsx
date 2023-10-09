import React from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
export default function ListComponent(){
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // USER STATE
    const [PeliculaCategoria,setPeliculaCategoria]=useState({
        idpeliculacategoria:0,
        nombre:""
    });
    const [PeliculasCategoriaList,setPeliculasCategoriaList]=useState([
        {idpeliculacategoria:0,nombre:''}
    ]);
    
    function Lista(){
        axios.get("/api/peliculacategoria"
        ).then((res)=>{
            let data=res.data;
            setPeliculasCategoriaList(data);
        });
    }
    function Limpiar(){
        setPeliculaCategoria({...PeliculaCategoria,idpeliculacategoria:0,nombre:""});
    }
    function Eliminar(index){
        setPeliculaCategoria({...PeliculaCategoria,idpeliculacategoria:index});
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
        let indexPeliculaCategoria=PeliculasCategoriaList.findIndex((element)=>element.idpeliculacategoria==index);
        setPeliculaCategoria({...PeliculaCategoria,idpeliculacategoria:index,nombre:PeliculasCategoriaList[indexPeliculaCategoria].nombre});
        onOpen();
    }
    function Guardar(){
        var obj={
            idpeliculacategoria:PeliculaCategoria.idpeliculacategoria,
            nombre:PeliculaCategoria.nombre
        };
        if (obj.idpeliculacategoria==0) {
            axios.post("/api/peliculacategoria",obj).then((res)=>{Lista()});   
        }
        else{
            axios.post("/api/peliculacategoria/"+PeliculaCategoria.idpeliculacategoria,obj).then((res)=>Lista());
        }
    }

    // LLAMADA INICIAL
    Lista();
    
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
                        <TableRow key={item.idpeliculacategoria}>
                            <TableCell>{item.idpeliculacategoria}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true} 
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idpeliculacategoria}></BtnAccionComponent>
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

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/peliculacategoria/'+PeliculaCategoria.idpeliculacategoria
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