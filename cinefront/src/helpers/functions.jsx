import React from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function MensajeExito(texto){
    toast.success(texto,{
        position: toast.POSITION.BOTTOM_RIGHT,
    });
}