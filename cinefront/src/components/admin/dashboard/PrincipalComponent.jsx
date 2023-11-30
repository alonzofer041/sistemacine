import React, { useEffect, useState } from "react";
import VentasTicketComponent from "./VentasTicketGeneroComponent";
import VentasTicketMesComponent from "./VentasTicketMesComponent";
import VentasTicketProductosComponent from "./VentasTicketProductosComponent";
import VentasTicketMontoMes from "./VentasTicketMontoMes";
import axios from "axios";
import { Card, CardBody } from "@nextui-org/react";
import MontoOrdenesProductosMes from "./MontoOrdenesProductosMes";
export default function PrincipalComponent(){
    const [TotalEntradas,setTotalEntradas]=useState(0);
    const [MontoTotalEntradas,setMontoTotalEntradas]=useState(0);
    const [TotalProductos,setTotalProductos]=useState(0);
    const [MontoTotalProductos,setMontoTotalProductos]=useState(0);
    useEffect(()=>{
        DatosContadores();
    },[])
    function DatosContadores(){
        setTimeout(() => {
            axios.get("/api/dashboardcontadores"
            ).then((res)=>{
                let montoentradas=res.data.MontoTotalEntradas;
                let totalentradas=res.data.TotalEntradas;
                let totalproductos=res.data.TotalProductos;
                let montoproductos=res.data.MontoTotalProductos;
                setMontoTotalEntradas(montoentradas);
                setTotalEntradas(totalentradas);
                setTotalProductos(totalproductos);
                setMontoTotalProductos(montoproductos);
            })
        }, 1000);
    }
    return(
        <div className="container m-auto">
            <div className="grid grid-cols-4 mt-4">
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20">
                            <h5 className="text-center">Total de productos vendidos</h5>
                            <h1 className="text-center text-3xl">{TotalProductos}</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5 className="text-center">Total de entradas vendidas</h5>
                            <h1 className="text-center text-3xl">{TotalEntradas}</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card className="mr-2">
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5 className="text-center">Monto total de productos vendidos</h5>
                            <h1 className="text-center text-3xl">${MontoTotalProductos}</h1>
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="shadow-lg h-20 ml-3">
                            <h5 className="text-center">Monto total de entradas vendidas</h5>
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
                <MontoOrdenesProductosMes/>
            </div>
        </div>
    )
}