const BASE = 'https://dummyjson.com';

export async function getProducts(limit = 20, skip = 0) {
  const res = await fetch(`${BASE}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Error al cargar productos');
  const data = await res.json();
  return { products: data.products, total: data.total };
}

export async function getProduct(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Error al cargar el producto');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error('Error al cargar categorías');
  return res.json();
}

export async function getProductsByCategory(slug, skip = 0, limit = 20) {
  const res = await fetch(`${BASE}/products/category/${slug}?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error('Error al cargar productos por categoría');
  const data = await res.json();
  return { products: data.products, total: data.total };
}

export async function getCarts() {
  const res = await fetch(`${BASE}/carts`);
  if (!res.ok) throw new Error('Error al cargar carritos');
  const data = await res.json();
  return data.carts;
}

export async function getCart(id) {
  const res = await fetch(`${BASE}/carts/${id}`);
  if (!res.ok) throw new Error('Error al cargar el carrito');
  return res.json();
}