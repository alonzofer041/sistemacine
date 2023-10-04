import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {Doughnut} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend)
export default function VentasTicketProductosComponent(){
    return(
        <div>
            <h1>Ventas de Productos</h1>
            <Doughnut
            datasetIdKey='id'
            data={
                {
                labels: ['HotDogs', 'Palomitas', 'Golosinas','Refresco','Sabritas','Palomeras'],
                datasets: [
                  {
                    id: 1,
                    label: 'No. de Ventas',
                    data: [120, 134, 123,68,120,180],
                    backgroundColor: [
                        'rgba(0, 36, 170, 1)',
                        'rgba(0, 203, 209, 1)',
                        'rgba(193, 0, 209, 1)',
                        'rgba(209,57,0,1)',
                        'rgba(131,36,0,1)',
                        'rgba(56,0,131,1)']
                  },
                ],
            }
        }
            />
        </div>
    )
}