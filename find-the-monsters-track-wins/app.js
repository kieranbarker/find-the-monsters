import { shuffle } from '../helpers.js';
import { monsters } from '../monsters.js';

const app = document.querySelector('#app');
const monstersCopy = [ ...monsters ];
const numMonsters = monstersCopy.length - 1; // - 1 for the sock

let numFound = 0;

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
      ${monstersCopy.map(getDoorHTML).join('')}
    </ul>
  `;
}

function startGame() {
  numFound = 0;
  shuffle(monstersCopy);
  app.innerHTML = getGridHTML();
}

function getLoseHTML() {
  return `
    <article>
      <header>
        <h2>You lose</h2>
        <p>Oh no, you found the sock!</p>
      </header>
      <p>
        <img src="../svg/sock.svg" alt="A pair of socks.">
      </p>
      <p>
        <button type="button" data-reset>Play again</button>
      </p>
    </article>
  `;
}

function getMonsterHTML(monster) {
  return `<img src="../svg/${monster.src}.svg" alt="${monster.alt}">`;
}

function getWinHTML() {
  const isMonster = monster => monster.src !== 'sock';
  return `
    <article>
      <header>
        <h2>You win</h2>
        <p>Awesome, you found all the monsters!</p>
      </header>
      <ul class="grid">
        ${monstersCopy.filter(isMonster).map(monster => (
          `<li>${getMonsterHTML(monster)}</li>`
        )).join('')}
      </ul>
      <p>
        <button type="button" data-reset>Play again</button>
      </p>
    </article>
  `;
}

function openDoor(door) {
  const index = parseInt(door.dataset.index, 10);
  const monster = monstersCopy[index];

  if (monster.src === 'sock') {
    app.innerHTML = getLoseHTML();
    return;
  }

  door.outerHTML = getMonsterHTML(monster);
  numFound++;

  if (numFound === numMonsters) {
    app.innerHTML = getWinHTML();
  }
}

function handleClick(event) {
  const door = event.target.closest('[data-index]');

  if (door) {
    openDoor(door);
    return;
  }

  const isResetButton = event.target.matches('[data-reset]');

  if (isResetButton) {
    startGame();
  }
}

startGame();
app.addEventListener('click', handleClick);