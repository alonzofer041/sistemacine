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
          <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                  <BiLogIn size={50}></BiLogIn>
                  <div className="flex flex-col">
                      <p className="text-md">Registrarse</p>
                  </div>
              </CardHeader>

              <Divider/>

              <Divider/>

              <CardBody>
                  <div>
                      <Input type="text" label="Nombre" placeholder="Ingresa tu nombre" value={UsuarioRegistro.nombre} onChange={handleNombre}/>
                  </div>
              </CardBody>

              <CardBody>
                  <div>
                      <Input type="text" label="Email" placeholder="Ingresa tu email" value={UsuarioRegistro.correo} onChange={handleCorreo}/>
                  </div>
              </CardBody>

              <Divider/>

              <CardBody>
                  <div>
                      <Input type="password" label="Contraseña" placeholder="Ingresa tu contraseña" value={UsuarioRegistro.password} onChange={handlePassword}/>
                  </div>
              </CardBody>

              <Divider/>

          </Card>
          {/* <div className="flex w-full flex-col">
            <Card>
              <CardBody>
                  <Card className="max-w-[400px]">
                      <CardHeader className="flex gap-3">
                          <BiBody size={50}></BiBody>
                          <div className="flex flex-col">
                              <p className="text-md">Regístrate</p>
                          </div>
                      </CardHeader>

                      <Divider/>

                      <CardBody>
                      <div>
                          <Input type="text" label="Nombre" placeholder="Ingresa tu nombre completo" />
                      </div>
                      </CardBody>

                      <Divider/>

                      <CardBody>
                      <div>
                          <Input type="text" label="Nombre de usuario" placeholder="Crea tu nombre de usuario" />
                      </div>
                      </CardBody>

                      <Divider/>

                      <CardBody>
                      <div>
                          <Input type="email" label="Correo electrónico" placeholder="Ingresa un correo electrónico" />
                      </div>
                      </CardBody>

                      <Divider/>

                      <CardBody>
                      <div>
                          <Input type="password" label="Contraseña" placeholder="Crea una contraseña" />
                      </div>
                      </CardBody>

                      <Divider/>

                      <CardBody>
                      <div>
                          <Input type="password" label="Confirmar contraseña" placeholder="Ingresa nuevamente la contraseña" />
                      </div>
                      </CardBody>

                      <Divider/>

                      <CardFooter>
                          <Button color="primary" variant="shadow" className="btn">
                              Crear cuenta.
                          </Button>  
                      </CardFooter>
                  </Card>
              </CardBody>
            </Card>
          </div>   */}
      </div>
    );
}   