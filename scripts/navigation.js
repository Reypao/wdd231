// Toggle mobile nav
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav ul');
  btn?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});