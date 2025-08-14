document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        nav.classList.toggle('open');
        hamburger.textContent = nav.classList.contains('open') ? '✖' : '☰';
      }
    });
  }
});
