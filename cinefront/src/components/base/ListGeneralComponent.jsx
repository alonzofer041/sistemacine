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
    EventoLimpiar
}){
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();
    // useEffect(()=>{
    //     SetPaginator();
    // },[]);
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

    // const Bottom=React.useMemo(()=>{
    //     return(
    //         <div>
    //             <Pagination
    //             isCompact
    //             showControls
    //             showShadow
    //             color="primary"
    //             page={Filtro.Pagina}
    //             total={Filtro.TotalPaginas}
    //             onChange={(page)=>setFiltro({...Filtro,Pagina:page})}
    //             ></Pagination>
    //         </div>
    //     )
    // },[Filtro.Pagina,Filtro.TotalPaginas])

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
            <div className="grid grid-cols-3">
                <Input 
                startContent={<FaSearch/>} 
                placeholder="Buscar por nombre" 
                className="w-full"
                style={{height:"40px"}}
                value={Filtro.Nombre}
                onValueChange={FiltroEvento}></Input>

                <div>
                    <label className="text-default-400 text-small">Número de Filas</label>
                    <select className="bg-transparent outline-none text-default-400 text-small" onChange={()=>onRowsPerPageChange}>
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

            <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={Filtro.Pagina}
                total={Filtro.TotalPaginas}
                onChange={(page)=>setFiltro({...Filtro,Pagina:page})}
            ></Pagination>
            {/* <div className="hidden sm:flex w-[30%] justify-end gap-2">
                <Button isDisabled={Filtro.TotalPaginas === 1} size="sm" variant="flat" onPress={onPrevPage}>
                    Previous
                </Button>
                <Button isDisabled={Filtro.TotalPaginas === 1} size="sm" variant="flat" onPress={onNextPage}>
                    Next
                </Button>
            </div> */}
        </div>
    )
}