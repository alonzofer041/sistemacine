import { Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImagePreview } from "../../../../helpers/functions";
import { FaUpload } from "react-icons/fa";
const url=import.meta.env.VITE_ASSET_URL+'/productos/';

export default function FormComponent({Producto,setProducto, File, setFile, Errores}){
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
        if(ImagePreview(e)){
            let value=e.target.files;
            setFile(value[0]);
        }
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
            <div className="grid grid-cols-12 mb-3">
                <div className="previaimagen">
                    <div className="contenedorinputimagen">
                        <input id="file" type="file" name="files"  onChange={handleFile}/><input/>
                        <label htmlFor="file">
                            <FaUpload className="iconoupload"/>
                        </label>
                    </div>
                    <div className="contenedorimagenprevia mb-2">
                        <div id="ImagePreview" style={{backgroundImage:"url('"+url+Producto.imgproducto+"')"}}></div>
                    </div>
                </div>
                <div className="col-span-8 mb-2">
                    <Input name="nombre"  label="Nombre Producto"  value={Producto.nombre} onChange={handleNombre}></Input>
                    {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label>:null}
                </div>
                
            </div>
            <div className="grid grid-cols-2 mb-2">
                    <div>
                        <Select selectedKeys={[Producto.idproveedor.toString()]} onChange={handleIdProveedor} label="Seleccione un Proveedor">
                            {ProveedorList.map((Proveedor)=>(
                                <SelectItem key={Proveedor.idproveedor} value={Proveedor.idproveedor}>
                                    {Proveedor.nombrecomercial}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="ml-2">
                        <Select selectedKeys={[Producto.idproductocategoria.toString()]} onChange={handleIdProductoCategoria} label="Seleccione un tipo de producto">
                            {ProductoCategoriaList.map((ProductoCategoria)=>(
                                <SelectItem key={ProductoCategoria.idproductocategoria} value={ProductoCategoria.idproductocategoria}>
                                    {ProductoCategoria.nombre}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-2 mb-2">
                    <div>
                        <Input name="valor" label="Precio"  value={Producto.valor} onChange={handlePrecio}></Input>
                        {!Object.is(Errores.valor,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.valor[0]}</label>:null}
                    </div>
                    <div className="ml-2">
                        <Input name="cantidad"  label="Cantidad" value={Producto.cantidad} onChange={handleCantidad}></Input>
                        {!Object.is(Errores.cantidad,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.cantidad[0]}</label>:null}
                    </div>
                </div>
        </div>
    )
}