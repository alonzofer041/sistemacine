import React from "react";

import {Button, Card, CardHeader, CardBody, CardFooter, Divider, Image, Tabs, Tab, Input} from "@nextui-org/react";
import { BiBody } from 'react-icons/bi';
import { BiLogIn } from 'react-icons/bi';
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { MensajeExito } from "../../../helpers/functions";
export default function Register() {
    const navigate=useNavigate();
    let {idempresa,idsucursal}=useParams();
    const [UsuarioRegistro,setUsuarioRegistro]=React.useState({
        nombre:'',
        correo:'',
        password:''
    })
    function handleNombre(e){
        setUsuarioRegistro({...UsuarioRegistro,nombre:e.target.value});
    }
    function handleCorreo(e){
        setUsuarioRegistro({...UsuarioRegistro,correo:e.target.value});
    }
    function handlePassword(e){
        setUsuarioRegistro({...UsuarioRegistro,password:e.target.value});
    }
    function Guardar(){
        let obj={
            nombre:UsuarioRegistro.nombre,
            correo:UsuarioRegistro.correo,
            password:UsuarioRegistro.password,
            idempresa:idempresa,
            idsucursal:idsucursal
        }
        axios.post('/api/register',obj
        ).then((res)=>{
            MensajeExito("El Usuario se ha Registrado con Éxito");
            navigate("/login");
        });
    }
    return (
      <div className="tabs">
        <Card className="cards">
            <CardHeader>
                <h1 className="text-center">Registro de Usuario</h1>
            </CardHeader>
        <CardBody>
                  <div>
                      <Input type="text" label="Nombre" placeholder="Ingresa tu nombre" value={UsuarioRegistro.nombre} onChange={handleNombre}/>
                  </div>
              </CardBody>

              <Divider/>

              <CardBody>
                  <div>
                      <Input type="text" label="Correo electrónico" placeholder="Ingresa tu correo electrónico" value={UsuarioRegistro.correo} onChange={handleCorreo}/>
                  </div>
              </CardBody>

              <Divider/>

              <CardBody>
                  <div>
                      <Input type="password" label="Contraseña" placeholder="Ingresa tu contraseña" value={UsuarioRegistro.password} onChange={handlePassword}/>
                  </div>
              </CardBody>
              <Divider/>
              <CardFooter className="justify-end">
                <Button className="btn" onClick={()=>Guardar()}>Registrarse</Button>
              </CardFooter>
        </Card>
              
      </div>
    );
}   