import React from "react";
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
export default function VentasTicketMesComponent(){
    return(
        <div>
            <h1>Ventas de tickets por mes</h1>
            <Bar
                options={
                    {
                        responsive:true,   
                    }
                }
                style={
                    {
                        width:'100%',
                    }
                }
                data={
                    {
                        labels:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                        datasets:[
                            {
                                label:"No. de Ventas",
                                data:[100,230,123,45,230,212,304,120,125,340,323,230],
                                backgroundColor:[
                                    '#FFF'
                                ]
                            }
                        ]
                    }
                }
            >
            </Bar>
        </div>
    )
}