import React, { useEffect, useMemo, useState } from "react";
export const SucursalContext=React.createContext();
export const SucursalProvider=({children})=>{
    const [IdSucursal,setIdSucursal_]=useState(sessionStorage.getItem("idsucursal"));
    const setIdSucursal=(newIdSucursal)=>{
        setIdSucursal_(newIdSucursal);
    }
    useEffect(()=>{
        if (IdSucursal) {
            sessionStorage.setItem("idsucursal",IdSucursal);
        }
        else{
            setIdSucursal(0);
        }
    },[IdSucursal]);
    const ContextValue=useMemo(()=>({
        IdSucursal,
        setIdSucursal
    }),[IdSucursal]);

    return(
        <SucursalContext.Provider value={ContextValue}>{children}</SucursalContext.Provider>
    );
};