import { Button } from "@nextui-org/react";
import React from "react";
export default function BtnAccionComponent({
    MostrarBtnEditar,
    MostrarBtnEliminar,
    EmitSeccion,
    BotonesAdicionales,
    EventoEliminar,
    EventoEditar
}){
    let {BotonEditar,BotonEliminar}=<></>;
    if (MostrarBtnEditar) {
        BotonEditar=<Button onClick={EventoEditar} color="warning" className="mr-5" radius="full">Editar</Button>
    }
    if (MostrarBtnEliminar) {
        BotonEliminar=<Button onClick={EventoEliminar} color="danger">Eliminar</Button>
    }
    return(
        <>
            {BotonEditar}
            {BotonEliminar}
        </>
    )
}