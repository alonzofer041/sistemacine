import React, { useEffect, useMemo } from "react";
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

    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });

    const [PeliculaCategoria,setPeliculaCategoria]=useState({
        idpeliculacategoria:0,
        nombre:""
    });
    const [PeliculasCategoriaList,setPeliculasCategoriaList]=useState([
        {idpeliculacategoria:0,nombre:''}
    ]);

    useEffect(()=>{
        Lista();
    },[]);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let PeliculaCategoriaFiltrado=[...PeliculasCategoriaList];
        if (BndFiltro) {
            PeliculaCategoriaFiltrado=PeliculaCategoriaFiltrado.filter((PeliculaCategoriaElement)=>
                PeliculaCategoriaElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return PeliculaCategoriaFiltrado;
    },[PeliculasCategoriaList,Filtro.Nombre]);
    
    const Paginator=React.useMemo(()=>{
        return ItemsFiltro?.length ? Math.ceil(ItemsFiltro.length/Filtro.NumFilas) : 0;
    },[ItemsFiltro?.length,Filtro.NumFilas]);

    const ItemsPaginado=React.useMemo(()=>{
        const Inicio=(Filtro.Pagina-1)*Filtro.NumFilas;
        const Fin=Inicio+Filtro.NumFilas;
        return ItemsFiltro.slice(Inicio,Fin);
    },[Filtro.Pagina,ItemsFiltro,Filtro.NumFilas]);
    
    // METODOS
    function Lista(){
        axios.get("/api/peliculacategoria"
        ).then((res)=>{
            let data=res.data;
            setPeliculasCategoriaList(data);
            // setFiltro({...Filtro});
        }).finally(()=>{
            // SetPaginator();
        });
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
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


    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={Filtro}
            setFiltro={setFiltro}
            FiltroEvento={FiltrarLista} 
            TotalElementos={ItemsFiltro.length}
            Titulo={"Géneros de Películas"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={ItemsPaginado}>
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
            Titulo={PeliculaCategoria.idpeliculacategoria==0 ? "Agregar Género" : "Editar Género"} 
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