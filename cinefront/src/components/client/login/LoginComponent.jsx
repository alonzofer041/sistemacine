import React from "react";

import {Button, Card, CardHeader, CardBody, CardFooter, Divider, Image, Tabs, Tab, Input} from "@nextui-org/react";
import { BiLogIn } from 'react-icons/bi';

export default function Login() {
  return (
    <div className="center">
        <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab title="Iniciar sesión">
          <Card>
            <CardBody>
                <Card className="max-w-[400px]">
                    <CardHeader className="flex gap-3">
                        <BiLogIn size={50}></BiLogIn>
                        <div className="flex flex-col">
                            <p className="text-md">Iniciar sesión</p>
                        </div>
                    </CardHeader>
                    
                    <Divider/>
                    
                    <CardBody>
                    <div>
                        <Input type="text" label="Nombre de usuario" placeholder="Ingresa tu nombre de usuario" />
                    </div>
                    </CardBody>
                    
                    <Divider/>

                    <CardBody>
                    <div>
                        <Input type="password" label="Contraseña" placeholder="Ingresa tu contraseña" />
                    </div>
                    </CardBody>
                    
                    <Divider/>
                    
                    <CardFooter>
                        <Button color="primary" variant="shadow" className="btn" >
                            Iniciar sesión.
                        </Button>  
                    </CardFooter>
                </Card>
            </CardBody>
          </Card>  
        </Tab>
        <Tab title="No tengo cuenta">
            <Card>
            <CardBody>
                <Card className="max-w-[400px]">
            <CardBody>
                <Image
                    src="https://cur.glitter-graphics.net/pub/3719/3719211j01pncxkem.gif"
                    width={300}
                /> 
            </CardBody>
            <Divider/>
            <CardFooter>
                <Button color="primary" variant="shadow" className="btn">
                    Crear una cuenta.
                </Button>
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