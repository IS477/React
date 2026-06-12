import { useState, useEffect } from "react"
import { getCart, getProduct, getProducts, getCarts, getCategories, getProductsByCategory } from "./api"
import ProductList from "./components/ProductList"
import ProductModal from "./components/ProductModal"
import CartDetail from "./components/CartDetail"
import CartList from "./components/CartList"
import SearchBar from "./components/SearchBar"
import Pagination from "./components/Pagination"
import './styles.css'

const PAGE_SIZE = 20;

export default function App() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(0);

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const [carts, setCarts] = useState([]);
  const [selectedCartId, setSelectedCartId] = useState(null);
  const [selectedCart, setSelectedCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCarts().then(setCarts).catch(console.error);
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (activeCategory || searchTerm.trim()) return;
    getProducts(PAGE_SIZE, page * PAGE_SIZE)
      .then(({ products, total }) => {
        setProducts(products);
        setTotalProducts(total);
      })
      .catch(console.error);
  }, [page, activeCategory, searchTerm]);

  useEffect(() => {
    if (!activeCategory) return;
    getProductsByCategory(activeCategory, page * PAGE_SIZE, PAGE_SIZE)
      .then(({ products, total }) => {
        setProducts(products);
        setTotalProducts(total);
      })
      .catch(console.error);
  }, [activeCategory, page]);

  useEffect(() => {
    if (!searchTerm.trim()) return;
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}&limit=${PAGE_SIZE}&skip=0`)
      .then(r => r.json())
      .then(d => {
        setProducts(d.products);
        setTotalProducts(d.total);
      })
      .catch(console.error);
  }, [searchTerm]);

  function handleSelectCategory(slug) {
    if (activeCategory === slug) {
      setActiveCategory(null);
      setPage(0);
    } else {
      setActiveCategory(slug);
      setSearchTerm("");
      setPage(0);
    }
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
    setActiveCategory(null);
    setPage(0);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSelectProduct(id) {
    setProductLoading(true);
    setSelectedProduct({});
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
    document.body.style.overflow = selectedProduct ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProduct]);

  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const modeLabel = activeCategory
    ? categories.find(c => c.slug === activeCategory)?.name ?? activeCategory
    : searchTerm.trim()
    ? `Resultados para "${searchTerm}"`
    : "Todos los productos";

  return (
    <div className="container">
      <h1>🛒 E-commerce IV</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={handleSearchChange} />

      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat.slug}
            className={`cart-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => handleSelectCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="section-header">
        <span className="section-title">{modeLabel}</span>
        <span className="section-count">{totalProducts} productos</span>
      </div>

      <ProductList products={products} onSelect={handleSelectProduct} />

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />

      <CartList carts={carts} selectedId={selectedCartId} onSelect={handleSelectCart} />
      <CartDetail cart={selectedCart} loading={cartLoading} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          loading={productLoading}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}