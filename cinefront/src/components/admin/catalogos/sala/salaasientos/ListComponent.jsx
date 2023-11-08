import React, { useState, useEffect } from "react";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Spinner } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';

export default function ListComponent(){
    const location=useLocation();
    const idsala=location.state?.idsala;
    const numfilas=location.state?.numfilas;
    const [AsientosList,setAsientosList]=useState([ 
        
    ]);
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

    const [Asientos,setAsientos]=useState({
        idasiento:0,
        nombre:"",
        fila:""
    });

    const [loading, setLoading] = useState(true);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let AsientosFiltrado=[...AsientosList];
        if (BndFiltro) {
            AsientosFiltrado=AsientosFiltrado.filter((AsientosElement)=>
                AsientosElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return AsientosFiltrado;
    },[AsientosList,Filtro.Nombre]);

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
            axios.get("/api/asientos",{
                params:{
                    idsala:idsala
                }
            }
            ).then((res)=>{
                let data=res.data;
                setAsientosList(data);
            }).finally(()=>{
                setLoading(false);
            });
        }, 1000);
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setAsientos({...Asientos,idasiento:0,nombre:"",fila:""});
    }
    function Eliminar(index){
        setAsientos({...Asientos,idasiento:index});
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
        let indexAsientos=AsientosList.findIndex((element)=>element.idasiento==index);
        setAsientos({...Asientos,idasiento:index,
            nombre:AsientosList[indexAsientos].nombre,
            fila:AsientosList[indexAsientos].fila
        });
        onOpen();
    }
    function Guardar(){
        var obj={
            idasiento:Asientos.idasiento,
            idsala:idsala,
            nombre:Asientos.nombre,
            fila:Asientos.fila
        };
        if (obj.idasiento==0) {
            axios.post("/api/asientos",obj
            ).then((res)=>{
                Lista();
                onClose();
            });   
        }
        else{
            axios.post("/api/asientos/"+Asientos.idasiento,obj).then((res)=>{
                Lista();
                onClose();
            });
        }
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
                Titulo={"Asientos"}
                NombreLista={"Sala "+idsala}
                EventoLimpiar={Limpiar}
                TotalPagina={Paginator}
                CabeceraTabla={
                   <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Fila</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                   </TableHeader> 
                }
                CuerpoTabla={
                    <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                        {(item)=>(
                            <TableRow key={item.idasiento}>
                                <TableCell>{item.idasiento}</TableCell>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.fila}</TableCell>
                                <TableCell>
                                    <BtnAccionComponent 
                                        MostrarBtnEditar={true} 
                                        MostrarBtnEliminar={true} 
                                        EventoEditar={Editar}
                                        EventoEliminar={Eliminar}
                                        Id={item.idasiento}></BtnAccionComponent>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                }
            >
            </ListGeneralComponent>
            <Modal 
            EventoGuardar={Guardar}
            Titulo={Asientos.idasiento==0 ? "Agregar Asiento" : "Editar Asiento"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Asientos={Asientos} setAsientos={setAsientos} NumFilas={numfilas}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/asientos/'+Asientos.idasiento
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