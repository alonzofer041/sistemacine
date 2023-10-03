import React, { useState } from "react";
import { Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,useDisclosure } from "@nextui-org/react";

export default function ListGeneralComponent({
    Filtro,
    EsModal,
    EmitSeccion,
    NombreLista,
    MostrarPrimerTitulo,
    Titulo,
    MostrarComponente,
    CabeceraTabla,
    CuerpoTabla,
    isOpen,onOpen,onOpenChange,
    EventoLimpiar
}){
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    let boton=null;
    if (EsModal) {
        boton=<button onClick={()=>{onOpen();EventoLimpiar();}}><h3>Nuevo</h3></button>
    }
    return(
        <div>
            <div className="flex">
                <div className="basis-1/4"><h3>{NombreLista + " / " + Titulo}</h3></div>
                <div className="basis-1/8">
                    {boton}
                </div>
            </div>
           <Table aria-label="Example table with dynamic content">
            {CabeceraTabla}
            {CuerpoTabla}
            </Table>
            <p>{Filtro}</p>
        </div>
    )
}