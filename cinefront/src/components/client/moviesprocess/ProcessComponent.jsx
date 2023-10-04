import React from "react";

import {Checkbox ,Button, Card, CardHeader, CardBody, CardFooter, Divider, Tabs, Tab, Input, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure} from "@nextui-org/react";
import { GiTicket, GiDirectorChair, GiSwipeCard } from "react-icons/gi";
import { asientos } from "./data";

export default function GetTickets() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="center2">
        <div className="">
      <Tabs aria-label="Options">
        <Tab title="Paso 1 - Boletos">
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
        <Tab title="Paso 2 - Asientos">
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
                        {asientos.map((sillas) => (
                            <Checkbox>{sillas}</Checkbox>
                        ))}
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
        <Tab title="Paso 3 - Pago">
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