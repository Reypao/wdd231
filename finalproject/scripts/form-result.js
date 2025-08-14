// scripts/form-result.js
// Lógica para mostrar los datos enviados por GET desde contact.html

// Actualiza "Last Modification" y Year del footer
const lm = document.getElementById('lastModified');
if (lm) lm.textContent = document.lastModified;
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Obtener parámetros de la URL (?name=...&email=...)
const params = new URLSearchParams(window.location.search);

// Referencia al cuerpo de la tabla
const tbody = document.querySelector('#resultTable tbody');

// Si no hay datos, mostrar mensaje
if ([...params.keys()].length === 0) {
  const tr = document.createElement('tr');
  tr.innerHTML = '<td colspan="2">No data received. Please submit the form first.</td>';
  tbody.appendChild(tr);
} else {
  // Recorrer y mostrar cada campo y su valor
  params.forEach((value, key) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${key}</td>
      <td>${value === '' ? '(empty)' : value}</td>
    `;
    tbody.appendChild(tr);
  });
}
