import { Button, Card, CardBody, Divider } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Compra(){
    const navigate=useNavigate();
    function inicio(){
        navigate("/cine/inicio");
    }
    return(
        <div className="tabs">
            <Card>
                <CardBody>
                    <p style={{fontSize:"80px", textAlign:"center"}} className='mb-2'>¡Felicidades!</p>
                    <p style={{fontSize:"60px", textAlign:"center"}} className='mb-2'>Su compra se ha realizado con éxito</p>
                    <Divider></Divider>
                    <Button onClick={inicio} className="btn" color="warning">Volver al Inicio</Button>
                </CardBody>
            </Card>
        </div>
    )
}