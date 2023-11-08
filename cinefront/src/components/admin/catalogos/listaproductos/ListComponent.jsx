import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Link ,Image, Spinner } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";
import { MensajeAdvertencia } from "../../../../helpers/functions";

const url=import.meta.env.VITE_ASSET_URL+'/productos/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
     // SWAL
    const [swalProps, setSwalProps] = useState({});
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const navigate=useNavigate();
    
    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });

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

    const [loading, setLoading] = useState(true);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let ProductoFiltrado=[...ProductoList];
        if (BndFiltro) {
            ProductoFiltrado=ProductoFiltrado.filter((ProductoElement)=>
                ProductoElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return ProductoFiltrado;
    },[ProductoList,Filtro.Nombre]);

    const Paginator=React.useMemo(()=>{
        return ItemsFiltro?.length ? Math.ceil(ItemsFiltro.length/Filtro.NumFilas) : 0;
    },[ItemsFiltro?.length,Filtro.NumFilas]);

    const ItemsPaginado=React.useMemo(()=>{
        const Inicio=(Filtro.Pagina-1)*Filtro.NumFilas;
        const Fin=Inicio+Filtro.NumFilas;
        return ItemsFiltro.slice(Inicio,Fin);
    },[Filtro.Pagina,ItemsFiltro,Filtro.NumFilas]);


    function Lista(){
        setLoading(true);
        setTimeout(() => {
            axios.get('/api/producto',{
                params:{
                    origen:'admin'
                }
            }
            ).then((res)=>{
                let data=res.data;
                setProductoList(data);
            }).finally(()=>{
                setLoading(false);
            })
        }, 1000);
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
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
        setFile(null);
        setErrorValidacion([]);
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
        Limpiar();
        setErrorValidacion([]);
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
        let mensajes=[];
        if (Object.is(File,null)) {
            mensajes.push("Debe seleccionar una imagen");
        }
        if (Producto.idproveedor==0) {
            mensajes.push("Debe seleccionar un proveedor");
        }
        if (Producto.idproductocategoria==0) {
            mensajes.push("Debe seleccionar una categoría");
        }
        if (mensajes.length>0){
            mensajes.forEach((mensaje)=>{
                MensajeAdvertencia(mensaje);
            });
            return false;
        }
        var obj={
            idproducto:Producto.idproducto,
            nombre:Producto.nombre,
            valor:Producto.valor,
            cantidad:Producto.cantidad,
            idproveedor:Producto.idproveedor,
            idproductocategoria:Producto.idproductocategoria,
            files:File
        };
        if (obj.idproducto==0) {
            axios.post("/api/producto",obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
        else{
            axios.post("/api/producto/"+Producto.idproducto,obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
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
            Titulo={"Producto"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
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
                <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
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
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Producto={Producto} setProducto={setProducto} File={File} setFile={setFile} Errores={ErrorValidacion}/>}></Modal>

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