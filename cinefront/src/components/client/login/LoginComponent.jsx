import React, { useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";

import {Button, Card, CardHeader, CardBody, CardFooter, Divider, Image, Tabs, Tab, Input} from "@nextui-org/react";
import { BiLogIn } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [Usuario,setUsuario]=useState({
        id:0,
        correo:'',
        password:''
    })
    function handleCorreo(e){
        setUsuario({...Usuario,correo:e.target.value})
    };
    function handlePassword(e){
        setUsuario({...Usuario,password:e.target.value})
    };
    const {setToken}=useAuth();
    const navigate=useNavigate();
    async function Login(){
        let obj={
            correo:Usuario.correo,
            password:Usuario.password
        };
        await axios.post("/api/login",obj
        ).then((res)=>{
            setToken(res.data.token);
            navigate("/configuracion");
        })
    }
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
                                <Input type="text" label="Nombre de usuario" placeholder="Ingresa tu nombre de usuario" value={Usuario.correo} onChange={handleCorreo}/>
                            </div>
                            </CardBody>

                            <Divider/>

                            <CardBody>
                            <div>
                                <Input type="password" label="Contraseña" placeholder="Ingresa tu contraseña" value={Usuario.password} onChange={handlePassword}/>
                            </div>
                            </CardBody>

                            <Divider/>

                            <CardFooter>
                                <Button color="primary" variant="shadow" className="btn" onClick={Login}>
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