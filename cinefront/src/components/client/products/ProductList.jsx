import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";


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
				<p>Combos</p>
			</div>
			
			<br /><br /><br /><br />
			<div className="titlescinema">
				<p>Productos</p>
			</div>
			<div className='container-items'>
				{ProductoList.map(Producto => (
					<div className="item" key={Producto.idproducto}>
						<figure>
							<img src={url+Producto.imgproducto} alt={Producto.idproducto} />
						</figure>
					<div className='info-product'>
						<h2>{Producto.nombre}</h2>
						<p className='price'>${Producto.valor}.00 MXN</p>
						<button onClick={() => onAddProduct(Producto)}>
							Añadir al carrito
						</button>
					</div>
					</div>
				))}
			</div>
		</div>
	);
};