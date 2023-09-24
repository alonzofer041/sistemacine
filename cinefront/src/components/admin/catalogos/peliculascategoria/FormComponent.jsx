import { Input } from "@nextui-org/react";
import React, { useState } from "react";
// class FormComponent extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             nombre:""
//         }
//     }
//     render(){
//         function handleNombre(e){
//             this.state.nombre=e.target.value
//         }
//         return(
//             <div className="container">
//                 <Input value={this.state.nombre} onChange={handleNombre} label="Nombre del Género"></Input>
//             </div>
//         )
//     }
// }
// export default FormComponent;
export default function FormComponent({PeliculaCategoria,setPeliculaCategoria}){
    function handleNombre(e){
        setPeliculaCategoria({...PeliculaCategoria,nombre:e.target.value});
    }
    return (
        <div className="container">
            <Input name="nombre" label="Nombre del Género" value={PeliculaCategoria.nombre} onChange={handleNombre}></Input>
        </div>
        
    )
}