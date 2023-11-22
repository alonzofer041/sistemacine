import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Compra(){
    const navigate=useNavigate();
    function inicio(){
        navigate("/cine/inicio");
    }
    return(
        <div className="center2">
            <Card>
                <CardBody>
                    <h1 className='mb-2'>Felicidades, su compra se realizó con éxito</h1>
                    <Divider></Divider>
                    <Button onClick={inicio} class="btn" color="primary">Volver al Inicio</Button>
                </CardBody>
            </Card>
        </div>
    )
}