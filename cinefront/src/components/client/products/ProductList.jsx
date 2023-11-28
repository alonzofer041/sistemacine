import React, { useContext, useEffect, useState } from "react";
import {Image, Button, Card, CardBody, Divider, CardHeader, Tooltip, Select, SelectItem} from "@nextui-org/react";
import axios from "axios";
import Footer from "../footerComponent";
import { EmpresaContext } from "../../../provider/EmpresaProvider";
import { SucursalContext } from "../../../provider/SucursalProvider";
import { MensajeAdvertencia, MensajeExito } from "../../../helpers/functions";


const url=import.meta.env.VITE_ASSET_URL+'/productos/';
const urlcombo=import.meta.env.VITE_ASSET_URL+'/combos/';
export const ProductList = ({
	allProducts,
	setAllProducts,
	allCombos,
	setAllCombos,
	countProducts,
	setCountProducts,
	total,
	setTotal,
	iva,
	setIva,
	totalIva,
	setTotalIva
}) => {
	useEffect(()=>{
		setIva(total*0.16);
	},[total]);
	useEffect(()=>{
		setTotalIva(total+iva);
	},[iva]);
	const onAddProduct = (Producto,Tipo) => {
		let bndAgregar=true;
		if (Tipo=='Producto') {
			if (allProducts.find(item => item.idproducto === Producto.idproducto)) {
				// const products = allProducts.map(item =>
				// 	item.idproducto === Producto.idproducto
				// 		? item.cantidad_default+1 < item.cantidad ? { ...item, cantidad_default: item.cantidad_default + 1 } : MensajeAdvertencia("Ya no hay existencias disponibles")
				// 		: item
				// );
				const products=allProducts.map((item)=>{
					if (item.idproducto===Producto.idproducto) {
						if (item.cantidad_default+1<=item.cantidad) {
							let obj=({...item,cantidad_default:item.cantidad_default+1});
							return obj;	
						}
						else{
							bndAgregar=false;
							return item;
						}
					}
					else{
						return item;
					}
				});
				if (bndAgregar) {
					setTotal(total + Producto.valor * Producto.cantidad_default);
					setCountProducts(countProducts + Producto.cantidad_default);	
				}
				else{
					MensajeAdvertencia("Las existencias de este producto se agotaron");
				}
				return setAllProducts([...products]);
			}
		}
		else{
			if (allCombos.find(item=>item.idcombo===Producto.idcombo)) {
				const combos=allCombos.map(item=>
					item.idcombo===Producto.idcombo?{...item,cantidad_default:item.cantidad_default+1} :item);
					setTotal(total + Producto.valor * Producto.cantidad_default);
					setCountProducts(countProducts + Producto.cantidad_default);
					return setAllCombos([...combos]);
				// const combos=allCombos.map((item)=>{
				// 	if (item.idcombo===Producto.idcombo) {
						
				// 	}
				// })
			}
		}
		setTotal(total + Producto.valor * Producto.cantidad_default);
		setCountProducts(countProducts + Producto.cantidad_default);
		if (Tipo=='Producto') {
			setAllProducts([...allProducts, Producto]);
		}
		else{
			setAllCombos([...allCombos,Producto]);
		}
		
		MensajeExito("Producto añadido al carrito");
	};

	const [ProductoList,setProductoList]=useState([]);
	const [ComboList,setComboList]=useState([]);
	const [productoCategorias,setProductoCategorias]=useState([]);
	const [categoria,setCategoria]=useState('');
	const {Empresa,setEmpresa}=useContext(EmpresaContext);
	const {IdSucursal,setIdSucursal}=useContext(SucursalContext);

	useEffect(()=>{
		ListaCategoriaProducto();
		Lista();
		ListaCombos();
	  },[IdSucursal]);

	//   MEMOS
	  const BndFiltro=Boolean(categoria);
	  const ItemsFiltroProductos=React.useMemo(()=>{
		let ProductosFiltrado=[...ProductoList];
		if (BndFiltro) {
			ProductosFiltrado=ProductosFiltrado.filter((ProductoElement)=>
				ProductoElement.idproductocategoria==categoria
			)
		}
		return ProductosFiltrado;
	  },[ProductoList,categoria]);

	  function handleCategoria(e){
		setCategoria(e.target.value);
	  }
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
	  function ListaCombos() {
		axios.get('/api/comboxproducto',{
			params:{
				idempresa:Empresa.idempresa,
				idsucursal:IdSucursal
			}
		}).then((res)=>{
			res.data.forEach(element => {
				element.cantidad_default=1;
			});
			let data=res.data;
			setComboList(data);
		})
	  }
	  function ListaCategoriaProducto(){
		axios.get('/api/productocategoria',{
			params:{
				idempresa:Empresa.idempresa,
				idsucursal:IdSucursal,
				origen:'cliente'
			}
		}).then((res)=>{
			let data=res.data;
			setProductoCategorias(data);
		})
	  }

	return (
		<div>
			<div>
				<Select defaultSelectedKeys={[categoria]} onChange={handleCategoria} label="Seleccione una Categoría">
                	{productoCategorias.map((ProductoCategoria)=>(
                	    <SelectItem key={ProductoCategoria.idproductocategoria} value={ProductoCategoria.idproductocategoria}>
                	        {ProductoCategoria.nombre}
                	    </SelectItem>
                	))}
                </Select>
			</div>
			<div className="titlescinema">
				Combos
			</div>
			<div className="container-items">
				{ComboList.map(Combo=>(
					<div className="item" key={Combo.idcombo}>
						<Card>
							<Tooltip content={Combo.nombre}>
								<figure>
									<img src={urlcombo+Combo.imgcombo} alt={Combo.idcombo} />
								</figure>
							</Tooltip>
							<CardBody>
								<p className="price">${Combo.valor} MXN</p>
								<Button onClick={() => onAddProduct(Combo,'Combo')} className="mt-4 mb-4" color="warning" size="sl" radius="sm" style={{height:"40px"}}>Añadir al carrito</Button>
							</CardBody>
						</Card>
					</div>
				))}
			</div>
			<Divider/>
			<div className="titlescinema">
				<p>Productos</p>
			</div>
			<div className='container-items'>
				{ItemsFiltroProductos.map(Producto => (
					<div className="item" key={Producto.idproducto}>
						<Card>
							<Tooltip content={Producto.nombre}>
							<figure>
								<img src={url+Producto.imgproducto} alt={Producto.idproducto} />
							</figure>
							</Tooltip>
							<CardBody>
								<p className='price'>${Producto.valor}.00 MXN</p>
								<Button onClick={() => onAddProduct(Producto,'Producto')} className="mt-4 mb-4" color="warning" size="sl" radius="sm" style={{height:"40px"}}>Añadir al carrito</Button>
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