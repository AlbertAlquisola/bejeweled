app.GameTriplesLogic = (function(){

  (function createTransposedBoard() {
    app.GameCreator.TransposedBoard = new app.Collections.Board
    var index = 0;

    while (index < 8) {
      var currentPosition = index;

      while(currentPosition < 64) {
        var currentCell = app.GameCreator.Board.at(currentPosition);
        app.GameCreator.TransposedBoard.add(currentCell)
        currentPosition += 8;
      }
      index++;
    }
  })()

  function matchingValueAndMatchingColumn(cellOne, cellTwo){
    return (cellOne.attributes.value === cellTwo.attributes.value &&
            cellOne.attributes.column === cellTwo.attributes.column)
  }

  function matchingValueAndMatchingRow(cellOne, cellTwo) {
    return (cellOne.attributes.value === cellTwo.attributes.value &&
            cellOne.attributes.row === cellTwo.attributes.row)
  }

  function thereIsATripleOrMore(counter){
    return counter >= 3
  }

  function grabAllVerticalTriples() {
    var board = app.GameCreator.TransposedBoard;
    var verticalTriples = [];
    var counter = 1;
    var startingPosition = 0;
    var endingPosition = 0;

    for (var index = 0; index < board.length - 1; index++) {
      var currentCell = board.at(index);
      var nextCell = board.at(index + 1);

      if (matchingValueAndMatchingColumn(currentCell, nextCell)) {
        counter++;
        endingPosition++;
      }

      else {

        if (thereIsATripleOrMore(counter)) {
          verticalTriples.push(board.slice(startingPosition, endingPosition + 1))
        }

        counter = 1;
        startingPosition = index + 1;
        endingPosition = index + 1;
      }
    }

    if (thereIsATripleOrMore(counter)) {
      verticalTriples.push(board.slice(startingPosition, endingPosition + 1))
    }

    return verticalTriples
  }

  function grabAllHorizontalTriples() {
    var board = app.GameCreator.Board;
    var horizontalTriples = [];
    var counter = 1;
    var startingPosition = 0;
    var endingPosition = 0;

    for (var index = 0; index < board.length - 1; index++) {
      var currentCell = board.at(index);
      var nextCell = board.at(index + 1);

      if (matchingValueAndMatchingRow(currentCell, nextCell)) {
        counter++;
        endingPosition++;
      }

      else {

        if (thereIsATripleOrMore(counter)) {
          horizontalTriples.push(board.slice(startingPosition, endingPosition + 1))
        }

        counter = 1;
        startingPosition = index + 1;
        endingPosition = index + 1;
      }
    }

    if (thereIsATripleOrMore(counter)) {
      horizontalTriples.push(board.slice(startingPosition, endingPosition + 1))
    }

    return horizontalTriples
  }

  function flatten(arr) {
    return _.flatten(arr)
  }

  function combineTriples(horizontal, vertical) {
    return horizontal.concat(vertical)
  }

  function grabAllTriples(){
    var verticalTriples = flatten(grabAllVerticalTriples());
    var horizontalTriples = flatten(grabAllHorizontalTriples());
    var allTriples = combineTriples(horizontalTriples, verticalTriples)
    return allTriples
  }

  return {grabAllTriples: grabAllTriples}

})()