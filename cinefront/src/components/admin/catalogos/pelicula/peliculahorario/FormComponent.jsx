import React, { useEffect, useState } from "react";
import { Input,Select,SelectItem } from "@nextui-org/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function FormComponent({PeliculaHorario,setPeliculaHorario}){
    const [startDate, setStartDate] = useState(new Date());
    const [ListaSalas,setListaSalas]=useState([
    ]);
    useEffect(()=>{
        ListarSalas();
    },[])
    function handleHora(e){
        setPeliculaHorario({...PeliculaHorario,hora:e.target.value});
    }
    function changeIdSala(e){
        setPeliculaHorario({...PeliculaHorario,idsala:e.target.value});
    }
    function handleDate(date){
        setStartDate(date);
        let year=date.getFullYear();
        let month=date.getMonth()+1;
        let day=date.getDate();
        let cadenafecha=year+'-'+month+'-'+day;
        let hour=date.getHours();
        let minutes=date.getMinutes();
        let cadenahora=hour+':'+minutes;
        PeliculaHorario.fecha=cadenafecha;
        PeliculaHorario.hora=cadenahora;
        // console.log(year+'-'+month+'-'+day+' '+hour+':'+minutes);
    }
    function ListarSalas(){
        axios.get("/api/salas"
        ).then((res)=>{
            let data=res.data;
            setListaSalas(data);
        });
    }
    return(
        <div>
            <div className="grid grid-cols-2">
                <Select defaultSelectedKeys={[PeliculaHorario.idsala.toString()]} label="Selecciona una sala" onChange={changeIdSala}>
                {ListaSalas.map((Sala)=>(
                        <SelectItem key={Sala.idsala} value={Sala.idsala}>
                            {Sala.nombre}
                        </SelectItem>
                    ))}
                </Select>
                <DatePicker withPortal showTimeInput customInput={<Input label="Fecha"></Input>} selected={startDate} onChange={(date)=>handleDate(date)}></DatePicker>
                {/* <Input name="horario" label="Horario" type="text" value={PeliculaHorario.hora} onChange={handleHora}/>  */}
            </div>
        </div>
    )
}