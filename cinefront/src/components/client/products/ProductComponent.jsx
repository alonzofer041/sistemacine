import { useState } from 'react';
import { Header } from "./Header";
import { ProductList } from "./ProductList";

function Productos() {
	const [allProducts, setAllProducts] = useState([]);
	const [allCombos, setAllCombos]=useState([]);
	const [total, setTotal] = useState(0);
	const [iva,setIva]=useState(0);
	const [totalIva,setTotalva]=useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				allCombos={allCombos}
				setAllCombos={setAllCombos}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				iva={iva}
				setIva={setIva}
				totalIva={totalIva}
				setTotalIva={setTotalva}
			/>
			<ProductList
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				allCombos={allCombos}
				setAllCombos={setAllCombos}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				iva={iva}
				setIva={setIva}
				totalIva={totalIva}
				setTotalIva={setTotalva}
			/>
		</>
	);
}

export default Productos;