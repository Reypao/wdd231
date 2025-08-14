// Dynamically build course cards
const courses = [
  { title: 'WDD 231', desc: 'Responsive Design' },
  /* …other courses… */
];

function renderCourses() {
  const container = document.getElementById('courses');
  if (!container) return;
  courses.forEach(c => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.innerHTML = `<h2>${c.title}</h2><p>${c.desc}</p>`;
    container.append(card);
  });
}

document.addEventListener('DOMContentLoaded', renderCourses);
