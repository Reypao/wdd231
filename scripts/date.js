// Insert current date into any <time id="current-date">
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('current-date');
  if (el) el.textContent = new Date().toLocaleDateString();
});
