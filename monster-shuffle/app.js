import { shuffle } from '../helpers.js';
import { monsters } from '../monsters.js';

const app = document.querySelector('#app');

function getMonsterHTML(monster) {
  return `
    <li>
      <img src="../svg/${monster.src}.svg" alt="${monster.alt}">
    </li>
  `;
}

function getGridHTML() {
  return `
    <ul class="grid">
      ${shuffle([ ...monsters ]).map(getMonsterHTML).join('')}
    </ul>
  `;
}

app.innerHTML = getGridHTML();