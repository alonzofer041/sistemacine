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
  export default function MontoOrdenesProductosMes(){
    const [values,setValues]=useState([]);
    useEffect(()=>{
        getData();
    },[]);
    function getData(){
        setTimeout(() => {
            axios.get("/api/dashboardproductosvendidoslineasmes"
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
                    <h1>Monto de ventas de productos por mes</h1>
                </CardHeader>
                <Divider></Divider>
                <CardBody>
                    <Line
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
                                        grid:{color:"#636363"}
                                    },
                                    y:{
                                        ticks:{color:"#FFF"},
                                        grid:{color:"#636363"}
                                    }
                                } 
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
                                        borderColor:'rgb(12, 207, 0)',
                                        tension:0.1,
                                        borderWidth:4
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