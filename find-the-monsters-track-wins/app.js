'use strict';

const monsters = [
  {
    src: 'monster1',
    alt: 'A yellow monster with one eye and a curly nose and tail.'
  },
  {
    src: 'monster2',
    alt: 'A yellow monster with one eye, a peanut-shaped body, and spindly arms and legs.'
  },
  {
    src: 'monster3',
    alt: 'A green monster with two eyes, wavy arms, and sharp teeth running down its body.'
  },
  {
    src: 'monster4',
    alt: 'A red monster with two horns, four arms, and a glum expression.'
  },
  {
    src: 'monster5',
    alt: 'A green monster with one eye, a glum expression, and a round body.'
  },
  {
    src: 'monster6',
    alt: 'A green monster, with one eye and a triangular body, doing a handstand.'
  },
  {
    src: 'monster7',
    alt: 'A purple monster with one eye and two tentacles.'
  },
  {
    src: 'monster8',
    alt: 'A purple monster with an egg-shaped body, two horns, and an indifferent expression.'
  },
  {
    src: 'monster9',
    alt: 'A blue, insect-like monster with two eyes, two arms, three legs, and four wings.'
  },
  {
    src: 'monster10',
    alt: 'A blue, blob-shaped monster with two eyes, two legs, and no arms.'
  },
  {
    src: 'monster11',
    alt: 'A grey monster with a yeti-like body and a big smile.'
  },
  {
    src: 'sock',
    alt: 'A pair of socks.'
  }
];

const numMonsters = monsters.length - 1; // - 1 for the sock

let numFound = 0;

const app = document.querySelector('#app');

/**
 * Randomly shuffle an array
 * {@link https://stackoverflow.com/a/2450976/1293256}
 * @param {any[]} array The array to shuffle
 * @returns {any[]} The shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
      ${monsters.map(getDoorHTML).join('')}
    </ul>
  `;
}

function startGame() {
  numFound = 0;
  shuffle(monsters);
  app.innerHTML = getGridHTML();
}

function getLoseHTML() {
  return `
    <article>
      <header>
        <h2>You Lose</h2>
        <p>Oh no, you found the sock!</p>
      </header>
      <p>
        <img src="../svg/sock.svg" alt="A pair of socks.">
      </p>
      <p>
        <button type="button" data-reset>Play Again</button>
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
        <h2>You Win</h2>
        <p>Awesome, you found all the monsters!</p>
      </header>
      <ul class="grid">
        ${monsters.filter(isMonster).map(monster => (
          `<li>${getMonsterHTML(monster)}</li>`
        )).join('')}
      </ul>
      <p>
        <button type="button" data-reset>Play Again</button>
      </p>
    </article>
  `;
}

function openDoor(door) {
  let index = door.dataset.index;
  index = parseInt(index, 10);

  const monster = monsters[index];

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
    return;
  }
}

startGame();

app.addEventListener('click', handleClick);