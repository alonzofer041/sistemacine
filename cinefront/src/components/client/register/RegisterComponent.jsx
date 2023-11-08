import React from "react";

import {Button, Card, CardHeader, CardBody, CardFooter, Divider, Image, Tabs, Tab, Input} from "@nextui-org/react";
import { BiBody } from 'react-icons/bi';
import { BiLogIn } from 'react-icons/bi';

export default function Register({UsuarioRegistro,setUsuarioRegistro}) {
    function handleNombre(e){
        setUsuarioRegistro({...UsuarioRegistro,nombre:e.target.value});
    }
    function handleCorreo(e){
        setUsuarioRegistro({...UsuarioRegistro,correo:e.target.value});
    }
    function handlePassword(e){
        setUsuarioRegistro({...UsuarioRegistro,password:e.target.value});
    }
    return (
      <div>

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
      </div>
    );
}   