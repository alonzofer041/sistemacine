import React, { useContext, useEffect, useState } from "react";

import {Checkbox ,Button, Card, CardHeader, CardBody, CardFooter, Divider, Tabs, Tab, Input, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Select, SelectItem, RadioGroup, Radio, CheckboxGroup, Image, ModalFooter} from "@nextui-org/react";
import { GiTicket, GiDirectorChair, GiSwipeCard } from "react-icons/gi";
import { asientos } from "./data";
import { useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
// import {Sit} from "../../../assets/sit.svg";
import axios from "axios";
import { FormatearFecha, MensajeAdvertencia, MensajeExito } from "../../../helpers/functions";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";

const url=import.meta.env.VITE_ASSET_URL+'/peliculas/';

export default function GetTickets() {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const location=useLocation();
    const idpelicula=location.state?.idpelicula;
    const titulopelicula=location.state?.titulo;
    const imgportada=location.state?.imgportada;
    const fechafuncion=location.state?.fecha;

    const {Empresa,setEmpresa}=useContext(EmpresaContext);
    const {IdSucursal,setIdSucursal}=useContext(SucursalContext);

    const [SalasDisponibles,setSalasDisponibles]=useState([]);
    const [IdSala,setIdSala]=useState("");
    const [NombreSala,setNombreSala]=useState("");
    const [HorariosDisponibles,setHorariosDisponibles]=useState([]);
    const [HorarioSeleccionado,setHorarioSeleccionado]=useState("");
    const [Asientos,setAsientos]=useState([]);
    const [AsientosOcupados,setAsientosOcupados]=useState([]);
    const [NumFilaSeleccionada,setNumFilaSeleccionada]=useState(0);
    const [NumEntradasSeleccionadas,setNumEntradasSeleccionadas]=useState(0);
    const [AsientosSeleccionados,setAsientosSeleccionados]=useState([]);
    const [Nombre,setNombre]=useState("");
    const [Apellido,setApellido]=useState("");
    const [Correo,setCorreo]=useState("");
    const [PestaniasDeshabilitadas,setPestaniasDeshabilitadas]=useState([]);
    const [ErrorValidacion,setErrorValidacion]=useState([]);
    
    const [DatosCorreo,setDatosCorreo]=useState({
        correocliente:'',
        nombrecliente:'',
        cantidadentradas:0,
        preciototal:0,
    })

    useEffect(()=>{
        if (IdSala=="") {
            ListaSalasDisponibles();   
        }
        else{
            ListaHorariosDisponibles();
        }
    },[IdSala])

    useEffect(()=>{
        if (HorarioSeleccionado!="") {
            // ListarAsientos();
            ListarAsientosOcupados();
        }
    },[HorarioSeleccionado]);
    useEffect(()=>{
        ListarAsientos();
    },[AsientosOcupados])

    function handleIdSala(e){
        setIdSala(e.target.value);
        let indexSalas=SalasDisponibles.findIndex((item)=>{return item.IdSala=e.target.value});
        setNumFilaSeleccionada(SalasDisponibles[indexSalas].numfilas);
        setNombreSala(SalasDisponibles[indexSalas].nombre);
    }
    function handleHorarioSeleccionado(e){
        setHorarioSeleccionado(e.target.value);

    }
    function handleNumEntradasSeleccionadas(e){
        setNumEntradasSeleccionadas(e.target.value);
    }
    function handleAsientoSeleccionado(e,index,index2){
        if(e.target.checked){
            if (AsientosSeleccionados.length>=NumEntradasSeleccionadas) {
                MensajeAdvertencia("No se pueden seleccionar más asientos");
                e.target.checked=false;
            }
            else{
                document.getElementById("svg_"+index+"_"+index2).className="sillaseleccionada";
                setAsientosSeleccionados([...AsientosSeleccionados,e.target.value])
            }
        }
        else{
            document.getElementById("svg_"+index+"_"+index2).className="sillasdisponibles";
            setAsientosSeleccionados(AsientosSeleccionados.filter((a)=>{return a!==e.target.value}))
        }
    }
    function handleNombre(e){
        setNombre(e.target.value)
        setDatosCorreo(e.target.value)
    }
    function handleApellido(e){
        setApellido(e.target.value)
        setDatosCorreo(e.target.value)
    }
    function handleCorreo(e){
        setCorreo(e.target.value)
        setDatosCorreo(e.target.value)
    }
    async function ListaSalasDisponibles(){
        let year=fechafuncion.getFullYear();
        let month=fechafuncion.getMonth()+1;
        let day=fechafuncion.getDate();
        let fechaformat=year+'-'+month+'-'+day;
        await axios.get("/api/salasdisponibles/"+idpelicula,{
            params:{
                fecha:fechaformat
            }
        }
        ).then((res)=>{
            let data=res.data;
            setSalasDisponibles(data);
        })
    }
    async function ListaHorariosDisponibles(){
        let year=fechafuncion.getFullYear();
        let month=fechafuncion.getMonth()+1;
        let day=fechafuncion.getDate();
        let fechaformat=year+'-'+month+'-'+day;
        await axios.get("/api/horariosdisponibles",{
            params:{
                idpelicula:idpelicula,
                idsala:IdSala,
                fecha:fechaformat
            }
        }
        ).then((res)=>{
            let data=res.data;
            setHorariosDisponibles(data);
        })
    }
    async function ListarAsientos(){
        await axios.get("/api/asientosSala",{
            params:{
                idsala:IdSala
            }
        }).then((res)=>{
            let data=res.data;
            if (AsientosOcupados.length>0) {
                data.forEach((Asiento)=>{
                    let bndDisponibilidad=true;
                    AsientosOcupados.forEach((AsientoOcupado)=>{
                        if (AsientoOcupado.idasiento==Asiento.idasiento) {
                            bndDisponibilidad=false;
                        }
                    });
                    if (bndDisponibilidad) {
                        Asiento.estatus="disponible"
                    }
                    else{
                        Asiento.estatus="ocupado"
                    }
                });
            }
            else{
                data.forEach((Asiento)=>{
                    Asiento.estatus="disponible";
                })
            }
            setAsientos(data);
        })
    }
    async function ListarAsientosOcupados(){
        let horaIndex=HorariosDisponibles.findIndex((hora)=>{return hora.hora==HorarioSeleccionado});
        let hora=HorariosDisponibles[horaIndex];
        await axios.get("/api/asientosocupados",{
            params:{
                idhorario:hora.idhorariopelicula
            }
        }).then((res)=>{
            let data=res.data;
            setAsientosOcupados(data);
            // ListarAsientos();
            // setAsientos(array);
        })
    }
    async function GuardarOrden(){
        let AsientosData=[];
        let horaIndex=HorariosDisponibles.findIndex((hora)=>{return hora.hora==HorarioSeleccionado});
        let hora=HorariosDisponibles[horaIndex];
        AsientosSeleccionados.forEach((Asiento)=>{
            let AsientoIndex=Asientos.findIndex((as)=>{return as.nombre==Asiento});
            AsientosData.push(Asientos[AsientoIndex]);
        });
        let obj={
            idempresa:Empresa.idempresa,
            idsucursal:IdSucursal,
            idsala:IdSala,
            idpelicula:idpelicula,
            nombrecliente:Nombre,
            cantidadentradas:NumEntradasSeleccionadas,
            correocliente:Correo,
            estatus:'pagado',
            preciototal:NumEntradasSeleccionadas*30,
            idhorario:hora.idhorariopelicula,
            asientos:AsientosData
        }
        await axios.post("/api/ordenentrada",obj,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }).then((res)=>{
            MensajeExito("Se ha guardado la orden con éxito");
        }).catch((err)=>{
            setErrorValidacion(err.response.data.errors.errors);
        });
    }
    async function EnviarCorreoCompra(){
        let obj={
            nombrecliente:Nombre + ' ' + Apellido,
            titulo: titulopelicula,
            correocliente:Correo,
            cantidadentradas:NumEntradasSeleccionadas,
            nombreasiento:AsientosSeleccionados,
            hora: HorarioSeleccionado,
            nombresala: NombreSala,
            preciototal:NumEntradasSeleccionadas*30
        }
        axios.post("/api/pagoentradaemail",obj
        ).then((res)=>{
            MensajeExito("Correo Enviado");
        }).catch((err)=>{
            alert("Algo fallo");
            setErrorValidacion(err.response.data.errors.errors);
        })
    }

	const doBoth = () => {
		GuardarOrden();
		EnviarCorreoCompra();
	}
    return (
        <div className="center2">
            <div className="">
          <Tabs aria-label="Options">
            <Tab title="Paso 1 - Horario" key="Horario">
                <Card>
                    <CardHeader>
                        <p>Selecciona tu Horario para el día {FormatearFecha(fechafuncion)}</p>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody>
                        <Select label="Elige una Sala" onChange={handleIdSala} defaultSelectedKeys={IdSala}>
                        {SalasDisponibles.map((Sala)=>(
                            <SelectItem key={Sala.idsala} value={Sala.idsala}>{Sala.nombre}</SelectItem>
                        ))}
                        </Select>
                        <RadioGroup label="Selecciona un Horario" onChange={handleHorarioSeleccionado} value={HorarioSeleccionado}>
                            {HorariosDisponibles.map((Horario)=>(
                                <Radio key={Horario.idhorariopelicula} value={Horario.hora}>{Horario.hora}</Radio>
                            ))}
                        </RadioGroup>
                    </CardBody>
                </Card>
            </Tab>
            <Tab title="Paso 2 - Boletos" key="Boletos">
              <Card>
                <CardBody>
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <GiTicket size={50}></GiTicket>
                            <div className="flex flex-col">
                                <p className="text-md">Selecciona tus boletos</p>
                            </div>
                        </CardHeader>

                        <Divider/>

                        {/* <CardBody>
                        <div>
                            <Input type="number" min={0} labelPlacement="outside-left" label="Niño" className="inputs"/>
                        </div>
                        </CardBody> */}

                        <Divider/>

                        <CardBody>
                        <div>
                            <Input value={NumEntradasSeleccionadas} onChange={handleNumEntradasSeleccionadas} type="number" min={0} labelPlacement="outside-left" label="General $30" className="inputs"/>
                        </div>
                        </CardBody>

                        {/* <Divider/>

                        <CardBody>
                        <div>
                            <Input type="number" min={0} labelPlacement="outside-left" label="Adulto mayor" className="inputs"/>
                        </div>
                        </CardBody> */}

                        <Divider/>

                        {/* <CardFooter>
                            <Button variant="shadow" className="btn" >
                                Siguiente paso.
                            </Button>  
                        </CardFooter> */}
                    </Card>
                </CardBody>
              </Card>  
            </Tab>
            <Tab title="Paso 3 - Asientos" key="Asientos">
              <Card>
                <CardBody>
                    <Card className="max-w-[400px]">
                        <CardHeader className="flex gap-3">
                            <GiDirectorChair size={50}></GiDirectorChair>
                            <div className="flex flex-col">
                                <p className="text-md">Selecciona tu asiento</p>
                            </div>
                        </CardHeader>

                        <Divider/>

                        <CardBody>
                            <div style={{display:"flex",alignItems:"center",marginBottom:"1rem"}}>
                                <ReactSVG wrapper="span" className="sillasdisponibles" src="../../sit.svg"/>
                                <span className="textoasiento">Disponible</span>
                                
                                <ReactSVG wrapper="span" className="sillaseleccionada ml-2" src="../../sit.svg"/>
                                <span className="textoasiento">Seleccionado</span>
                                
                                <ReactSVG wrapper="span" className="sillasocupadas ml-2" src="../../sit.svg"/>
                                <span className="textoasiento">Ocupado</span>
                            </div>
                            <div>
                                <CheckboxGroup>
                                    {Array.from({length:NumFilaSeleccionada}).map((Fila,index)=>(
                                        <div key={index}><span className="mr-2">{index+1}</span>
                                            {Asientos.map((Asiento,index2)=>(
                                                (Asiento.fila==(index+1))?
                                                (<span style={{display:"inline-block"}} key={Asiento.idasiento}>
                                                    <input disabled={Asiento.estatus=="disponible" ? false : true} defaultChecked={(AsientosSeleccionados.some(item=>Asientos[index2].nombre===item)) ? true : false} onChange={(e)=>handleAsientoSeleccionado(e,index,index2)} style={{display:"none"}} type="checkbox" value={Asiento.nombre} id={index+'_'+index2}/>
                                                    {/* <Checkbox id={index+'_'+index2} key={Asiento.idasiento} value={Asiento.idasiento}></Checkbox>  */}
                                                    <label id={index+'_'+index2} htmlFor={index+'_'+index2} className="form-label">
                                                        <ReactSVG id={"svg_"+index+"_"+index2} className={Asiento.estatus=="disponible" ? "sillasdisponibles" : "sillasocupadas"} src="../../sit.svg"/>
                                                    </label>
                                                </span>)
                                                : null
                                            ))}
                                        </div>
                                    ))}
                                </CheckboxGroup>
                                {/* {asientos.map((sillas) => (
                                    <Checkbox>{sillas}</Checkbox>
                                ))} */}
                            </div>
                        </CardBody>

                        <Divider/>
                            
                        {/* <CardFooter>
                            <Button variant="shadow" className="btn" >
                                Siguiente paso.
                            </Button>  
                        </CardFooter> */}
                    </Card>
                </CardBody>
              </Card>  
            </Tab>
            {/* <Tab title="Paso 4 - Pago">
              <Card>
                <CardBody>
                    <Card className="max-w-[300px] m-auto">
                        <CardHeader className="flex gap-3">
                            <GiSwipeCard size={50}></GiSwipeCard>
                            <div className="flex flex-col">
                                <p className="text-md">Información personal</p>
                            </div>
                        </CardHeader>
                            
                        <Divider/>
                            
                        <CardBody>
                        <div>
                            <Input isRequired type="text" label="Nombre" placeholder="Ingresa tu nombre" />
                        </div>
                        </CardBody>
                            
                        <Divider/>

                        <CardBody>
                        <div>
                            <Input  isRequired type="text" label="Apellidos" placeholder="Ingresa tus apellidos" />
                        </div>
                        </CardBody>
                            
                        <Divider/>

                        <CardBody>
                        <div>
                            <Input  isRequired type="email" label="Correo electrónico" placeholder="Ingresa tu correo" />
                        </div>
                        </CardBody>
                            
                        <Divider/>
                            
                        <CardFooter>
                            <Button variant="shadow" className="btn" >
                                Ver Resumen.
                            </Button>
                        </CardFooter>
                    </Card>
                </CardBody>
              </Card>  
            </Tab> */}
            <Tab title="Paso 4 - Confirmar Compra">
                <Card style={{width:"50%", margin:"auto"}}>
                    <CardHeader>
                        <h3>Resumen de Compra</h3>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <div className="grid grid-cols-12">
                            <div className="col-span-3 mr-2">
                                <Image src={url+imgportada} width={180} alt="" />
                            </div>
                            <div className="col-span-9">
                                <p className="textoasiento">Título: {titulopelicula}</p>
                                <p className="textoasiento">Sala: {NombreSala}</p>
                                <p className="textoasiento">Hora: {HorarioSeleccionado}</p>
                                <p className="textoasiento">Asientos: {AsientosSeleccionados.map((asiento)=>asiento+", ")}</p>
                                <p className="textoasiento">Precio: $ {NumEntradasSeleccionadas*30}</p>
                            </div>
                        </div>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <Button onClick={onOpen} className="btn">Pagar</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
                                <ModalContent>
                                {(onClose) => (
                                    <>
                                    <ModalHeader className="flex flex-col gap-1">Datos de Pago</ModalHeader>
                                    <ModalBody>
                                        <Card>
                                            <CardBody>
                                            <div>
                                                <Input  onChange={handleNombre} value={Nombre} isRequired type="text" label="Nombre"/>
                                                {!Object.is(ErrorValidacion.nombrecliente,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{ErrorValidacion.nombrecliente[0]}</label> : null}
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <CardBody>
                                            <div>
                                                <Input onChange={handleApellido} value={Apellido} isRequired type="text" label="Apellidos"/>
                                                {!Object.is(ErrorValidacion.nombrecliente,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{ErrorValidacion.nombrecliente[0]}</label> : null}
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <Divider/>
                                            <CardBody>
                                            <div>
                                                <Input onChange={handleCorreo} value={Correo} isRequired type="text" label="Correo"/>
                                                {!Object.is(ErrorValidacion.correocliente,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{ErrorValidacion.correocliente[0]}</label> : null}
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            {/* <CardBody>
                                            <div>
                                                <Input isRequired type="number" label="Número de tarjeta"/>
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <CardBody>
                                            <div>
                                                <Input isRequired type="number" label="CVV"/>
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <CardBody>
                                            <div>
                                                <Input className="inputs" isRequired type="date" label="Fecha de expiración" labelPlacement="outside-left"/>
                                            </div>
                                            </CardBody>
                                            <Divider/> */}
                                        </Card>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className="btn" color="primary" onClick={doBoth} >Guardar Orden</Button>
                                    </ModalFooter>
                                    </>
                                )}
                                </ModalContent>
                            </Modal>
                    </CardFooter>
                </Card>
            </Tab>
          </Tabs>
        </div>  
    </div>
  );
}