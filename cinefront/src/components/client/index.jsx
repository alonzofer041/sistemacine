import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { EmpresaContext } from "../../provider/EmpresaProvider";
import { useNavigate } from "react-router-dom";

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
        <div className="container mt-3">
            <div className="flex gap-3 justify-center">
                {Empresas.map((Empresa)=>(
                    <button key={Empresa.idempresa} onClick={()=>SeleccionarEmpresa(Empresa)}>
                        <Card>
                            <CardHeader>{Empresa.nombrecomercial}</CardHeader>
                            <Divider/>
                            <CardBody>{Empresa.nombrecomercial}</CardBody>
                        </Card>
                    </button>
                ))}
            </div>
        </div>
    )
}