;(function(d) {

  "use strict";

  /**
   * Variables
   */

  var app = d.querySelector("#app");

  var monsters = [
    "monster1",
    "monster2",
    "monster3",
    "monster4",
    "monster5",
    "monster6",
    "monster7",
    "monster8",
    "monster9",
    "monster10",
    "monster11",
    "sock"
  ];



  /**
   * Functions
   */

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {String}      The first item in the shuffled array
   */
  function shuffle(array) {
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

  function createCell(monster) {
    return (
      "<div class='cell'>" +
        "<img src='assets/svg/" + monster + ".svg' alt='" + monster + "'>" +
      "</div>"
    );
  }

  function template() {
    return (
      "<div class='grid'>" +
        shuffle(monsters).map(createCell).join("") +
      "</div>"
    );
  }

  function render() {
    app.innerHTML = template();
  }



  /**
   * Init
   */

  render();

})(document);
