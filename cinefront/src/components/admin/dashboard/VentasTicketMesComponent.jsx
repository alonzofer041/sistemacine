import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  import { Bar } from 'react-chartjs-2';
import axios from "axios";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
export default function VentasTicketMesComponent(){
    const [values,setValues]=useState([]);

    useEffect(()=>{
        getData();
    },[])
    function getData(){
        setTimeout(() => {
           axios.get("/api/dashboardticketsmes"
           ).then((res)=>{
            let valores=res.data.values;
            setValues(valores);
           })
        }, 500);
    }
    return(
        <div>
            <Card>
                <CardHeader>
                    <h1>Ventas de tickets por mes</h1>
                </CardHeader>
                <Divider></Divider>
                <CardBody>
                    <Bar
                    options={
                        {
                            responsive:true,
                            maintainAspectRatio:false,
                            plugins:{
                                legend:{
                                    labels:{color:"#FFF"}
                                }
                            },
                            scales:{
                                x:{
                                    ticks:{color:"#FFF"},
                                    grid:{color:"#939393"}
                                },
                                y:{
                                    ticks:{color:"#FFF"},
                                    grid:{color:"#939393"}
                                }
                            }  
                        }
                    }
                    style={
                        {
                            width:'100%',
                            height:"300px",
                        }
                    }
                    data={
                        {
                            labels:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                            datasets:[
                                {
                                    label:"No. de Ventas",
                                    data:values,
                                    backgroundColor:[
                                        '#FFF'
                                    ]
                                }
                            ]
                        }
                    }
                >
                    </Bar>
                </CardBody>
            </Card>
        </div>
    )
}