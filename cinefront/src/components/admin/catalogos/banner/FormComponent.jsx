import { Input } from "@nextui-org/react";
import React, { useState } from "react";

export default function FormComponent({Banner,setBanner,File,setFile}){
    function handleFile(e){
        let value=e.target.files;
        setFile(value[0]);
    }
    return(
        <div>
            <div className="grid-grid-cols-1">
                <input type="file" name="files" onChange={handleFile}/>
            </div>
        </div>
    )
}