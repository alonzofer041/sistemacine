import React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function MensajeExito(texto){
    toast.success(texto,{
        position: toast.POSITION.BOTTOM_RIGHT,
    });
}
export function MensajeAdvertencia(texto){
    toast.warning(texto,{
        position: toast.POSITION.BOTTOM_RIGHT,
    });
}
export function ImagePreview(e){
    let Archivo=e.target.files[0];
    if (Archivo!=undefined) {
        let TamanioArchivo=Archivo.size / 1024 / 1024;
        if (TamanioArchivo>5) {
            toast.warning("Sólo se pueden admitir archivos menores a 5 MB",{
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return false
        }
        let ExtensionesPermitidas=/(\.jpg|\.jpeg|\.png)$/i;
        if (!ExtensionesPermitidas.exec(Archivo.name)) {
            toast.warning("Sólo se pueden admitir archivos con las extensiones .jpeg/.jpg/.png",{
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return false;
        }
        const Renderizado=new FileReader();
        Renderizado.readAsDataURL(Archivo);
        Renderizado.onload=r=>{
            let CadenaImagen=r.target.result;
            document.getElementById("ImagePreview").style.backgroundImage="url('"+CadenaImagen+"')";
        }
        return true;
    }
    else{
        return false;
    }
}