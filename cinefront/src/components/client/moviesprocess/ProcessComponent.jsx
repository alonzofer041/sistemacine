import React, { useEffect, useState } from "react";

import {Checkbox ,Button, Card, CardHeader, CardBody, CardFooter, Divider, Tabs, Tab, Input, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Select, SelectItem, RadioGroup, Radio} from "@nextui-org/react";
import { GiTicket, GiDirectorChair, GiSwipeCard } from "react-icons/gi";
import { asientos } from "./data";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function GetTickets() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const location=useLocation();
    const idpelicula=location.state?.idpelicula;

    const [SalasDisponibles,setSalasDisponibles]=useState([]);
    const [IdSala,setIdSala]=useState("");
    const [HorariosDisponibles,setHorariosDisponibles]=useState([]);
    const [HorarioSeleccionado,setHorarioSeleccionado]=useState([]);
    const [Asientos,setAsientos]=useState([]);
    const [NumFilaSeleccionada,setNumFilaSeleccionada]=useState(0);

    useEffect(()=>{
        if (IdSala=="") {
            ListaSalasDisponibles();   
        }
        else{
            ListaHorariosDisponibles();
        }
    },[IdSala])

    useEffect(()=>{
        ListarAsientos()
    },[HorarioSeleccionado]);

    function handleIdSala(e){
        setIdSala(e.target.value);
        let indexSalas=SalasDisponibles.findIndex((item)=>{return item.IdSala=e.target.value});
        setNumFilaSeleccionada(SalasDisponibles[indexSalas].numfilas);
    }
    function handleHorarioSeleccionado(e){
        setHorarioSeleccionado(e.target.value);
    }
    async function ListaSalasDisponibles(){
        await axios.get("/api/salasdisponibles/"+idpelicula
        ).then((res)=>{
            let data=res.data;
            setSalasDisponibles(data);
        })
    }
    async function ListaHorariosDisponibles(){
        await axios.get("/api/horariosdisponibles",{
            params:{
                idpelicula:idpelicula,
                idsala:IdSala
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
            setAsientos(data);
        })
    }
    return (
        <div className="center2">
            <div className="">
          <Tabs aria-label="Options">
            <Tab title="Paso 1 - Horario">
                <Card>
                    <CardHeader>
                        <p>Selecciona tu Horario</p>
                    </CardHeader>
                    <Divider></Divider>
                    <CardBody>
                        <Select label="Elige una Sala" onChange={handleIdSala}>
                        {SalasDisponibles.map((Sala)=>(
                            <SelectItem key={Sala.idsala} value={Sala.idsala}>{Sala.nombre}</SelectItem>
                        ))}
                        </Select>
                        <RadioGroup label="Selecciona un Horario" onChange={handleHorarioSeleccionado}>
                            {HorariosDisponibles.map((Horario)=>(
                                <Radio key={Horario.idhorariopelicula} value={Horario.hora}>{Horario.hora}</Radio>
                            ))}
                        </RadioGroup>
                    </CardBody>
                </Card>
            </Tab>
            <Tab title="Paso 2 - Boletos">
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

                        <CardBody>
                        <div>
                            <Input type="number" min={0} labelPlacement="outside-left" label="Niño" className="inputs"/>
                        </div>
                        </CardBody>

                        <Divider/>

                        <CardBody>
                        <div>
                            <Input type="number" min={0} labelPlacement="outside-left" label="Adulto" className="inputs"/>
                        </div>
                        </CardBody>

                        <Divider/>

                        <CardBody>
                        <div>
                            <Input type="number" min={0} labelPlacement="outside-left" label="Adulto mayor" className="inputs"/>
                        </div>
                        </CardBody>

                        <Divider/>

                        <CardFooter>
                            <Button variant="shadow" className="btn" >
                                Siguiente paso.
                            </Button>  
                        </CardFooter>
                    </Card>
                </CardBody>
              </Card>  
            </Tab>
            <Tab title="Paso 3 - Asientos">
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
                        <div>
                            
                            {/* {asientos.map((sillas) => (
                                <Checkbox>{sillas}</Checkbox>
                            ))} */}
                        </div>
                        </CardBody>

                        <Divider/>
                            
                        <CardFooter>
                            <Button variant="shadow" className="btn" >
                                Siguiente paso.
                            </Button>  
                        </CardFooter>
                    </Card>
                </CardBody>
              </Card>  
            </Tab>
            <Tab title="Paso 4 - Pago">
              <Card>
                <CardBody>
                    <Card className="max-w-[400px]">
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
                            <Input isRequired type="text" label="Apellidos" placeholder="Ingresa tus apellidos" />
                        </div>
                        </CardBody>
                            
                        <Divider/>

                        <CardBody>
                        <div>
                            <Input isRequired type="email" label="Correo electrónico" placeholder="Ingresa tu correo" />
                        </div>
                        </CardBody>
                            
                        <Divider/>
                            
                        <CardFooter>
                            <Button onPress={onOpen} variant="shadow" className="btn" >
                                Pagar.
                            </Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                                <ModalContent>
                                {(onClose) => (
                                    <>
                                    <ModalHeader className="flex flex-col gap-1">Datos de Pago</ModalHeader>
                                    <ModalBody>
                                        <Card>
                                            <CardBody>
                                            <div>
                                                <Input isRequired type="text" label="Nombre"/>
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <CardBody>
                                            <div>
                                                <Input isRequired type="text" label="Apellidos"/>
                                            </div>
                                            </CardBody>
                                            <Divider/>
                                            <CardBody>
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
                                            <Divider/>
                                        </Card>
                                    </ModalBody>
                                    </>
                                )}
                                </ModalContent>
                            </Modal>
                        </CardFooter>
                    </Card>
                </CardBody>
              </Card>  
            </Tab>
          </Tabs>
        </div>  
    </div>
  );
}