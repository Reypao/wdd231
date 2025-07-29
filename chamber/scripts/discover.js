// Seleccionamos el contenedor donde irán las tarjetas
const galleryContainer = document.querySelector('.discover-gallery');

// Función para crear una tarjeta HTML
function createCard(item) {
  const card = document.createElement('article');
  card.classList.add('discover-card');

  // Título
  const title = document.createElement('h2');
  title.textContent = item.name;

  // Imagen
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = `images/${item.image}`;
  img.alt = item.name;
  figure.appendChild(img);

  // Dirección
  const address = document.createElement('address');
  address.textContent = item.address;

  // Descripción
  const desc = document.createElement('p');
  desc.textContent = item.description;

  // Botón
  const button = document.createElement('button');
  button.textContent = 'Learn More';

  // Agregamos todo al card
  card.appendChild(title);
  card.appendChild(figure);
  card.appendChild(address);
  card.appendChild(desc);
  card.appendChild(button);

  return card;
}

// Cargar el discover.json y mostrar las tarjetas
async function loadDiscoverItems() {
  try {
    const response = await fetch('data/discover.json');
    if (!response.ok) throw new Error('Error al cargar discover.json');

    const data = await response.json();
    data.forEach(item => {
      const card = createCard(item);
      galleryContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    galleryContainer.innerHTML = '<p>Error al cargar los elementos de Discover.</p>';
  }
}

// ------------------------------
// Mensaje de última visita
// ------------------------------
const visitorMessage = document.querySelector('.visitor-message');

function displayVisitMessage() {
  const lastVisit = localStorage.getItem('lastVisit');
  const currentVisit = Date.now();
  let message = '';

  if (!lastVisit) {
    // Primera visita
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDiff = Math.floor((currentVisit - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      message = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      message = "You last visited 1 day ago.";
    } else {
      message = `You last visited ${daysDiff} days ago.`;
    }
  }

  visitorMessage.textContent = message;
  localStorage.setItem('lastVisit', currentVisit);
}



// Ejecutar la carga y mostrar el mensaje
loadDiscoverItems();
displayVisitMessage();