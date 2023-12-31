import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Spinner } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';

export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);

    // SWAL
    const [swalProps, setSwalProps] = useState({});

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    
    // USER STATE

    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });

    const [Proveedor,setProveedor]=useState({
        idproveedor:0,
        nombrecomercial:"",
        razonsocial:"",
        email:"",
        contacto:"",
        telefono: "",
        direccion: "",
        estado: "",
        ciudad: ""
    });
    
    const [ProveedorList,setProveedorList]=useState([
        {
            idproveedor:0,
            nombrecomercial:'',
            razonsocial:'',
            email:'',
            contacto:'',
            telefono: '',
            direccion: '',
            estado: '',
            ciudad: ''
        },
        
    ]);

    const [loading, setLoading] = useState(true);
    const [ErrorValidacion,setErrorValidacion]=useState([]);
    
    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let ProveedoresFiltrado=[...ProveedorList];
        if (BndFiltro) {
            ProveedoresFiltrado=ProveedoresFiltrado.filter((ProveedorElement)=>
                ProveedorElement.razonsocial.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return ProveedoresFiltrado;
    },[ProveedorList,Filtro.Nombre]);

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
            axios.get("/api/proveedor"
            ).then((res)=>{
                let data=res.data;
                setProveedorList(data);
            }).finally(()=>{
                setLoading(false);
            });
        }, 1000);
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setErrorValidacion([]);
        setProveedor({
            ...Proveedor,
            idproveedor:0,
            nombrecomercial:'',
            razonsocial:'',
            email:'',
            contacto:'',
            telefono: '',
            direccion: '',
            estado: '',
            ciudad: ''
        });
    }
    function Eliminar(index){
        setProveedor({...Proveedor,idproveedor:index});
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
        let indexProveedor=ProveedorList.findIndex((element)=>element.idproveedor==index);
        setProveedor({
            ...Proveedor,
            idproveedor:index,
            nombrecomercial:ProveedorList[indexProveedor].nombrecomercial,
            razonsocial:ProveedorList[indexProveedor].razonsocial,
            email:ProveedorList[indexProveedor].email,
            contacto:ProveedorList[indexProveedor].contacto,
            telefono:ProveedorList[indexProveedor].telefono,
            direccion:ProveedorList[indexProveedor].direccion,
            estado:ProveedorList[indexProveedor].estado,
            ciudad:ProveedorList[indexProveedor].ciudad
        });
        onOpen();
    }

    function Guardar(){
        var obj={
            idproveedor:Proveedor.idproveedor,
            nombrecomercial:Proveedor.nombrecomercial,
            razonsocial:Proveedor.razonsocial,
            email:Proveedor.email,
            contacto:Proveedor.contacto,
            telefono:Proveedor.telefono,
            direccion:Proveedor.direccion,
            estado:Proveedor.estado,
            ciudad:Proveedor.ciudad
        };
        if (obj.idproveedor==0) {
            axios.post("/api/proveedor",obj).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
        else{
            axios.post("/api/proveedor/"+Proveedor.idproveedor,obj).then((res)=>{
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
            Titulo={"Provedores"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Proveedor</TableColumn>
                    <TableColumn>Razon Social</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Contacto</TableColumn>
                    <TableColumn>Telefono</TableColumn>
                    <TableColumn>Direccion</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Ciudad</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idproveedor}>
                            <TableCell>{item.idproveedor}</TableCell>
                            <TableCell>{item.nombrecomercial}</TableCell>
                            <TableCell>{item.razonsocial}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.contacto}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.estado}</TableCell>
                            <TableCell>{item.ciudad}</TableCell>
                            <TableCell>
                                <BtnAccionComponent MostrarBtnEditar={true} MostrarBtnEliminar={true}  EventoEditar={Editar}
                                    EventoEliminar={Eliminar} Id={item.idproveedor}></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Size={"3xl"}
            Titulo={"Agregar Provedor"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Proveedor={Proveedor} setProveedor={setProveedor} Errores={ErrorValidacion}/>}></Modal>
            
            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/proveedor/'+Proveedor.idproveedor
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