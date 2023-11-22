import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  export default function VentasTicketMontoMes(){
    const [values,setValues]=useState([]);
    useEffect(()=>{
        getData();
    },[]);
    function getData(){
        setTimeout(() => {
            axios.get("/api/dashboardmontoticketsmes"
            ).then((res)=>{
                let valores=res.data.values;
                setValues(valores);
            })
        }, 1000);
    }
    return(
        <div>
            <Card>
                <CardHeader>
                    <h1>Monto de Ventas por Mes</h1>
                </CardHeader>
                <Divider></Divider>
                <CardBody>
                    <Line
                        options={
                            {
                                responsive:true,
                                maintainAspectRatio:false
                            }
                        }
                        data={
                            {
                                labels:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                                datasets:[
                                    {
                                        label:'Monto',
                                        data:values,
                                        fill:false,
                                        borderColor:'rgb(75, 192, 192)',
                                        tension:0.1
                                    }
                                ]
                            }
                        }
                    ></Line>
                </CardBody>
            </Card>
        </div>
    )
  }