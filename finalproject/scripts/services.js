import { fetchJSON } from './common.js';

const statusEl = document.querySelector('#servicesStatus');
const gridEl = document.querySelector('#servicesGrid');

// Modal
const modalEl = document.querySelector('#serviceModal');
const modalBackdropEl = document.querySelector('#serviceModalBackdrop');
const modalCloseEl = document.querySelector('#serviceModalClose');
const modalTitleEl = document.querySelector('#serviceModalTitle');
const modalContentEl = document.querySelector('#serviceModalContent');

function crearCardServicio(servicio) {
  const id = servicio.id ?? '';
  const label = servicio.label || 'Servicio';

  const card = document.createElement('article');
  card.className = 'service-card';
  card.innerHTML = `
    <div class="service-body">
      <h3>${label}</h3>
      <p><strong>ID:</strong> ${id}</p>
      <button class="service-more" data-id="${id}" data-label="${label}">See more</button>
    </div>
  `;
  return card;
}

async function cargarServicios() {
  statusEl.textContent = 'Loading services...';
  try {
    const servicios = await fetchJSON('data/data-services.json');
    if (!Array.isArray(servicios)) throw new Error('El archivo JSON de servicios debe ser un array.');

    gridEl.innerHTML = '';
    servicios.forEach(s => gridEl.appendChild(crearCardServicio(s)));

    statusEl.textContent = 'Se cargaron ' + servicios.length + ' servicios.';
  } catch (error) {
    console.error('Error al cargar servicios:', error);
    statusEl.textContent = 'Ocurrió un error al cargar los servicios.';
  }
}

function openModal({ id, label }) {
  if (!modalEl) return;
  modalTitleEl.textContent = label;
  modalContentEl.textContent = 'ID: ' + id;
  modalEl.classList.remove('hidden');
  
  if (modalCloseEl) modalCloseEl.focus();
}

function closeModal() {
  if (!modalEl) return;
  modalEl.classList.add('hidden');
}

gridEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.service-more');
  if (!btn) return;
  const id = btn.getAttribute('data-id') || '';
  const label = btn.getAttribute('data-label') || 'Servicio';
  openModal({ id, label });
});

modalCloseEl?.addEventListener('click', closeModal);
modalBackdropEl?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.addEventListener('DOMContentLoaded', cargarServicios);
