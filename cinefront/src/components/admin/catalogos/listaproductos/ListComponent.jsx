import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Link ,Image } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/productos/';
export default function ListComponent(){

    useEffect(()=>{
        Lista();
    },[]);
     // SWAL
    const [swalProps, setSwalProps] = useState({});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const navigate=useNavigate();
    const [Producto,setProducto]=useState({
        idproducto:0,
        nombre:'',
        valor:0,
        cantidad:0,
        imgproducto:'',
        idproveedor:0,
        idproductocategoria:0
    });
    const [ProductoList,setProductoList]=useState([]);

    // ESTADO DE ARCHIVO
    const [File,setFile]=useState({});
    function Lista(){
        axios.get('/api/producto'
        ).then((res)=>{
            let data=res.data;
            setProductoList(data);
            // console.log(import.meta.env.VITE_ASSET_URL);
        })
    }
    function Limpiar(){
        setProducto({
            ...Producto,
            idproducto:0,
            nombre:'',
            valor:0,
            cantidad:0,
            imgproducto:'',
            idproveedor:0,
            idproductocategoria:0
        });
    }

    function Eliminar(index){
        setProducto({...Producto,idproducto:index});
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
        let indexProducto=ProductoList.findIndex((element)=>element.idproducto==index);
        setProducto({
            ...Producto,
            idproducto:index,
            nombre:ProductoList[indexProducto].nombre,
            valor:ProductoList[indexProducto].valor,
            cantidad:ProductoList[indexProducto].cantidad,
            imgproducto:ProductoList[indexProducto].imgproducto,
            idproveedor:ProductoList[indexProducto].idproveedor,
            idproductocategoria:ProductoList[indexProducto].idproductocategoria
        });
        onOpen();
    }
    function Guardar(){
        var obj={
            idproducto:Producto.idproducto,
            nombre:Producto.nombre,
            valor:Producto.valor,
            cantidad:Producto.cantidad,
            idproveedor:Producto.idproveedor,
            idproductocategoria:Producto.idproductocategoria,
            files:File
        }
        if (obj.idproducto==0) {
            axios.post("/api/producto",obj,{headers:{
                "Content-Type":"multipart/form-data"
            }}).then((res)=>{Lista()});   
        }
        else{
            axios.post("/api/producto/"+Producto.idproducto,obj,{headers:{
                "Content-Type":"multipart/form-data"
            }}).then((res)=>Lista());
        }
    }
    return(
        <div>
            <ListGeneralComponent
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={"1"} 
            Titulo={"Producto"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Producto</TableColumn>
                    <TableColumn>Precio</TableColumn>
                    <TableColumn>Cantidad</TableColumn>
                    <TableColumn>Imagen Producto</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={ProductoList}>
                    {(item)=>(
                        <TableRow key={item.idproducto}>
                            <TableCell>{item.idproducto}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{'$'+item.valor}</TableCell>
                            <TableCell>{item.cantidad}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgproducto}></Image>}</TableCell>
                            
                            <TableCell>
                                <BtnAccionComponent MostrarBtnEditar={true} MostrarBtnEliminar={true} EventoEditar={Editar}
                                    EventoEliminar={Eliminar} Id={item.idproducto}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Size={"xl"}
            Titulo={"Agregar Producto"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Producto={Producto} setProducto={setProducto} File={File} setFile={setFile}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/producto/'+Producto.idproducto
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