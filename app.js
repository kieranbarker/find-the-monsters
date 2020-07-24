;(function () {

  // Opt into ES5 strict mode
  "use strict";

  //
  // Variables
  //

  // Get the main element
  var main = document.querySelector("main");

  // Store the array of monsters
  var monsters = [
    { src: "monster1", alt: "A yellow monster with one eye and a curly nose and tail." },
    { src: "monster2", alt: "A yellow monster with one eye, a peanut-shaped body, and spindly arms and legs." },
    { src: "monster3", alt: "A green monster with two eyes, wavy arms, and sharp teeth running down its body." },
    { src: "monster4", alt: "A red monster with two horns, four arms, and a glum expression." },
    { src: "monster5", alt: "A green monster with one eye, a glum expression, and a round body." },
    { src: "monster6", alt: "A green monster, with one eye and a triangular body, doing a handstand." },
    { src: "monster7", alt: "A purple monster with one eye and two tentacles." },
    { src: "monster8", alt: "A purple monster with an egg-shaped body, two horns, and an indifferent expression." },
    { src: "monster9", alt: "A blue, insect-like monster with two eyes, two arms, three legs, and four wings." },
    { src: "monster10", alt: "A blue, blob-shaped monster with two eyes, two legs, and no arms." },
    { src: "monster11", alt: "A black monster with a yeti-like body and a big smile." },
    { src: "sock", alt: "A pair of socks." }
  ];

  // Track the number of monsters found
  var monstersFound = 0;


  //
  // Functions
  //

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {Array}       The shuffled array
   */
  function shuffle (array) {

    var currentIndex = array.length;
    var temporaryValue, randomIndex;

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

  /**
   * Create an HTML string for a single door
   * @param   {String} monster The name of the current monster
   * @param   {Number} index   The index of the current monster
   * @returns {String}         An HTML string
   */
  function createDoor (monster, index) {

    return (
      "<li class='grid-item'>" +
        "<button class='grid-button' type='button' data-monster='" + index + "'>" +
          "<img class='grid-image' src='svg/door.svg' alt='Open the door.'>" +
        "</button>" +
      "</li>"
    );

  }

  /**
   * Create an HTML string for the board
   * @returns {String} An HTML string
   */
  function createBoard () {

    return (
      "<p>Find the monsters but try to avoid the socks.</p>" +
      "<ul class='grid'>" +
        monsters.map(createDoor).join("") +
      "</ul>"
    );

  }

  /**
   * Start a new game
   */
  function startGame () {

    // Reset the number of monsters found
    monstersFound = 0;

    // Shuffle the monsters array
    shuffle(monsters);

    // Show the board
    main.innerHTML = createBoard();

  }

  /**
   * Show the losing screen
   */
  function showLoser () {

    main.innerHTML = (
      "<h2>You Lose</h2>" +
      "<p>Oh no, you found the socks!</p>" +
      "<img src='svg/sock.svg' alt='A pair of socks.'>" +
      "<p>" +
        "<button class='reset-button' type='button' data-reset>Play Again</button>" +
      "</p>"
    );

  }

  /**
   * Make sure the current monster isn't a sock
   * @param   {Object} monster The current monster
   * @returns {Boolean}        True or false
   */
  function isNotSock (monster) {
    return monster.src !== "sock"
  }

  /**
   * Create an HTML string for a single monster
   * @param   {String} monster The name of the current monster
   * @returns {String}         An HTML string
   */
  function createMonster (monster) {

    return (
      "<li class='grid-item''>" +
        "<img class='grid-image' src='svg/" + monster.src + ".svg' alt='" + monster.alt + "'>" +
      "</li>"
    );

  }

  /**
   * Show the winning screen
   */
  function showWinner () {

    main.innerHTML = (
      "<h2>You Win</h2>" +
      "<p>Awesome, you found all the monsters!</p>" +
      "<ul class='grid'>" +
        monsters.filter(isNotSock).map(createMonster).join("") +
      "</ul>" +
      "<p>" +
        "<button class='reset-button' type='button' data-reset>Play Again</button>" +
      "</p>"
    );

  }

  /**
   * Handle click events
   * @param {Object} event The Event object
   */
  function handleClick (event) {

    // If a "Play Again" button was clicked, start a new game
    if (event.target.matches("[data-reset]")) {
      startGame();
      return;
    }

    // Otherwise, get the door that was clicked
    var door = event.target.closest("[data-monster]");
    if (!door) return;

    // Get the monster's index from the door
    var index = door.getAttribute("data-monster");

    // If it was the sock, show that the user lost
    if (monsters[index].src === "sock") {
      showLoser();
      return;
    }

    // Otherwise, show the monster
    door.outerHTML = (
      "<img src='svg/" + monsters[index].src + ".svg' alt='" + monsters[index].alt + "'>"
    );

    // Increase the number of monsters found
    monstersFound++;

    // If all monsters have been found, show that the user won
    // (-1 for the sock)
    if (monstersFound === (monsters.length - 1)) {
      showWinner();
    }

  }


  //
  // Inits & Event Listeners
  //

  // Start the game
  startGame();

  // Handle click events
  main.addEventListener("click", handleClick);

})();