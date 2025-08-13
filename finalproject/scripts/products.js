// scripts/products.js
// Carga y muestra el catálogo de productos usando fetchJSON (desde common.js).
// Simple y didáctico: querySelector directo, forEach, template literals, try/catch.

import { fetchJSON } from './common.js';

// Referencias al DOM
const statusEl = document.querySelector('#catalogStatus');
const gridEl = document.querySelector('#catalogGrid');

// Crea una card de producto (estructura simple y clara)
function crearCard(producto) {
  // Usamos acceso directo (sin técnicas avanzadas) y valores por defecto básicos
  const name = producto.name || 'Sin nombre';
  const category = producto.category || 'Sin categoría';
  const price = typeof producto.price === 'number' ? producto.price : parseFloat(producto.price) || 0;
  const description = producto.description || 'Sin descripción';
  const inStock = Boolean(producto.inStock);

  const image = producto.image
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML = `
    <div class="product-media">
      <img src="${image}" alt="${name}" loading="lazy">
    </div>
    <div class="product-body">
      <h3>${name}</h3>
      <p><strong>Categoría:</strong> ${category}</p>
      <p><strong>Precio:</strong> $${price.toFixed(2)}</p>
      <p>${description}</p>
      <p><strong>Stock:</strong> ${inStock ? 'En stock' : 'Sin stock'}</p>
    </div>
  `;

  return card;
}

// Carga y render del catálogo
async function cargarCatalogo() {
  statusEl.textContent = 'Cargando productos...';

  try {
    const productos = await fetchJSON('data/data-products.json');

    if (!Array.isArray(productos)) {
      throw new Error('El JSON de productos debe ser un array.');
    }

    // Limpiamos el contenedor
    gridEl.innerHTML = '';

    // Recorremos y agregamos cada card
    productos.forEach(function (p) {
      const card = crearCard(p);
      gridEl.appendChild(card);
    });

    statusEl.textContent = 'Hay ' + productos.length + ' productos.';

  } catch (error) {
    console.error('Error al cargar productos:', error);
    statusEl.textContent = 'Ocurrió un error al cargar los productos.';
  }
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarCatalogo);
