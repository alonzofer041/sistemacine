import React,{ useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import Modal from "../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button } from "@nextui-org/react";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../combo/FormComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/combos/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
    const navigate=useNavigate();
    const [File,setFile]=useState({});
    const [Combo,setCombo]=useState({
        idcombo:0,
        nombre:'',
        valor:0,
        imgcombo:'',
    });
    const[ComboList,setComboList]=useState([
        {idcombo:1,nombre:'combo amigos',valor:'216',imgcombo:'nada.png'},
        {idcombo:2,nombre:'combo pareja',valor:'220',imgcombo:'nada.png'}
    ]);
    
    function Lista(){
        axios.get('/api/combo'
        ).then((res)=>{
            let data=res.data;
            setComboList(data);
            // console.log(import.meta.env.VITE_ASSET_URL);
        })
    
    }
    function Limpiar(){
        setCombo({...Combo,
        idcombo:0,nombre:'',valor:0,imgcombo:''});
    }
    function Eliminar(index){
        setCombo({...Combo,idcombo:index});
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
        let indexCombo=ComboList.findIndex((element)=>element.idcombo==index);
        setCombo({
            ...Combo,
            idcombo:index,
            nombre:ComboList[indexCombo].nombre,
            valor:ComboList[indexCombo].valor,
            imgcombo:ComboList[indexCombo].imgcombo,
        });
        onOpen();
    
    }
    function Navegar(idcombo,nombre){
        navigate('/combodetalle',{state:{idcombo:idcombo,nombre:nombre,}});
    }
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    function Guardar(){
        var obj={
            idcombo:Combo.idcombo,
            nombre:Combo.nombre,
            valor:Combo.valor,
            imagen:Combo.imagen,
            acciones:Combo.acciones,
            files:File
        }
        if (obj.idcombo==0) {
            axios.post('/api/combo',obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            });   
        }
        else{
            axios.post('/api/combo/'+Combo.idcombo,obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            });
        }
    }
    return (
        <div>
            <ListGeneralComponent
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                EsModal={true}
                Filtro={1} 
                Titulo={"Combos"}
                NombreLista={"Configuración"}
                EventoLimpiar={Limpiar}
                CabeceraTabla={
                    <TableHeader>
                        <TableColumn>#</TableColumn>
                        <TableColumn>Nombre</TableColumn>
                        <TableColumn>Valor</TableColumn>
                        <TableColumn>Imagen</TableColumn>
                        <TableColumn>Acciones</TableColumn>
                    </TableHeader>
                }
                CuerpoTabla={
                    <TableBody items={ComboList}>
                    {(item)=>(
                        <TableRow key={item.idcombo}>
                            <TableCell>{item.idcombo}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{item.imagen}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    BotonesAdicionales={
                                        <Button onClick={()=>Navegar(item.idcombo,item.nombre)}>Asignar Productos</Button>
                                    }
                                    Id={item.idcombo}
                                    ></BtnAccionComponent>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                }
            ></ListGeneralComponent>
             <Modal
            Size="md"
            EventoGuardar={Guardar}
            Titulo={"Agregar Combo"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            CuerpoFormulario={<FormComponent Combo={Combo} setCombo={setCombo} File={File} setFile={setFile}/>}></Modal>
        </div>
    )
}