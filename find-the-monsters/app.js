import { shuffle } from '../helpers.js';
import { monsters } from '../monsters.js';

const app = document.querySelector('#app');
const shuffledMonsters = shuffle([ ...monsters ]);

function getDoorHTML(monster, index) {
  return `
    <li>
      <button type="button" data-index="${index.toString(10)}">
        <img src="../svg/door.svg" alt="Open the door.">
      </button>
    </li>
  `;
}

function getGridHTML() {
  return `
    <ul class="grid">
      ${shuffledMonsters.map(getDoorHTML).join('')}
    </ul>
  `;
}

function getMonsterHTML(monster) {
  return `<img src="../svg/${monster.src}.svg" alt="${monster.alt}">`;
}

function handleClick(event) {
  const button = event.target.closest('[data-index]');
  if (!button) return;

  const index = parseInt(button.dataset.index, 10);
  const monster = shuffledMonsters[index];

  button.outerHTML = getMonsterHTML(monster);
}

app.innerHTML = getGridHTML();
app.addEventListener('click', handleClick);