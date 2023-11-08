import React, { useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Link ,Image, Spinner} from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../pelicula/FormComponent";
import { useState } from "react";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";
import { MensajeAdvertencia } from "../../../../helpers/functions";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);
    // SWAL
    const [swalProps, setSwalProps] = useState({});
    
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const [ErrorValidacion,setErrorValidacion]=useState([]);

    const navigate=useNavigate();
    const [Pelicula,setPelicula]=useState({
        idpelicula:0,
        idpeliculacategoria:'',
        titulo:'',
        sinopsis:'',
        fechaestreno:'',
        aniorealizacion:'',
        director:'',
        reparto:'',
        duracion:'',
        productora:'',
        distribuidora:'',
        imgportada:''
    });
    const [PeliculaList,setPeliculaList]=useState([
    ]);
    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });

    // ESTADO DE ARCHIVO
    const [File,setFile]=useState({});

    const [loading, setLoading] = useState(true);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let PeliculaFiltrado=[...PeliculaList];
        if (BndFiltro) {
            PeliculaFiltrado=PeliculaFiltrado.filter((PeliculaElement)=>
                PeliculaElement.titulo.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return PeliculaFiltrado;
    },[PeliculaList,Filtro.Nombre]);

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
            axios.get('/api/pelicula',{
                params:{
                    origen:'admin'
                }
            }
            ).then((res)=>{
                let data=res.data;
                setPeliculaList(data);
            }).finally(()=>{
                setLoading(false);
            })
        }, 1000);
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setFile(null);
        setErrorValidacion([]);
        setPelicula({...Pelicula,
            idpelicula:0,
            idpeliculacategoria:'',
            titulo:'',
            sinopsis:'',
            fechaestreno:'',
            aniorealizacion:'',
            director:'',
            reparto:'',
            duracion:'',
            productora:'',
            distribuidora:'',
            imgportada:'',
        });
    }
    function Eliminar(index){
        setPelicula({...Pelicula,idpelicula:index});
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
        let indexPelicula=PeliculaList.findIndex((element)=>element.idpelicula==index);
        setPelicula({
            ...Pelicula,
            idpelicula:index,
            idpeliculacategoria:PeliculaList[indexPelicula].idpeliculacategoria,
            titulo:PeliculaList[indexPelicula].titulo,
            sinopsis:PeliculaList[indexPelicula].sinopsis,
            fechaestreno:PeliculaList[indexPelicula].fechaestreno,
            aniorealizacion:PeliculaList[indexPelicula].aniorealizacion,
            director:PeliculaList[indexPelicula].director,
            reparto:PeliculaList[indexPelicula].reparto,
            duracion:PeliculaList[indexPelicula].duracion,
            productora:PeliculaList[indexPelicula].productora,
            distribuidora:PeliculaList[indexPelicula].distribuidora,
            imgportada:PeliculaList[indexPelicula].imgportada
        }
        );
        onOpen();
    }
    function Navegar(idpelicula,titulo){
        navigate('/peliculahorario',{state:{idpelicula:idpelicula,titulo:titulo}})
    }
    function Guardar(){
        let mensajes=[];
        if (Object.is(File,null)) {
            mensajes.push("Debe seleccionar una imagen");
        }
        if (Pelicula.idpeliculacategoria=="") {
            mensajes.push("Debe seleccionar una categoría");
        }
        if (mensajes.length>0){
            mensajes.forEach((mensaje)=>{
                MensajeAdvertencia(mensaje);
            });
            return false;
        }
        var obj={
            idpelicula:Pelicula.idpelicula,
            idpeliculacategoria:Pelicula.idpeliculacategoria,
            titulo:Pelicula.titulo,
            sinopsis:Pelicula.sinopsis,
            aniorealizacion:Pelicula.aniorealizacion,
            director:Pelicula.director,
            reparto:Pelicula.reparto,
            duracion:Pelicula.duracion,
            productora:Pelicula.productora,
            distribuidora:Pelicula.distribuidora,
            files:File
        }
        if (obj.idpelicula==0) {
            axios.post('/api/pelicula',obj,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then((res)=>{
                Lista();
                onClose();
            });
        }
        else{
            axios.post("/api/pelicula/"+Pelicula.idpelicula,obj
            ).then((res)=>{
                Lista();
                onClose();
            })
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
            Titulo={"Películas"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Portada</TableColumn>
                    <TableColumn>Título</TableColumn>
                    <TableColumn>Fecha de Estreno</TableColumn>
                    <TableColumn>Director</TableColumn>
                    <TableColumn>Productora</TableColumn>
                    <TableColumn>Duración</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idpelicula}>
                            <TableCell>{item.idpelicula}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgportada}></Image>}</TableCell>
                            <TableCell>{item.titulo}</TableCell>
                            <TableCell>{item.fechaestreno}</TableCell>
                            <TableCell>{item.director}</TableCell>
                            <TableCell>{item.productora}</TableCell>
                            <TableCell>{item.duracion}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true}
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idpelicula}
                                    BotonesAdicionales={
                                        <Button as={Link} variant="light" onClick={()=>Navegar(item.idpelicula,item.titulo)}>Asignar Horarios</Button>
                                    }
                                    ></BtnAccionComponent>
                            </TableCell>
                            
                        </TableRow>
                        
                    )}
                </TableBody>
            }
            ></ListGeneralComponent>
            <Modal
            Size="3xl"
            EventoGuardar={Guardar}
            Titulo={"Agregar Película"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Pelicula={Pelicula} setPelicula={setPelicula} File={File} setFile={setFile} Errores={ErrorValidacion}/>}></Modal>

            <SweetAlert2 {...swalProps}
                onConfirm={()=>{
                    axios.delete('/api/pelicula/'+Pelicula.idpelicula
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