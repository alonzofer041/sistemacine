import { useContext, useState } from 'react';
import { Navbar,useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ModalComponent from '../../base/ModalComponent';
import Pago from '../payment/PaymentComponent';
import axios from "axios";
import { EmpresaContext } from '../../../provider/EmpresaProvider';
import { SucursalContext } from '../../../provider/SucursalProvider';

export const Header = ({
	allProducts,
	setAllProducts,
	total,
	countProducts,
	setCountProducts,
	setTotal,
}) => {
	const {isOpen,onOpen,onOpenChange}=useDisclosure();
	const [active, setActive] = useState(false);
	const [OrdenProductos,setOrdenProductos]=useState({
		folio:'',
		nombrecliente:'',
		correocliente:''
	})
	const {Empresa,setEmpresa}=useContext(EmpresaContext);
	const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
	const navigate=useNavigate();

	const onDeleteProduct = Producto => {
		const results = allProducts.filter(
			item => item.idproducto !== Producto.idproducto
		);

		setTotal(total - Producto.valor * Producto.cantidad_default);
		setCountProducts(countProducts - Producto.cantidad_default);
		setAllProducts(results);
	};

	const onCleanCart = () => {
		setAllProducts([]);
		setTotal(0);
		setCountProducts(0);
	};

	const payCart = () => {
		// navigate ('/cine/pagarproducto', );
		onOpen();
	};
	const GuardarOrden=()=>{
		let obj={
			idempresa:Empresa.idempresa,
			idsucursal:IdSucursal,
			nombrecliente:OrdenProductos.nombrecliente,
			importe:total,
			correocliente:OrdenProductos.correocliente,
			ordenproductosdetalle:allProducts
		}
		axios.post("/api/ordenproducto",obj
		).then((res)=>{
			alert("Realizado con éxito");
		}).catch((err)=>{
			alert("Error");
		})
	}

	return (
		<header>
			<div className='container-icon'>
				<div
					className='container-cart-icon'
					onClick={() => setActive(!active)}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='icon-cart'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
						/>
					</svg>
					<div className='count-products'>
						<span id='contador-productos'>{countProducts}</span>
					</div>
				</div>

				<div
					className={`container-cart-products ${
						active ? '' : 'hidden-cart'
					}`}
				>
					{allProducts.length ? (
						<>
							<div className='row-product'>
								{allProducts.map(Producto => (
									<div className='cart-product' key={Producto.idproducto}>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{Producto.cantidad_default}
											</span>
											<p className='titulo-producto-carrito'>
												{Producto.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${Producto.valor}.00 MXN
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteProduct(Producto)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
							</div>

							<div className='cart-total'>
								<h3>Total:</h3>
								<span className='total-pagar'>${total}.00 MXN</span>
							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar Carrito
							</button>
							<button className='btn-clear-all' onClick={payCart}>
								Pagar Carrito
							</button>		
							
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>

			<ModalComponent
				Titulo={"Pagar"}
				isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}
				Size={"xl"}
				EventoGuardar={GuardarOrden}
				CuerpoFormulario={<Pago Orden={OrdenProductos} setOrden={setOrdenProductos}/>}
			></ModalComponent>
		</header>
	);
};