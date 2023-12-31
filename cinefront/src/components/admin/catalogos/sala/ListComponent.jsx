import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Spinner } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { Link, useNavigate } from "react-router-dom";

export default function ListComponent(){
    const navigate=useNavigate();
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

    const [Sala,setSala]=useState({
        idsala:0,
        nombre:"",
        ubicacion:"",
        numfilas:0
    });
    const [SalasList,setSalasList]=useState([
        
    ]);
    const [ErrorValidacion,setErrorValidacion]=useState([]);
    const [loading, setLoading] = useState(true);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let SalasFiltrado=[...SalasList];
        if (BndFiltro) {
            SalasFiltrado=SalasFiltrado.filter((SalasElement)=>
                SalasElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return SalasFiltrado;
    },[SalasList,Filtro.Nombre]);

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
            axios.get("/api/salas"
            ).then((res)=>{
                let data=res.data;
                setSalasList(data);
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
        setSala({...Sala,idsala:0,nombre:"",ubicacion:"",numfilas:0});
    }
    function Eliminar(index){
        setSala({...Sala,idsala:index});
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
        let indexSala=SalasList.findIndex((element)=>element.idsala==index);
        setSala({...Sala,idsala:index,
            nombre:SalasList[indexSala].nombre,
            ubicacion:SalasList[indexSala].ubicacion,
            numfilas:SalasList[indexSala].numfilas});
        onOpen();
    }
    function Guardar(){
        var obj={
            idsala:Sala.idsala,
            nombre:Sala.nombre,
            ubicacion:Sala.ubicacion,
            numfilas:Sala.numfilas
        };
        if (obj.idsala==0) {
            axios.post("/api/salas",obj
            ).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });   
        }
        else{
            axios.post("/api/salas/"+Sala.idsala,obj
            ).then((res)=>{
                Lista();
                onClose();
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
    }
    function Navegar(idsala,numfilas){
        navigate('/asientos',{state:{idsala:idsala,numfilas:numfilas}});
    }


    return(
        <div>
            <ListGeneralComponent
            loading={loading}
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={Filtro}
            setFiltro={setFiltro}
            FiltroEvento={FiltrarLista} 
            TotalElementos={ItemsFiltro.length}
            Titulo={"Salas"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Ubicación</TableColumn>
                    <TableColumn>Número de Filas</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idsala}>
                            <TableCell>{item.idsala}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.ubicacion}</TableCell>
                            <TableCell>{item.numfilas}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true} 
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idsala}
                                        BotonesAdicionales={
                                        <>
                                           <Button variant="light" onClick={()=>Navegar(item.idsala,item.numfilas)} className="ml-2">Asignar asientos</Button>    
                                        </>}
                                    ></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Titulo={"Agregar Sala"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Sala={Sala} setSala={setSala} Errores={ErrorValidacion}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/salas/'+Sala.idsala
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