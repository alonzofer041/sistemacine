import React, { useEffect } from "react";
import ListGeneralComponent from "../../../../base/ListGeneralComponent";
import Modal from "../../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import BtnAccionComponent from "../../../../base/BtnAccionComponent";
import FormComponent from "../comboxproducto/FormComponent";
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const url=import.meta.env.VITE_ASSET_URL+'/combosdetalle/';

export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
    const location=useLocation();
    const idcombo=location.state?.idcombo;
    const nombre=location.state?.nombre;
    const [ComboDetalle,setComboDetalle]=useState({
        idcombodetalle:0,
        idproducto:0,
        idcombo:0,
        nombre:'',
        cantidad:0,
        valor:0
    })
    const [ComboDetalleList,setComboDetalleList]=useState([]);
    function Lista(){
        axios.get("/api/combodetalle"
        ).then((res)=>{
            let data=res.data;
            setComboDetalleList(data);
        });
    }
    function Limpiar(){
        setComboDetalle({...ComboDetalle,idproducto:0,cantidad:0,valor:0,nombre:''});
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
        let indexComboDetalle=ComboList.find((element)=>element.idcombo.index);
        setCombo({
            ...ComboDetalle,
            idcomboDetalle:index,
            idcombo:ComboDetalleList[indexComboDetalle].idcombo,
            nombre:ComboDetalleList[indexComboDetalle].nombre,
            valor:ComboDetalleList[indexComboDetalle].valor,
            acciones:ComboDetalleList[indexComboDetalle].acciones,
            imgcombo:ComboDetalleList[indexComboDetalle].imgcombo,
        });
        onOpen();
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    function Guardar(){
        var obj={
            idcombodetalle:ComboDetalle.idcombodetalle,
            nombre:ComboDetalle.nombre,
            cantidad:ComboDetalle.cantidad,
            acciones:ComboDetalle.acciones,
            files:File
        }
        axios.post('/api/combodetalle',obj,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{Lista()});
        // let formData=new FormData();
        // formData.set("idcombodetalle",comboDetalle.idcombodetalle);
        // formData.set("idcombo",comboDetalle.nombre);
        // formData.set("valor",comboDetalle.valor);
        // formData.set("acciones",Pelicula.acciones);
        // formData.set("imgcombo",Pelicula.imgcombo);
        // formData.append("files",File);
        // axios.post("/api/pelicula",formData,{
        //     headers:{
        //         "Content-Type":"multipart/form-data"
        //     }
        // }).then(()=>{});
    }
    return(
        <div>
            <ListGeneralComponent
                 isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                 EsModal={true}
                 Filtro={1} 
                 Titulo={"Elementos de " + nombre}
                 NombreLista={"Listados de Combos"}
                 EventoLimpiar={Limpiar}
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
                    <TableBody items={ComboDetalleList}>
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
                Titulo={"Agregar Producto a "+nombre} 
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                CuerpoFormulario={
                    <FormComponent ComboDetalle={ComboDetalle} setComboDetalle={setComboDetalle} ComboDetalleList={setComboDetalleList}></FormComponent>
                }
            ></Modal>
        </div>
    )
}