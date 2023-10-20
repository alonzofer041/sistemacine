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

     const [ProductoCategoria,setProductoCategoria]=useState({
        idproductocategoria:0,
        nombre:""
    });
    const [ProductoCategoriaList,setProductoCategoriaList]=useState([
        {idproductocategoria:0,nombre:''}
    ]);

    useEffect(()=>{
        Lista();
    },[]);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let ProductoCategoriaFiltrado=[...ProductoCategoriaList];
        if (BndFiltro) {
            ProductoCategoriaFiltrado=ProductoCategoriaFiltrado.filter((ProductoCategoriaElement)=>
                ProductoCategoriaElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return ProductoCategoriaFiltrado;
    },[ProductoCategoriaList,Filtro.Nombre]);
    
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
        axios.get("/api/productocategoria"
        ).then((res)=>{
            let data=res.data;
            setProductoCategoriaList(data);
        }).finally(()=>{
        });
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setProductoCategoria({...ProductoCategoria,idproductocategoria:0,nombre:""});
    }
    function Eliminar(index){
        setProductoCategoria({...ProductoCategoria,idproductocategoria:index});
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
        let indexProductoCategoria=ProductoCategoriaList.findIndex((element)=>element.idproductocategoria==index);
        setProductoCategoria({...ProductoCategoria,idproductocategoria:index,nombre:ProductoCategoriaList[indexProductoCategoria].nombre});
        onOpen();
    }
    function Guardar(){
        var obj={
            idproductocategoria:ProductoCategoria.idproductocategoria,
            nombre:ProductoCategoria.nombre
        };
        if (obj.idproductocategoria==0) {
            axios.post("/api/productocategoria",obj).then((res)=>{Lista()});   
        }
        else{
            axios.post("/api/productocategoria/"+ProductoCategoria.idproductocategoria,obj).then((res)=>Lista());
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
            Titulo={"Tipos de Productos"}
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
                        <TableRow key={item.idproductocategoria}>
                            <TableCell>{item.idproductocategoria}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true} 
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idproductocategoria}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Titulo={ProductoCategoria.idproductocategoria==0 ? "Agregar Tipo de Producto" : "Editar Tipo de Producto"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent ProductoCategoria={ProductoCategoria} setProductoCategoria={setProductoCategoria}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/productocategoria/'+ProductoCategoria.idproductocategoria
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