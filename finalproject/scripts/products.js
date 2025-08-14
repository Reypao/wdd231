// scripts/products.js
// Catálogo de productos con filtro "Solo en stock" persistido en localStorage.

import { fetchJSON } from './common.js';

// Elementos del DOM
const statusEl = document.querySelector('#catalogStatus');
const gridEl = document.querySelector('#catalogGrid');
const onlyInStockEl = document.querySelector('#onlyInStock');

// Clave de localStorage
const LS_KEY_ONLY_IN_STOCK = 'catalogOnlyInStock';

// Placeholder existente en el proyecto
const PLACEHOLDER = 'images/maintenacesprinklers.jpg';

// Render de una card
function crearCard(producto) {
  const name = producto.name || 'Sin nombre';
  const category = producto.category || 'Sin categoría';
  const priceNum = typeof producto.price === 'number' ? producto.price : parseFloat(producto.price) || 0;
  const description = producto.description || 'Sin descripción';
  const inStock = Boolean(producto.inStock);

  const card = document.createElement('article');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-media">
      <img src="${PLACEHOLDER}" alt="${name}" loading="lazy" width="400" height="300">
    </div>
    <div class="product-body">
      <h3>${name}</h3>
      <p><strong>Categoría:</strong> ${category}</p>
      <p><strong>Precio:</strong> $${priceNum.toFixed(2)}</p>
      <p>${description}</p>
      <p><strong>Stock:</strong> ${inStock ? 'In stock' : 'Run out stock'}</p>
    </div>
  `;
  return card;
}

// Aplica filtro según el checkbox
function aplicarFiltro(productos) {
  if (onlyInStockEl && onlyInStockEl.checked) {
    return productos.filter(p => Boolean(p.inStock));
  }
  return productos;
}

// Pinta el grid
function renderizar(productos) {
  gridEl.innerHTML = '';
  productos.forEach(p => {
    gridEl.appendChild(crearCard(p));
  });
}

// Carga principal
async function cargarCatalogo() {
  statusEl.textContent = 'Loading products...';
  try {
    const productos = await fetchJSON('data/data-products.json');
    if (!Array.isArray(productos)) throw new Error('El JSON de productos debe ser un array.');

    const filtrados = aplicarFiltro(productos);
    renderizar(filtrados);
    statusEl.textContent =  filtrados.length + ' products.';
  } catch (err) {
    console.error('Error al cargar productos:', err);
    statusEl.textContent = 'Ocurrió un error al cargar los productos.';
  }
}

// Inicializa el estado del checkbox desde localStorage
function initOnlyInStock() {
  if (!onlyInStockEl) return;
  const guardado = localStorage.getItem(LS_KEY_ONLY_IN_STOCK);
  onlyInStockEl.checked = guardado === 'true';
  onlyInStockEl.addEventListener('change', () => {
    localStorage.setItem(LS_KEY_ONLY_IN_STOCK, String(onlyInStockEl.checked));
    cargarCatalogo(); // recarga con el filtro aplicado
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initOnlyInStock();
  cargarCatalogo();
});
