import { Button, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import axios from 'axios';
import {Html5QrcodeScanner} from 'html5-qrcode';
import { useEffect, useState } from 'react';
import { MensajeExito } from '../../helpers/functions';
export default function Qrscan(){
    const [scanResult,setScanResult]=useState(null);
    const [ordenentrada,setOrdenEntrada]=useState({
        idordenentrada:0,
        idempresa:0,
        idsucursal:0,
        idsala:0,
        idpelicula:0,
        nombrecliente:'',
        cantidadentradas:0,
        correcliente:'',
        estatus:'',
        preciototal:0,
        created_at:''
    });

    useEffect(()=>{
        const scanner = new Html5QrcodeScanner('reader',{
            qrbox:{
                width:250,
                height:250
            },
            fps: 5
        });
        scanner.render(success,error);
        function success(result){
            scanner.clear();
            result=JSON.parse(result);
            setScanResult(result);
            // console.log(result);
            axios.get("/api/ordenentrada",{
                params:{
                    idordenentrada:result.idordenentrada
                }
            }).then((res)=>{
                let data=res.data;
                setOrdenEntrada(data);
                // console.log(res.data);
            })
        }
        function error(){
            console.warn(err);
        }
    },[]);

    function CambiarEstatus(){
        let obj={
            idordenentrada:scanResult.idordenentrada
        };
        axios.post("/api/ordenentradaestado",obj
        ).then((res)=>{
            MensajeExito("Se actualizó el estatus de la orden");
            setScanResult(null);
            setOrdenEntrada(null);
            window.location.reload();
        })
    }
    function VolverEscanearQr(){
        window.location.reload();
    }
    // function RegresaCard(){
    //     if (ordenentrada=="escaneada") {
    //         return (
    //             <Card>
    //                 <CardHeader>
    //                     <h2>Orden Encontrada, ¿Confirmar orden?</h2>
    //                 </CardHeader>
    //                 <CardBody>
    //                     <p>No. de Orden: {scanResult.idordenentrada}</p>
    //                     <p>Película: {scanResult.pelicula}</p>
    //                     <p>Sala: {scanResult.sala}</p>
    //                     <p>Hora: {scanResult.hora}</p>
    //                     <p>Asientos: {scanResult.asiento.map((asientoind)=>asientoind+", ")}</p>
    //                     <p>Nombre del Cliente: {scanResult.nombrecliente}</p>
    //                     <p>Pago Total: ${scanResult.pagototal}</p>
    //                 </CardBody>
    //                 <CardFooter>
    //                     <Button onClick={CambiarEstatus}>Confirmar Orden</Button>
    //                 </CardFooter>
    //             </Card>
    //         )
    //     }
    //     else{

    //     }
    // }
    
    return (
        <div className='tabs'>
            <h1>Escaneo</h1>
            {scanResult
            ?
                <div>
                    {ordenentrada.estatus!="escaneada"
                    ?
                        <Card>
                            <CardHeader>
                                <h2>Orden encontrada ¿Confirmar orden?</h2>
                            </CardHeader>
                            <CardBody>
                                <p>No. de orden: {scanResult.idordenentrada}</p>
                                <p>Película: {scanResult.pelicula}</p>
                                <p>Sala: {scanResult.sala}</p>
                                <p>Hora: {scanResult.hora}</p>
                                <p>Asientos: {scanResult.asiento.map((asientoind)=>asientoind+", ")}</p>
                                <p>Nombre del cliente: {scanResult.nombrecliente}</p>
                                <p>Total pagado: ${scanResult.pagototal}</p>
                            </CardBody>
                            <CardFooter>
                                <Button style={{padding:"10px"}} color='warning' onClick={CambiarEstatus}>Confirmar orden</Button>
                            </CardFooter>
                        </Card>
                    :
                        <Card>
                            <CardBody>
                                <h2>Esta orden ya ha sido escaneada</h2>
                                <Button style={{padding:"10px", marginTop:"20px"}} color='warning' onClick={VolverEscanearQr}>Escanear otro código</Button>
                            </CardBody>
                        </Card>
                    }
                    
                </div>
            :
                <div id='reader'></div>
            }
        </div>
    )
}