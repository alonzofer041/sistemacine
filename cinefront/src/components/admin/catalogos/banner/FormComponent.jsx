import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ImagePreview } from "../../../../helpers/functions";
const url=import.meta.env.VITE_ASSET_URL+'/banners/';

export default function FormComponent({Banner,setBanner,File,setFile}){
    function handleFile(e){
        if (ImagePreview(e)) {
            let value=e.target.files;
            setFile(value[0]);   
        }
    }
    return(
        <div>
            <div className="grid-grid-cols-1">
                <div className="previaimagen">
                    <div className="contenedorinputimagen">
                        <input id="file" type="file" name="files" onChange={handleFile}/>
                        <label htmlFor="file">
                            <FaUpload className="iconoupload"/>
                        </label>
                    </div>
                    <div className="contenedorimagenprevia">
                        <div id="ImagePreview" style={{backgroundImage:"url('"+url+Banner.imgbanner+"')"}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}