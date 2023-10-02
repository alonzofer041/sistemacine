import { Button, Link } from "@nextui-org/react";
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
        BotonEditar=<Button  onClick={EventoEditar} color="warning" as={Link}  variant="light" className="mr-5" radius="full">Editar</Button>
    }
    if (MostrarBtnEliminar) {
        BotonEliminar=<Button onClick={EventoEliminar} as={Link}  variant="light"  color="danger" className="mr-5">Eliminar</Button>
    }
    return(
        <>
            {BotonEditar}
            {BotonEliminar}
            {BotonesAdicionales}
        </>
    )
}