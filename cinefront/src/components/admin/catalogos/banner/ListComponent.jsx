import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Link ,Image, Spinner} from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../banner/FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/banners/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);

    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
    
    const [Banner,setBanner]=useState({
        idbanner:0,
        imgbanner:''
    });
    const [BannerList,setBannerList]=useState([]);
    const [File,setFile]=useState({});
    const [loading, setLoading] = useState(true);

    function Lista(){
        setLoading(true);
        setTimeout(() => {
            axios.get('/api/banner'
            ).then((res)=>{
                let data=res.data;
                setBannerList(data);
            }).finally(()=>{
                setLoading(false);
            })
        }, 1000);
    }
    function Limpiar(){
        setBanner({...Banner,
        idbanner:0,
        imgbanner:''});
        setFile({});
    }
    function Eliminar(index){
        setBanner({...Banner,idbanner:index});
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
        let indexBanner=BannerList.findIndex((element)=>element.idbanner==index);
        setBanner({...Banner,idbanner:index,imgbanner:BannerList[indexBanner].imgbanner});
        onOpen();
    }
    function Guardar(){
        var obj={
            idbanner:Banner.idbanner,
            imgbanner:Banner.imgbanner,
            files:File
        };
        if (obj.idbanner==0) {
            axios.post('/api/banner',obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{Lista();onClose();});   
        }
        else{
            axios.post('/api/banner/'+Banner.idbanner,obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{Lista();onClose();});
        }
    }
    return(
        <div>
            <ListGeneralComponent
            ShowInput={false}
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
            EsModal={true}
            Filtro={1} 
            Titulo={"Banners"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Imagen</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={BannerList}>
                    {(item)=>(
                        <TableRow key={item.idbanner}>
                            <TableCell>{item.idbanner}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgbanner}></Image>}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idbanner}
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
            Titulo={Banner.idbanner==0 ? "Agregar Imagen" : "Editar Imagen"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Banner={Banner} setBanner={setBanner} File={File} setFile={setFile}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/banner/'+Banner.idbanner
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