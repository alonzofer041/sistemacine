import { Input, Spacer } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({ProductoData,setProductoData}){
    function handleNombre(e){
        setProductoData({...ProductoData,nombre:e.target.value});
    }
    function handlePrecio(e){
        setProductoData({...ProductoData,precio:e.target.value});
    }
    function handleCantidad(e){
        setProductoData({...ProductoData,cantidad:e.target.value});
    }
    return (
        <div className="container" >
            <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
                <Input name="nombre"  label="Nombre Producto"  value={ProductoData.nombre} onChange={handleNombre}></Input>
                <div className="flex w-full flex gap-2">
                    <Input name="precio"  label="Precio"  value={ProductoData.precio} onChange={handlePrecio}></Input>
                    <Input name="cantidad"  label="Cantidad" type="number" value={ProductoData.cantidad} onChange={handleCantidad}></Input>
                </div>  
            </div>  
        </div>
    )
}