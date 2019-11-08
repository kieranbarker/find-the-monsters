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
          createCell(props) +
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

  function createCell(props) {
    return props.monstersHidden.map(function(monster) {
      if (props.monstersFound.indexOf(monster) > -1) {
        return (
          "<div class='cell'>" +
            "<img src='assets/svg/" + monster + ".svg' alt='" + monster + "'>" +
          "</div>"
        );
      }

      return (
        "<div class='cell'>" +
          "<button type='button' data-monster='" + monster + "'>" +
            "<img src='assets/svg/door.svg' alt='Click the door to see who is behind it'>" +
          "</button>" +
        "</div>"
      );
    }).join("");
  }

  function openDoor(event) {
    var monster = event.target.closest("button");
    if (!monster) return;

    var data = app.getData();
    monster = monster.getAttribute("data-monster");

    if (data.monstersFound.indexOf(monster) === -1) {
      app.data.monstersFound.push(monster);
    }

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
