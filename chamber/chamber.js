// Toggle mobile navigation
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('navMenu').classList.toggle('show');
});

// Update footer dates
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Grid/List toggle
const directory = document.getElementById('directory');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

gridBtn.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
});
listBtn.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
});

// Fetch and display member data
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('directory-card');
        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.url}" target="_blank">Visit Website</a></p>
      <p><strong>Membership:</strong> ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
    `;
        directory.appendChild(card);
    });
}

getMembers();
