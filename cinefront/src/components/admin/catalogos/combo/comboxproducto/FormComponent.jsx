import React,{ useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
export default function FormComponent({ComboDetalle,setComboDetalle, Errores}){
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
                <Select isRequired label="Selecciona un Producto" onChange={changeProducto}>
                    {ListaProductos.map((Producto)=>(
                        <SelectItem key={Producto.idproducto} value={Producto.idproducto}>
                            {Producto.nombre}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div>
                    <Input name="nombre" label="Nombre" value={ComboDetalle.nombre}></Input>
                    {!Object.is(Errores.nombre,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.nombre[0]}</label> : null}
                </div>
                <div>
                    <Input name="valor" label="Valor" value={ComboDetalle.valor}></Input>
                    {!Object.is(Errores.valor,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.valor[0]}</label> : null}
                </div>
                <div>
                    <Input name="cantidad" label="Cantidad" value={ComboDetalle.cantidad} onChange={handleCantidad}></Input>
                    {!Object.is(Errores.cantidad,undefined) ? <label className="mensajeerrorvalidacion" htmlFor="">{Errores.cantidad[0]}</label> : null}
                </div>
            </div>
        </div>
    )
}