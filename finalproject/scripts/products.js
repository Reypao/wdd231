import { fetchJSON } from './common.js'
const grid = document.querySelector('catalogGrid');
async function loadProducts() {
    const data = await fetchJSON('data/data-products.json');

    grid.innerHTML = '';
    data.array.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
   <h2>${product.name}</h2>
   <p>${product.description}</p>
   <p>${product.price}</p>
   `;

        grid.appendChild(card)

    });
}

loadProducts();