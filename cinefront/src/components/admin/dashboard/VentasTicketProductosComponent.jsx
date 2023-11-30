import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Doughnut, Pie} from "react-chartjs-2";
import axios from "axios";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
ChartJS.register(ArcElement, Tooltip, Legend)
export default function VentasTicketProductosComponent(){
    const [labels,setLabels]=useState([]);
    const [dataValues,setDataValues]=useState([]);
    const [backgroundColors,setBackgroundColors]=useState([]);

    useEffect(()=>{
        GetData();
    },[]);

    function GetData(){
        setTimeout(() => {
            axios.get("/api/dashboardproductosvendidos"
            ).then((res)=>{
                let etiquetas=res.data.labels;
                let valores=res.data.values;
                let colores=res.data.colors;
                setLabels(etiquetas);
                setDataValues(valores);
                setBackgroundColors(colores);
            })
        }, 1000);
    }
    return(
        <div>
            <Card>
                <CardHeader>
                    <h1>Productos vendidos</h1>
                </CardHeader>
                <Divider></Divider>
                <CardBody>
                    <Pie datasetIdKey='id'
                        options={
                            {
                                responsive:true,
                                maintainAspectRatio:false,
                                plugins:{
                                    legend:{
                                        labels:{color:"#FFF"}
                                    }
                                }
                            }
                        }
                        style={{height:"300px"}}
                        data={
                            {
                            labels: labels,
                            datasets: [
                              {
                                id: 1,
                                label: 'Monto',
                                data: dataValues,
                                backgroundColor: backgroundColors
                              },
                            ],
                        }
                    }
                    ></Pie>
                </CardBody>
            </Card>
            {/* <Doughnut
            datasetIdKey='id'
            data={
                {
                labels: labels,
                datasets: [
                  {
                    id: 1,
                    label: 'No. de Ventas',
                    data: dataValues,
                    backgroundColor: backgroundColors
                  },
                ],
            }
        }
            /> */}
        </div>
    )
}