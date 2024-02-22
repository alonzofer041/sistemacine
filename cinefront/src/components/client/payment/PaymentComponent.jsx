import { useState } from 'react';
import {Input, Button, Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";



function Pago({Orden,setOrden,Errores, DatosCorreo, setDatosCorreo,CardElement}){ 

	function handleNombreCliente(e){
        setOrden({...Orden,nombrecliente:e.target.value});
        setDatosCorreo({...DatosCorreo,nombrecliente:e.target.value});
    }
    function handleCorreoCliente(e){
        setOrden({...Orden,correocliente:e.target.value});
        setDatosCorreo({...DatosCorreo,correocliente:e.target.value});
    }
	return (
        <div >
            {/* <div className='btn-clear-all'>
                <h1 className='text-center'>PAGO CON TARJETA</h1>
            </div> */}
            <div className="flex flex-col gap-1">
                <Card>
                    <CardBody>
                    <div>
                        <Input isRequired type='text' label="Nombre completo" value={Orden.nombrecliente} onChange={handleNombreCliente}/>
                        {!Object.is(Errores.nombrecliente,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombrecliente[0]}</label> : null}
                    </div>
                    </CardBody>
                    <Divider/>
                    <CardBody>
                    <div>
                        <Input isRequired type='text' label="Correo electrónico" value={Orden.correocliente} onChange={handleCorreoCliente}/>
                        {!Object.is(Errores.correocliente,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.correocliente[0]}</label> : null}
                    </div>
                    </CardBody>
                    <Divider/>
                    <CardElement className="stripeconfig"></CardElement>
                </Card>
                <div>
                    <p className="asterisco">* Campos obligatorios</p>
                </div>
                {/* <Input type='text' label="NOMBRE DE LA TARJETA" placeholder="Tal y como aparece en la tarjeta" />
                <Input type='number' label="NÚMERO DE TARJETA" placeholder="Digite los 16 números" />
                <Input type='number' label="FECHA DE VENCIMIENTO" placeholder="MM/AA" />
                <Input type='number' label="CVV" placeholder="CVV" /> */}
            </div>
            {/* <div className='cart-empty'>
                <Button className='btn'>Pagar</Button>
            </div> */}
        </div>
	);
}

export default Pago;