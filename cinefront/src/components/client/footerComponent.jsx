import React from 'react';
import { FaSquareFacebook, FaSquareXTwitter, FaSquareInstagram, FaSquareYoutube } from "react-icons/fa6";
import LogoCine from "../../assets/logo2.png";
import {Image} from "@nextui-org/react";

export default function Footer() {
  return (
    <div className='footer'>
        <br />
        <div className='mb-3 footer-div' style={{paddingLeft:"20px", paddingRight:"10px"}}>
          <div className='banners'>
            <img src={LogoCine} width="200" alt="CineFlash"/>
          </div>

          <div className=''>
          <p className='footer-text text-center'>
              Acerca de nosotros
            </p>
            <p>
            En un mundo cada vez más digitalizado, la presencia de
            servicios en línea se ha convertido en algo crucial para el
            éxito de cualquier negocio. Varias empresas invierten cada
            vez más en aplicaciones web que agilicen procesos,
            además de ser una buena forma de marketing en los
            modelos de negocio.
            </p>
          </div>

          <div className=''>
            <p className='footer-text text-center'>
              Síguenos:
            </p>
            <div style={{display:'flex', paddingLeft:"20px", paddingRight:"10px"}}>
              <FaSquareFacebook size={25}></FaSquareFacebook>
              <div style={{paddingLeft:"10px"}}>
                <a href="">Facebook</a>
              </div>
            </div>
            <div style={{display:'flex', paddingLeft:"20px", paddingRight:"10px"}}>
              <FaSquareXTwitter size={25}></FaSquareXTwitter>
              <div style={{paddingLeft:"10px"}}>
                <a href="">X</a>
              </div>
            </div>
            <div style={{display:'flex', paddingLeft:"20px", paddingRight:"10px"}}>
              <FaSquareInstagram size={25}></FaSquareInstagram>
              <div style={{paddingLeft:"10px"}}>
                <a href="">Instagram</a>
              </div>
            </div>
            <div style={{display:'flex', paddingLeft:"20px", paddingRight:"10px"}}>
              <FaSquareYoutube size={25}></FaSquareYoutube>
              <div style={{paddingLeft:"10px"}}>
                <a href="">YouTube</a>
              </div>
            </div>
          </div>
        </div>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: Cineflash
      </div>
    </div>
  );
}