import { useContext, useState } from 'react';
import { Navbar,useDisclosure, Divider, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ModalComponent from '../../base/ModalComponent';
import Pago from '../payment/PaymentComponent';
import axios from "axios";
import { EmpresaContext } from '../../../provider/EmpresaProvider';
import { SucursalContext } from '../../../provider/SucursalProvider';
import { MensajeExito } from "../../../../src/helpers/functions";
import {loadStripe} from "@stripe/stripe-js";
import {CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js";

const stripePromise=loadStripe("pk_test_Eoz0gXulPv0IDl39oqAFPLHA00d5gzPy1a");

export const Header=({
	allProducts,
	setAllProducts,
	allCombos,
	setAllCombos,
	total,
	countProducts,
	setCountProducts,
	setTotal,
	iva,
	setIva,
	totalIva,
	setTotalIva})=>{
		return(
			<Elements stripe={stripePromise}>
				<ComponenteHeader 
					allProducts={allProducts}
					setAllProducts={setAllProducts}
					allCombos={allCombos}
					setAllCombos={setAllCombos}
					total={total}
					countProducts={countProducts}
					setCountProducts={setCountProducts}
					setTotal={setTotal}
					iva={iva}
					setIva={setIva}
					totalIva={totalIva}
					setTotalIva={setTotalIva}
				></ComponenteHeader>
			</Elements>
		)
	}

const ComponenteHeader = ({
	allProducts,
	setAllProducts,
	allCombos,
	setAllCombos,
	total,
	countProducts,
	setCountProducts,
	setTotal,
	iva,
	setIva,
	totalIva,
	setTotalIva
}) => {
	const stripe=useStripe();
    const elements=useElements();
	const {isOpen,onOpen,onOpenChange, onClose}=useDisclosure();
	
	const [active, setActive] = useState(false);
	const [OrdenProductos,setOrdenProductos]=useState({
		idordenproducto:0,
		folio:"",
		nombrecliente:"",
		correocliente:"",

	})

	const [ErrorValidacion,setErrorValidacion]=useState([]);
	
	const [DatosCorreo,setDatosCorreo]=useState({
        correocliente:'',
        nombrecliente:'',
		importe:0,
		iva:0
    })


	const {Empresa,setEmpresa}=useContext(EmpresaContext);
	const {IdSucursal,setIdSucursal}=useContext(SucursalContext);
	const navigate=useNavigate();

	const onDeleteProduct = Producto => {
		const results = allProducts.filter(
			item => item.idproducto !== Producto.idproducto
		);

		setTotal(total - Producto.valor * Producto.cantidad_default);
		setIva(total*0.16);
		setTotalIva(total+iva);
		setCountProducts(countProducts - Producto.cantidad_default);
		setAllProducts(results);
	};
	const onDeleteCombo=Combo=>{
		const results = allCombos.filter(
			item => item.idcombo !== Combo.idcombo
		);

		setTotal(total - Combo.valor * Combo.cantidad_default);
		setIva(total*0.16);
		setTotalIva(total+iva);
		setCountProducts(countProducts - Combo.cantidad_default);
		setAllCombos(results);
	}

	const onCleanCart = () => {
		setAllProducts([]);
		setAllCombos([]);
		setTotal(0);
		setIva(0);
		setTotalIva(0);
		setCountProducts(0);
	};

	const payCart = () => {
		// navigate ('/cine/pagarproducto', );
		onOpen();
	};


	const GuardarOrden=async ()=>{
		const {error,paymentMethod}=await stripe.createPaymentMethod({
            type:'card',
            card:elements.getElement(CardElement)
        });
		if (!error) {
			const {id}=paymentMethod;
			let obj={
				idordenproducto:OrdenProductos.idordenproducto,
				idempresa:Empresa.idempresa,
				idsucursal:IdSucursal,
				nombrecliente:OrdenProductos.nombrecliente,
				importe:total,
				correocliente:OrdenProductos.correocliente,
				ordenproductosdetalle:allProducts,
				combos:allCombos,
				idpago:id
			}
	
			axios.post("/api/ordenproducto",obj
			).then((res)=>{
				MensajeExito("Compra Realizada con éxito");
				onClose();
				navigate("/cine/realizado");
			}).catch((err)=>{
				setErrorValidacion(err.response.data.errors.errors);
			});
		}	
		
	}

	function EnviarCorreoCompra(){
        let obj={
            correocliente:DatosCorreo.correocliente,
            nombrecliente:DatosCorreo.nombrecliente,
			//productos:allProducts,
			importe:total,
        }
        axios.post("/api/pagoproductoemail",obj
        ).then((res)=>{
            MensajeExito("Correo Enviado");
        }).catch((err)=>{
            alert("Ingresa tus datos");
			setErrorValidacion(err.response.data.errors.errors);
        })
    }

	const doBoth = () => {
		GuardarOrden();
		EnviarCorreoCompra();
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
					{allProducts.length || allCombos.length ? (
						<>
							<div className='row-product'>
								{allCombos.map(Combo=>(
									<div className='cart-product' key={Combo.idcombo}>
										<Chip>Promoción</Chip>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{Combo.cantidad_default}
											</span>
											<p className='titulo-producto-carrito'>
												{Combo.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${Combo.valor} MXN
											</span>
										</div>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='icon-close'
											onClick={() => onDeleteCombo(Combo)}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								))}
								{allProducts.map(Producto => (
									<div className='cart-product' key={Producto.idproducto}>
										<h2>Productos</h2>
										<div className='info-cart-product'>
											<span className='cantidad-producto-carrito'>
												{Producto.cantidad_default}
											</span>
											<p className='titulo-producto-carrito'>
												{Producto.nombre}
											</p>
											<span className='precio-producto-carrito'>
												${Producto.valor} MXN
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

							<div>
								<div className='cart-total'>
									<h3>Subtotal:</h3>
									<span className='total-pagar'>${total} MXN</span>
								</div>
								<br />
								<div style={{fontSize:"13px", display:"flex", paddingLeft:"91px", marginTop:"-40px", color:"red"}}>
									<p>+ IVA:</p>
									<p>${iva} MXN</p>
								</div>
								<br />
								<div className='cart-total'>
									<h3>Total:</h3>
									<span className='total-pagar'>${totalIva} MXN</span>
								</div>

							</div>

							<button className='btn-clear-all' onClick={onCleanCart}>
								Vaciar carrito
							</button>
							<Divider/>
							<button className='btn-clear-all' onClick={payCart}>
								Pagar carrito
							</button>		
							
						</>
					) : (
						<p className='cart-empty'>El carrito está vacío</p>
					)}
				</div>
			</div>

			<ModalComponent
				Titulo={"Pagar"}
				isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onClose={onClose}
				Size={"xl"}
				EventoGuardar={doBoth}
				CuerpoFormulario={<Pago Orden={OrdenProductos} setOrden={setOrdenProductos} Errores={ErrorValidacion} DatosCorreo={DatosCorreo} setDatosCorreo={setDatosCorreo} CardElement={CardElement}/>}
			></ModalComponent>
		</header>
	);
};