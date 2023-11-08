import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { EmpresaContext } from "../../provider/EmpresaProvider";
import { useNavigate } from "react-router-dom";

const url=import.meta.env.VITE_ASSET_URL+'/empresas/';
export default function ListaEmpresas(){
    const navigate=useNavigate();
    const [Empresas,setEmpresas]=useState([]);
    const {Empresa,setEmpresa}=useContext(EmpresaContext);

    useEffect(()=>{
        ListarEmpresas();
    },[]);
    function ListarEmpresas(){
        axios.get("/api/empresa"
        ).then((res)=>{
            let data=res.data
            setEmpresas(data);
        })
    }
    function SeleccionarEmpresa(item){
        let idempresa=item.idempresa;
        let nombrecomercial=item.nombrecomercial;
        setEmpresa({...Empresa,idempresa:idempresa,nombrecomercial:nombrecomercial});
        navigate("/cine/inicio");
    }
    return(
        <div className="container">
            <h1 className="text-center">Selecciona un Cine</h1>
            <div className="flex gap-3 justify-center mt-3">
                {Empresas.map((Empresa)=>(
                    <button key={Empresa.idempresa} onClick={()=>SeleccionarEmpresa(Empresa)}>
                        <Card>
                            <CardHeader>
                                <Image width={180} src={url+Empresa.imgempresa}></Image>
                            </CardHeader>
                            <Divider/>
                            <CardBody>
                                <h2 className="text-center">{Empresa.nombrecomercial}</h2>
                            </CardBody>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    )
}