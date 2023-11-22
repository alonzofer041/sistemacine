import React, { useEffect, useState } from "react";
import { Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,useDisclosure, Input, Pagination, Button } from "@nextui-org/react";
import {FaSearch} from "react-icons/fa"
export default function ListGeneralComponent({
    Filtro,
    setFiltro,
    FiltroEvento,
    TotalElementos,
    EsModal,
    EmitSeccion,
    NombreLista,
    MostrarPrimerTitulo,
    Titulo,
    MostrarComponente,
    CabeceraTabla,
    CuerpoTabla,
    isOpen,onOpen,onOpenChange,
    EventoLimpiar,
    TotalPagina,
    ShowInput=true,
    ShowPaginador=true
}){

    const onNextPage=React.useCallback(()=>{
        if (Filtro.Pagina<Filtro.TotalPaginas) {
            let Pagina1=Filtro.Pagina+1;
            setFiltro({...Filtro,Pagina:Pagina1});
        }
    },[Filtro.Pagina,Filtro.TotalPaginas]);
    const onPrevPage=React.useCallback(()=>{
        if (Filtro.Pagina>1) {
            let Pagina1=Filtro.Pagina-1;
            setFiltro({...Filtro,Pagina:Pagina1})
        }
    },[Filtro.Pagina]);
    const onRowsPerPageChange=React.useCallback((e)=>{
        let Filas=Number(e.target.value);
        setFiltro({...Filtro,NumFilas:Filas,Pagina:1});
    },[]);
    const onClear = React.useCallback(()=>{
        setFiltro({...Filtro,Nombre:''});
        setFiltro({...Filtro,Pagina:1});
      },[])

    let boton=null;
    if (EsModal) {
        boton=<button onClick={()=>{onOpen();EventoLimpiar();}}><h3>Nuevo</h3></button>
    }
    return(
        <div>
            <div className="flex mt-3 mb-2 pt-4 ml-3">
                <div className="basis-1/4"><h3>{NombreLista + " / " + Titulo}</h3></div>
                <div className="basis-1/8">
                    {boton}
                </div>
            </div>
            <div className="grid grid-cols-3 mb-3 ml-3">
                {ShowInput ? (<Input 
                startContent={<FaSearch/>} 
                placeholder="Buscar por nombre" 
                className="w-full"
                style={{height:"40px"}}
                value={Filtro.Nombre}
                onClear={() => onClear()}
                onValueChange={FiltroEvento}></Input>) : null}
                

                <div className="ml-3 mt-2">
                    <label className="text-default-400 text-small">Número de Filas</label>
                    <select className="bg-transparent outline-none text-default-400 text-small" onChange={onRowsPerPageChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
           <Table aria-label="Example table with dynamic content">
            {CabeceraTabla}
            {CuerpoTabla}
            </Table>
            {ShowPaginador && TotalPagina>0?(
                <div className="mt-4 mb-3 flex justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={Filtro.Pagina}
                        total={TotalPagina}
                        onChange={(page)=>setFiltro({...Filtro,Pagina:page})}
                    ></Pagination>
                    <br />
                    <br />
                    <br />
                </div>
            ):null}
        </div>
    )
}