import ProductList from "./components/ProductList"
import { useState, useEffect } from "react"
import { getCart, getProduct, getProducts, getCarts } from "./api"
import ProductModal from "./components/ProductModal"
import CartDetail from "./components/CartDetail"
import CartList from "./components/CartList"
import SearchBar from "./components/SearchBar"
import './styles.css'
import searchbar from "./components/SearchBar"


export default function App() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Carga inicial (al montar)
  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getCarts().then(setCarts).catch(console.error);
  }, []);

  async function handleSelectProduct(id) {
    setProductLoading(true);
    setSelectedProduct({});  // abre el modal en "cargando"
    try { setSelectedProduct(await getProduct(id)); }
    catch (e) { console.error(e); }
    finally { setProductLoading(false); }
  }

  async function handleSelectCart(id) {
    setSelectedCartId(id);
    setCartLoading(true);
    try { setSelectedCart(await getCart(id)); }
    catch (e) { console.error(e); }
    finally { setCartLoading(false); }
  }



  useEffect(() => {
    if (!searchTerm.trim()) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}`
      );

      const data = await response.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, [searchTerm]);


  return (
    <div className="container">
 <h1>🛒 Mi E-commerce</h1>
     <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ProductList products={products} onSelect={handleSelectProduct} />

      <CartList carts={carts} selectedId={selectedCartId}
                onSelect={handleSelectCart} />
      <CartDetail cart={selectedCart} loading={cartLoading} />

      {selectedProduct && (
        <ProductModal product={selectedProduct} loading={productLoading}
                      onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}