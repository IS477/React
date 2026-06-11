const BASE = 'https://dummyjson.com';

// GET /products → lista (el array viene en .products)
export async function getProducts(limit = 20) {
  const res = await fetch(`${BASE}/products?limit=${limit}`);
  if (!res.ok) throw new Error('Error al cargar productos');
  const data = await res.json();
  return data.products;
}

// GET /products/:id → un producto
export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Error al cargar el producto');
  return res.json();
}

// GET /carts → carritos (array en .carts) lista
export async function getCarts() {
  const res = await fetch(`${BASE}/carts`);
  if (!res.ok) throw new Error('Error al cargar carritos');
  const data = await res.json();
  return data.carts;
}

// GET /carts/:id → un carrito detalles
export async function getCart(id) {
  const res = await fetch(`${BASE}/carts/${id}`);
  if (!res.ok) throw new Error('Error al cargar el carrito');
  return res.json();
}