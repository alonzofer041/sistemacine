import React from "react";
import VentasTicketComponent from "./VentasTicketGeneroComponent";
import VentasTicketMesComponent from "./VentasTicketMesComponent";
import VentasTicketProductosComponent from "./VentasTicketProductosComponent";
export default function PrincipalComponent(){
    return(
        <div className="container m-auto">
            <div className="grid grid-cols-4 mt-4">
                <div className="shadow-lg h-20">
                    <h5>Total de productos vendidos</h5>
                    <h1 className="text-center text-3xl">17000</h1>
                </div>
                <div className="shadow-lg h-20 ml-3">
                    <h5>Total de entradas vendidas</h5>
                    <h1 className="text-center text-3xl">18000</h1>
                </div>
                <div className="shadow-lg h-20 ml-3">
                    <h5>Monto Total de Productos Vendidos</h5>
                    <h1 className="text-center text-3xl">$18000</h1>
                </div>
                <div className="shadow-lg h-20 ml-3">
                    <h5>Monto Total de Entradas Vendidas</h5>
                    <h1 className="text-center text-3xl">$18000</h1>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4">
                <VentasTicketComponent/>
                <VentasTicketMesComponent/>
                <VentasTicketProductosComponent/>
            </div>
        </div>
    )
}