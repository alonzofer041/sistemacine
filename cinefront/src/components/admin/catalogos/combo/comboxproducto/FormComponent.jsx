import React,{ useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
export default function FormComponent({ComboDetalle,setComboDetalle}){
    const [ListaProductos,setListaProductos]=useState([
    ]);
    useEffect(()=>{
        ListarProductos();
    },[])
    function changeProducto(e){
        setComboDetalle({...ComboDetalle,
            nombre:ListaProductos[e.target.value].nombre,
            valor:ListaProductos[e.target.value].valor})
    }
    function handleCantidad(e){
        setComboDetalle({...ComboDetalle,
            cantidad:e.target.value})
    }
    function ListarProductos(){
        axios.get("/api/producto"
        ).then((res)=>{
            let data=res.data;
            setListaProductos(data);
        });
    }
    return(
        <div>
            <div className="grid-cols-1 mb-3">
                <Select label="Selecciona un Producto" onChange={changeProducto}>
                    {ListaProductos.map((Producto)=>(
                        <SelectItem key={Producto.idproducto} value={Producto.idproducto}>
                            {Producto.nombre}
                        </SelectItem>
                    ))}
                    {/* <SelectItem key="0" value={0}>Palomitas</SelectItem>
                    <SelectItem key="1" value={1}>Perros</SelectItem>
                    <SelectItem key="2" value={2}>Refresco</SelectItem> */}
                </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <Input name="nombre" label="Nombre" value={ComboDetalle.nombre}></Input>
                <Input name="valor" label="Valor" value={ComboDetalle.valor}></Input>
                <Input name="cantidad" label="Cantidad" value={ComboDetalle.cantidad} onChange={handleCantidad}></Input>
            </div>
        </div>
    )
}