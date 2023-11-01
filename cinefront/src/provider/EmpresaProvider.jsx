import React, { useEffect, useMemo, useState } from "react";
export const EmpresaContext=React.createContext();
export const EmpresaProvider=({children})=>{
    const [Empresa,setEmpresa_]=useState(JSON.parse(sessionStorage.getItem("empresa")));
    const setEmpresa=(newEmpresa)=>{
        setEmpresa_(newEmpresa);
    }
    useEffect(()=>{
        if (Empresa) {
            sessionStorage.setItem("empresa",JSON.stringify(Empresa));
        }
        else{
            setEmpresa({});
        }
    },[Empresa]);
    const ContextValue=useMemo(()=>({
        Empresa,
        setEmpresa
    }),[Empresa]);

    return(
        <EmpresaContext.Provider value={ContextValue}>{children}</EmpresaContext.Provider>
    );
};