import { useState } from 'react';
import {Input, Button} from "@nextui-org/react";

function Pago() {
	
	return (
        <div>
            <div className='btn-clear-all'>
                <h1 className='text-center'>PAGO CON TARJETA</h1>
            </div>
            <div className="container-inputs w-2/5">
                <Input type='text' label="NOMBRE COMPLETO" placeholder="Tal y como aparece en la tarjeta" />
                <Input type='number' label="NÚMERO DE TARJETA" placeholder="Digite los 16 números" />
                <Input type='number' label="FECHA DE VENCIMIENTO" placeholder="MM/AA" />
                <Input type='number' label="CVV" placeholder="CVV" />
            </div>
            <div className='cart-empty'>
                <Button className='btn'>Pagar</Button>
            </div>
        </div>
	);
}

export default Pago;