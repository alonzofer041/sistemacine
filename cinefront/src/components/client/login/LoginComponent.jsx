import React, { useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";

import {Button, Card, CardHeader, CardBody, CardFooter, Divider, Image, Tabs, Tab, Input} from "@nextui-org/react";
import { BiLogIn } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Register from "../register/RegisterComponent";

export default function Login() {
    const [Usuario,setUsuario]=useState({
        id:0,
        correo:'',
        password:''
    })
    const [UsuarioRegistro,setUsuarioRegistro]=useState({
        nombre:'',
        correo:'',
        password:'',
        rol:'admin',
        idempresa:1,
        idsucursal:1
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
            const token=res.data.token;
            setToken(token);
            const DecodedToken=jwtDecode(token);
            // console.log(DecodedToken.Usuario.rol);
            if (DecodedToken.Usuario.rol=='root') {
                navigate("/menuroot");
            }
            else{
                navigate("/configuracion");
            }
        })
    }
    async function register(){
        let obj={
            nombre:UsuarioRegistro.nombre,
            correo:UsuarioRegistro.correo,
            password:UsuarioRegistro.password,
        }
        axios.post("/api/register",obj
        ).then((res)=>{
            alert("usuario registrado");
        }).catch((err)=>{
            alert ("Algo falló");
        })
    }
    return (
        <div className="tabs">
            <Tabs>
                <Tab title="Iniciar sesión">
                    <Card className="cards">
                        <CardBody>
                            <Card>
                                <CardHeader>
                                    <BiLogIn size={50}></BiLogIn>
                                    <div>
                                        <p>Iniciar sesión</p>
                                    </div>
                                </CardHeader>

                                <Divider/>

                                <CardBody>
                                    <div>
                                        <Input type="text" label="Correo electrónico" placeholder="Ingresa tu correo electrónico" value={Usuario.correo} onChange={handleCorreo}/>
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
                                    <Button className="btn" onClick={Login}>
                                        Iniciar sesión
                                    </Button>  
                                </CardFooter>
                            </Card>
                        </CardBody>
                    </Card>  
                </Tab>
                {/* <Tab title="No tengo cuenta">
                    <Card className="cards">
                        <CardBody>
                            <Card>
                                <CardHeader>
                                    <BiLogIn size={50}></BiLogIn>
                                    <div>
                                        <p>Registrarse</p>
                                    </div>
                                </CardHeader>

                                <Divider/>

                                <Register UsuarioRegistro={UsuarioRegistro} setUsuarioRegistro={setUsuarioRegistro}></Register> */}
                                {/* <Image
                                    src="https://cur.glitter-graphics.net/pub/3719/3719211j01pncxkem.gif"
                                    width={300}
                                />  */}
                    
                                {/* <Divider/>

                                <CardFooter>
                                    <Button className="btn" onClick={register}>
                                        Crear una cuenta
                                    </Button>
                                </CardFooter>
                            </Card>
                        </CardBody>
                    </Card>  
                </Tab> */}
            </Tabs>
        </div>  
    );
}