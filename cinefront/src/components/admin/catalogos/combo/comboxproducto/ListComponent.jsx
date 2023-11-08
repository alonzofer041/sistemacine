import React, { useEffect } from "react";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Spinner } from "@nextui-org/react";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "../comboxproducto/FormComponent";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SweetAlert2 from "react-sweetalert2";
const url=import.meta.env.VITE_ASSET_URL+'/combosdetalle/';

export default function ListComponent(){
    // SWAL
    const [swalProps, setSwalProps] = useState({});

    useEffect(()=>{
        Lista();
    },[]);
    const location=useLocation();
    const idcombo=location.state?.idcombo;
    const nombre=location.state?.nombre;

    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });


    const [ComboDetalle,setComboDetalle]=useState({
        idcombodetalle:0,
        idproducto:0,
        idcombo:0,
        nombre:'',
        cantidad:0,
        valor:0
    })
    const [ComboDetalleList,setComboDetalleList]=useState([]);

    const [loading, setLoading] = useState(true);
    
    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let ComboDetalleFiltrado=[...ComboDetalleList];
        if (BndFiltro) {
            ComboDetalleFiltrado=ComboDetalleFiltrado.filter((ComboDetalleElement)=>
                ComboDetalleElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return ComboDetalleFiltrado;
    },[ComboDetalleList,Filtro.Nombre]);

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
            axios.get("/api/combodetalle",
            {params:{
                idcombo:idcombo
            }}
            ).then((res)=>{
                let data=res.data;
                setComboDetalleList(data);
            }).finally(()=>{
                setLoading(false);
            });
        }, 1000);
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setComboDetalle({...ComboDetalle,idcombodetalle:0,idproducto:0,cantidad:0,valor:0,nombre:''});
    }
    function Eliminar(index){
        setComboDetalle({...ComboDetalle,idcombodetalle:index});
        setSwalProps({
            icon:'warning',
            show: true,
            title: 'Eliminar',
            text: '¿Seguro que quiere eliminar este dato?',
            confirmButtonText:'Si',
            showConfirmButton:true,
            showDenyButton:true,
        }); 
    }
    function Editar(index){
        Limpiar();
        let indexComboDetalle=ComboDetalleList.findIndex((element)=>element.idcombodetalle==index);
        setComboDetalle({
            ...ComboDetalle,
            idcombodetalle:index,
            idcombo:ComboDetalleList[indexComboDetalle].idcombo,
            nombre:ComboDetalleList[indexComboDetalle].nombre,
            valor:ComboDetalleList[indexComboDetalle].valor,
            cantidad:ComboDetalleList[indexComboDetalle].cantidad
        });
        onOpen();
    }
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    function Guardar(){
        var obj={
            idcombodetalle:ComboDetalle.idcombodetalle,
            idcombo:idcombo,
            nombre:ComboDetalle.nombre,
            cantidad:ComboDetalle.cantidad,
            valor:ComboDetalle.valor
        }
        axios.post('/api/combodetalle',obj,
        ).then((res)=>{
            Lista();
            onClose();
        });
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
                Titulo={"Elementos de " + nombre}
                NombreLista={"Listados de Combos"}
                EventoLimpiar={Limpiar}
                TotalPagina={Paginator}
                CabeceraTabla={
                     <TableHeader>
                         <TableColumn>#</TableColumn>
                         <TableColumn>Nombre</TableColumn>
                         <TableColumn>Valor</TableColumn>
                         <TableColumn>Cantidad</TableColumn>
                         <TableColumn>Acciones</TableColumn>
                     </TableHeader>
                 }
                CuerpoTabla={
                    <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idcombodetalle}>
                            <TableCell>{item.idcombodetalle}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.cantidad}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idcombodetalle}
                                    ></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                }
            ></ListGeneralComponent>
            <Modal
                Size="xl"
                EventoGuardar={Guardar}
                Titulo={ComboDetalle.idcombodetalle==0 ? "Agregar Producto a "+nombre : "Editar Producto en "+nombre} 
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                CuerpoFormulario={
                    <FormComponent ComboDetalle={ComboDetalle} setComboDetalle={setComboDetalle}></FormComponent>
                }
            ></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/combodetalle/'+ComboDetalle.idcombodetalle
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