;(function(d) {

  "use strict";

  /**
   * Variables
   */

  var root = d.querySelector("#app");

  var app = new Reef(root, {
    data: {
      monstersHidden: ["sock"],
      monstersFound: []
    },
    template: function(props) {
      return (
        "<div class='grid'>" +
          createCells(props) +
        "</div>"
      );
    }
  });



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

  /**
   * Create the cells of monsters/doors for the grid
   */
  function createCells(props) {
    return (
      props.monstersHidden.map(function(monster, index) {
        if (props.monstersFound.indexOf(monster) > -1) {
          return (
            "<div class='cell' aria-live='polite'>" +
              "<img src='assets/svg/" + monster + ".svg' alt='" + monster + "'>" +
            "</div>"
          );
        }

        return (
          "<div class='cell' aria-live='polite'>" +
            "<button type='button' data-monster='" + index + "'>" +
              "<img src='assets/svg/door.svg' alt='Click the door to see who is behind it'>" +
            "</button>" +
          "</div>"
        );
      }).join("")
    );
  }

  /**
   * Reveal the monster/sock behind a door
   */
  function openDoor(event) {
    // Get the closest button
    var monster = event.target.closest("button");
    if (!monster) return;

    // Get the current app data
    var data = app.getData();

    // Get the array index of the monster/sock behind this door
    // Then get the value at this index
    monster = parseInt(monster.getAttribute("data-monster"), 10);
    monster = data.monstersHidden.splice(monster, 1).toString();

    // If the monster/sock has not been found already, add it to the array
    if (data.monstersFound.indexOf(monster) === -1) {
      app.data.monstersFound.push(monster);
    }

    // Update the UI
    app.render();
  }



  /**
   * Init
   */

  // Add 11 monsters to the array of hidden monsters
  for (var i = 1; i <= 11; i++) {
    app.data.monstersHidden.push("monster" + i);
  }

  // Shuffle the array of hidden monsters
  app.data.monstersHidden = shuffle(app.data.monstersHidden);

  // Render the initial UI
  app.render();

  // Update the UI when a door is opened
  root.addEventListener("click", openDoor, false);

})(document);
