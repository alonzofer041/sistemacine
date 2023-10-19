import { Input, Spacer } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

export default function FormComponent({Producto,setProducto, File, setFile}){
    const [ProveedorList,setProveedorList]=useState([]);
    function handleNombre(e){
        setProducto({...Producto,nombre:e.target.value});
    }
    function handlePrecio(e){
        setProducto({...Producto,valor:e.target.value});
    }
    function handleCantidad(e){
        setProducto({...Producto,cantidad:e.target.value});
    }
    function handleFile(e){
        let value=e.target.files;
        console.log(value[0]);
        setFile(value[0]);
    }
    function ListaProveedor(){
        axios.get("/api/proveedor"
        ).then((res)=>{
            let data=res.data;
            setProveedorList(data);
        });
    }

    return (
        <div className="container" >
            <div className="flex w-full flex-wrap md:flex-nowrap gap-2">
                <Input name="nombre"  label="Nombre Producto"  value={Producto.nombre} onChange={handleNombre}></Input>
                <div className="flex w-full flex gap-2">
                    <Input type="number" name="valor"  label="Precio"  value={Producto.valor} onChange={handlePrecio}></Input>
                    <Input name="cantidad"  label="Cantidad" type="number" value={Producto.cantidad} onChange={handleCantidad}></Input>
                </div> 
                <div>
                    <input type="file" name="files" onChange={handleFile}/>
                </div> 
            </div>  
        </div>
    )
}