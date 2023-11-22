import React, { useContext, useEffect, useState } from "react";
import {Image, Button, Card, CardBody, Divider, CardHeader, Tooltip} from "@nextui-org/react";
import axios from "axios";
import Footer from "../footerComponent";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";
import { MensajeExito } from "../../../helpers/functions";


const url=import.meta.env.VITE_ASSET_URL+'/productos/';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
}) => {
	const onAddProduct = Producto => {
		if (allProducts.find(item => item.idproducto === Producto.idproducto)) {
			const products = allProducts.map(item =>
				item.idproducto === Producto.idproducto
					? { ...item, cantidad_default: item.cantidad_default + 1 }
					: item
			);
			setTotal(total + Producto.valor * Producto.cantidad_default);
			setCountProducts(countProducts + Producto.cantidad_default);
			return setAllProducts([...products]);
		}

		setTotal(total + Producto.valor * Producto.cantidad_default);
		setCountProducts(countProducts + Producto.cantidad_default);
		setAllProducts([...allProducts, Producto]);
		MensajeExito("Producto añadido al carrito");
	};

	const [ProductoList,setProductoList]=useState([]);
	const {Empresa,setEmpresa}=useContext(EmpresaContext);
	const {IdSucursal,setIdSucursal}=useContext(SucursalContext);

	useEffect(()=>{
		Lista();
	  },[IdSucursal]);
	  function Lista(){
		axios.get('/api/producto',{
			params:{
				origen:'cliente',
				idempresa:Empresa.idempresa,
				idsucursal:IdSucursal
			}
		}
		  ).then((res)=>{
				res.data.forEach(element => {
					element.cantidad_default=1;
				});
				let data=res.data;
				setProductoList(data);
		  })
	  }

	return (
		<div>
			<div className="titlescinema">
				<p>Productos</p>
			</div>
			<div className='container-items'>
				{ProductoList.map(Producto => (
					<div className="item" key={Producto.idproducto}>
						<Card>
							<Tooltip content={Producto.nombre}>
							<figure>
								<img src={url+Producto.imgproducto} alt={Producto.idproducto} />
							</figure>
							</Tooltip>
							<CardBody>
								<p className='price'>${Producto.valor}.00 MXN</p>
								<Button onClick={() => onAddProduct(Producto)} className="mt-4 mb-4" color="warning" size="sl" radius="sm" style={{height:"40px"}}>Añadir al carrito</Button>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
			<br /><br /><br />
			<div>
				<Footer/>
			</div>
		</div>
	);
};