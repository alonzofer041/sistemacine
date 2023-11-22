import React, { useEffect, useState } from "react";
import VentasTicketComponent from "./VentasTicketGeneroComponent";
import VentasTicketMesComponent from "./VentasTicketMesComponent";
import VentasTicketProductosComponent from "./VentasTicketProductosComponent";
import VentasTicketMontoMes from "./VentasTicketMontoMes";
import axios from "axios";
import { Card, CardBody } from "@nextui-org/react";
export default function PrincipalComponent(){
    const [MontoTotalEntradas,setMontoTotalEntradas]=useState("");
    useEffect(()=>{
        DatosContadores();
    },[])
    function DatosContadores(){
        setTimeout(() => {
            axios.get("/api/dashboardcontadores"
            ).then((res)=>{
                let montoentradas=res.data.MontoTotalEntradas
                setMontoTotalEntradas(montoentradas);
            })
        }, 1000);
    }
    return(
        <div className="container m-auto">
            <div className="grid grid-cols-4 mt-4">
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20">
                            <h5>Total de productos vendidos</h5>
                            <h1 className="text-center text-3xl">17000</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5>Total de entradas vendidas</h5>
                            <h1 className="text-center text-3xl">18000</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5>Monto Total de Productos Vendidos</h5>
                            <h1 className="text-center text-3xl">$18000</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5>Monto Total de Entradas Vendidas</h5>
                            <h1 className="text-center text-3xl">${MontoTotalEntradas}</h1>
                        </div>   
                    </CardBody>
                </Card>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
                <VentasTicketComponent/>
                <VentasTicketMesComponent/>
                <VentasTicketMontoMes/>
                <VentasTicketProductosComponent/>
            </div>
        </div>
    )
}