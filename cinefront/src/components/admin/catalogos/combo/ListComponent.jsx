import React,{ useEffect } from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import Modal from "../../../base/ModalComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Spinner, Image } from "@nextui-org/react";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "../combo/FormComponent";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MensajeAdvertencia } from "../../../../helpers/functions";

const url=import.meta.env.VITE_ASSET_URL+'/combos/';
export default function ListComponent(){
    useEffect(()=>{
        Lista();
    },[]);

    // FILTROS
    const [Filtro,setFiltro]=useState({
        NumFilas:5,
        Pagina:1,
        Nombre:'',
        TotalPaginas:1
    });

    const navigate=useNavigate();
    const [File,setFile]=useState(null);
    const [Combo,setCombo]=useState({
        idcombo:0,
        nombre:'',
        valor:0,
        imgcombo:'',
    });
    const[ComboList,setComboList]=useState([
    ]);

    const [loading, setLoading] = useState(true);
    const [ErrorValidacion,setErrorValidacion]=useState([]);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let ComboFiltrado=[...ComboList];
        if (BndFiltro) {
            ComboFiltrado=ComboFiltrado.filter((ComboElement)=>
                ComboElement.nombre.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return ComboFiltrado;
    },[ComboList,Filtro.Nombre]);

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
            axios.get('/api/combo'
            ).then((res)=>{
                let data=res.data;
                setComboList(data);
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
        if (Object.is(File,null)) {
            MensajeAdvertencia("Debe seleccionar una imagen");
            return false;
        }
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
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
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
            }).catch((err)=>{
                setErrorValidacion(err.response.data.errors.errors);
            });
        }
    }
    return (
        <div>
            <ListGeneralComponent
                isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
                EsModal={true}
                Filtro={Filtro}
                setFiltro={setFiltro}
                FiltroEvento={FiltrarLista} 
                TotalElementos={ItemsFiltro.length}
                Titulo={"Combos"}
                NombreLista={"Configuración"}
                EventoLimpiar={Limpiar}
                TotalPagina={Paginator}
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
                    <TableBody isLoading={loading} loadingContent={<Spinner label="Cargando..." size="lg" color="primary"></Spinner>} items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idcombo}>
                            <TableCell>{item.idcombo}</TableCell>
                            <TableCell>{item.nombre}</TableCell>
                            <TableCell>{item.valor}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgcombo}></Image>}</TableCell>
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
            CuerpoFormulario={<FormComponent Combo={Combo} setCombo={setCombo} File={File} setFile={setFile} Errores={ErrorValidacion}/>}></Modal>
        </div>
    )
}