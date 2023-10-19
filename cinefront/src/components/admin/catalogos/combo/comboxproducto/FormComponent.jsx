import React,{ useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
export default function FormComponent({ComboDetalle,setComboDetalle}){
    const [ListaProductos,setListaProductos]=useState([
        {idproducto:1,nombre:'palomitas',valor:35,cantidad:0},
        {idproducto:1,nombre:'perros',valor:55,cantidad:0},
        {idproducto:1,nombre:'refrescos',valor:40,cantidad:0},
    ]);
    function changeProducto(e){
        setComboDetalle({...ComboDetalle,
            nombre:ListaProductos[e.target.value].nombre,
            valor:ListaProductos[e.target.value].valor})
    }
    return(
        <div>
            <div className="grid-cols-1 mb-3">
                <Select label="Selecciona un Producto" onChange={changeProducto}>
                    <SelectItem key="0" value={0}>Palomitas</SelectItem>
                    <SelectItem key="1" value={1}>Perros</SelectItem>
                    <SelectItem key="2" value={2}>Refresco</SelectItem>
                </Select>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <Input name="nombre" label="Nombre" value={ComboDetalle.nombre}></Input>
                <Input name="valor" label="Valor" value={ComboDetalle.valor}></Input>
                <Input name="cantidad" label="Cantidad" value={ComboDetalle.cantidad}></Input>
            </div>
        </div>
    )
}