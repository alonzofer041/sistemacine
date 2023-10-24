import { Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FormComponent({Producto,setProducto, File, setFile}){
    const [ProveedorList,setProveedorList]=useState([]);
    const [ProductoCategoriaList,setProductoCategoriaList]=useState([]);
    useEffect(()=>{
        ListaProveedor();
        ListaCategoria();
    },[]);
    function handleNombre(e){
        setProducto({...Producto,nombre:e.target.value});
    }
    function handlePrecio(e){
        setProducto({...Producto,valor:e.target.value});
    }
    function handleCantidad(e){
        setProducto({...Producto,cantidad:e.target.value});
    }
    function handleIdProveedor(e){
        setProducto({...Producto,idproveedor:e.target.value});
    }
    function handleIdProductoCategoria(e){
        setProducto({...Producto,idproductocategoria:e.target.value});
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
    function ListaCategoria(){
        axios.get("/api/productocategoria"
        ).then((res)=>{
            let data=res.data;
            setProductoCategoriaList(data);
        });
    }

    return (
        <div className="container" >
            <div className="flex w-full flex-wrap gap-2">
                <Input name="nombre"  label="Nombre Producto"  value={Producto.nombre} onChange={handleNombre}></Input>
                <div className="w-full flex gap-2">
                    <Select selectedKeys={[Producto.idproveedor]} onChange={handleIdProveedor} label="Seleccione un Proveedor">
                        {ProveedorList.map((Proveedor)=>(
                            <SelectItem key={Proveedor.idproveedor} value={Proveedor.idproveedor}>
                                {Proveedor.nombrecomercial}
                            </SelectItem>
                        ))}
                    </Select>
                    <Select onChange={handleIdProductoCategoria} label="Seleccione un Tipo de Producto">
                        {ProductoCategoriaList.map((ProductoCategoria)=>(
                            <SelectItem key={ProductoCategoria.idproductocategoria} value={ProductoCategoria.idproductocategoria}>
                                {ProductoCategoria.nombre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="w-full flex gap-2">
                    <Input type="number" name="valor"  label="Precio"  value={Producto.valor} onChange={handlePrecio}></Input>
                    <Input name="cantidad"  label="Cantidad" type="number" value={Producto.cantidad} onChange={handleCantidad}></Input>
                </div> 
                <div>
                    <input type="file" name="files"  onChange={handleFile}/>
                </div> 
            </div>  
        </div>
    )
}