import React, { useEffect, useMemo ,useState} from "react";
import ListGeneralComponent from "../../../base/ListGeneralComponent";
import { TableHeader,TableBody,TableColumn,TableCell, TableRow, useDisclosure, Button, Image } from "@nextui-org/react";
import Modal from "../../../base/ModalComponent";
import BtnAccionComponent from "../../../base/BtnAccionComponent";
import FormComponent from "./FormComponent";
import axios from "axios";
import SweetAlert2 from 'react-sweetalert2';
import { useNavigate } from "react-router-dom";
import { MensajeAdvertencia } from "../../../../helpers/functions";

const url=import.meta.env.VITE_ASSET_URL+'/empresas/';
export default function ListComponent(){
    const navigate=useNavigate();
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
 
     const [File,setFile]=useState(null);

     const [ErrorValidacion,setErrorValidacion]=useState([]);

     const [Empresa,setEmpresa]=useState({
         idempresa:0,
         nombrecomercial:"",
         razonsocial:"",
         rfc:"",
         direccion:"",
         telefono:"",
         email:"",
         estado:"",
         ciudad:"",
         imgempresa:""
     });
     const [EmpresaList,setEmpresaList]=useState([
        
    ]);

    useEffect(()=>{
        Lista();
    },[]);

    // MEMOS
    const BndFiltro=Boolean(Filtro.Nombre);
    const ItemsFiltro=React.useMemo(()=>{
        let EmpresaFiltrado=[...EmpresaList];
        if (BndFiltro) {
            EmpresaFiltrado=EmpresaFiltrado.filter((EmpresaElement)=>
                EmpresaElement.nombrecomercial.toLowerCase().includes(Filtro.Nombre.toLowerCase())
            );     
        }
        return EmpresaFiltrado;
    },[EmpresaList,Filtro.Nombre]);
    
    const Paginator=React.useMemo(()=>{
        return ItemsFiltro?.length ? Math.ceil(ItemsFiltro.length/Filtro.NumFilas) : 0;
    },[ItemsFiltro?.length,Filtro.NumFilas]);

    const ItemsPaginado=React.useMemo(()=>{
        const Inicio=(Filtro.Pagina-1)*Filtro.NumFilas;
        const Fin=Inicio+Filtro.NumFilas;
        return ItemsFiltro.slice(Inicio,Fin);
    },[Filtro.Pagina,ItemsFiltro,Filtro.NumFilas]);

    // METODOS
    function Lista(){
        axios.get("/api/empresa"
        ).then((res)=>{
            let data=res.data;
            setEmpresaList(data);
        }).finally(()=>{
        });
    }
    const FiltrarLista=React.useCallback((value)=>{
        setFiltro({...Filtro,Nombre:value})
    })
    function Limpiar(){
        setFile(null);
        setErrorValidacion([]);
        setEmpresa({...Empresa,
            idempresa:0,
            nombrecomercial:"",
            razonsocial:"",
            rfc:"",
            direccion:"",
            telefono:"",
            email:"",
            estado:"",
            ciudad:"",
            imgempresa:""
        });
    }
    function Eliminar(index){
        setEmpresa({...Empresa,idempresa:index});
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
        let indexEmpresa=EmpresaList.findIndex((element)=>element.idempresa==index);
        setEmpresa(
            {...Empresa,
                idempresa:index,
                nombrecomercial:EmpresaList[indexEmpresa].nombrecomercial,
                razonsocial:EmpresaList[indexEmpresa].razonsocial,
                rfc:EmpresaList[indexEmpresa].rfc,
                direccion:EmpresaList[indexEmpresa].direccion,
                telefono:EmpresaList[indexEmpresa].telefono,
                email:EmpresaList[indexEmpresa].email,
                estado:EmpresaList[indexEmpresa].estado,
                ciudad:EmpresaList[indexEmpresa].ciudad,
                imgempresa:EmpresaList[indexEmpresa].imgempresa
            }
        );
        onOpen();
    }
    function Guardar(){
        if (Object.is(File,null)) {
            MensajeAdvertencia("Debe seleccionar una imagen");
            return false;
        }
        var obj={
            idempresa:Empresa.idempresa,
            nombrecomercial:Empresa.nombrecomercial,
            razonsocial:Empresa.razonsocial,
            rfc:Empresa.rfc,
            direccion:Empresa.direccion,
            telefono:Empresa.telefono,
            email:Empresa.email,
            estado:Empresa.estado,
            ciudad:Empresa.ciudad,
            files:File
        };
        if (obj.idempresa==0) {
            axios.post("/api/empresa",obj,{
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
            axios.post("/api/empresa/"+Empresa.idempresa,obj,{
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
    function NavegarSucursal(idempresa,nombrecomercial){
        navigate('/sucursales',{state:{idempresa:idempresa,nombrecomercial:nombrecomercial,}});
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
            Titulo={"Empresa"}
            NombreLista={"Configuración"}
            EventoLimpiar={Limpiar}
            TotalPagina={Paginator}
            CabeceraTabla={
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Imagen</TableColumn>
                    <TableColumn>Nombre Comercial</TableColumn>
                    <TableColumn>Razón Social</TableColumn>
                    <TableColumn>Dirección</TableColumn>
                    <TableColumn>Estado</TableColumn>
                    <TableColumn>Ciudad</TableColumn>
                    <TableColumn>Teléfono</TableColumn>
                    <TableColumn>Email</TableColumn>
                    <TableColumn>Acciones</TableColumn>
                </TableHeader>
            }
            CuerpoTabla={
                <TableBody items={ItemsPaginado}>
                    {(item)=>(
                        <TableRow key={item.idempresa}>
                            <TableCell>{item.idempresa}</TableCell>
                            <TableCell>{<Image width={200} height={200} src={url+item.imgempresa}></Image>}</TableCell>
                            <TableCell>{item.nombrecomercial}</TableCell>
                            <TableCell>{item.razonsocial}</TableCell>
                            <TableCell>{item.direccion}</TableCell>
                            <TableCell>{item.estado}</TableCell>
                            <TableCell>{item.ciudad}</TableCell>
                            <TableCell>{item.telefono}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>
                                <BtnAccionComponent 
                                    MostrarBtnEditar={true} 
                                    MostrarBtnEliminar={true} 
                                    EventoEditar={Editar}
                                    EventoEliminar={Eliminar}
                                    Id={item.idempresa}
                                    BotonesAdicionales={
                                        <Button onClick={()=>NavegarSucursal(item.idempresa,item.nombrecomercial)}>Ir a Sucursal</Button>
                                    }></BtnAccionComponent>
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
            Titulo={Empresa.idempresa==0 ? "Agregar Empresa" : "Editar Empresa"} 
            isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
            CuerpoFormulario={<FormComponent Empresa={Empresa} setEmpresa={setEmpresa} File={File} setFile={setFile} Errores={ErrorValidacion}/>}></Modal>

            <SweetAlert2 {...swalProps}
            onConfirm={()=>{
                axios.delete('/api/empresa/'+Empresa.idempresa
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