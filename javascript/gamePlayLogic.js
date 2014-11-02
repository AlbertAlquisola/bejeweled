app.GamePlayLogic = (function(){

  function getRandomValue() {
    var possibleValues = ['#55E3ED', '#5571ED', '#C555ED', '#F06E8F', '#6EF0B3'];
    var randomNumber = Math.floor(Math.random() * 5);
    return possibleValues[randomNumber]
  }

  function makeCellEmpty(cell) {
    cell.set({value : undefined})
  }


  function grabCellAbove(cell) {
    var positionOfCellAbove = cell.attributes.position - 8
    return app.GameCreator.Board.at(positionOfCellAbove)
  }

  function fetchValueAbove(cell) {
    var rowAbove = cell.attributes.row - 1;
    if (rowAbove >= 0) var cellAbove = grabCellAbove(cell);

    //base case
    if (!cellAbove) return getRandomValue();

    if (cellAbove.attributes.value) {
      var valueToMoveDown = cellAbove.attributes.value;
      makeCellEmpty(cellAbove)
      return valueToMoveDown
    }
    else {
      return fetchValueAbove(cellAbove)
    }
  }

  function makeTriplesDisappear(allTriples) {

    for (var index = 0; index < allTriples.length; index++) {
      var currentCell = allTriples[index]
      makeCellEmpty(currentCell)
    }
  }

  function makeValuesDrop() {
    var board = app.GameCreator.Board;

    for (var index = board.length - 1; index >= 0; index--) {
      var currentCell = board.at(index);

      if(!currentCell.attributes.value) {
        var value = fetchValueAbove(currentCell)
        currentCell.set({value : value})
      }
    }
  }

  function initiateMove() {
    var allTriples = app.GameTriplesLogic.grabAllTriples()

    //base case: no more triples
    if (allTriples.length === 0) return;

    makeTriplesDisappear(allTriples)
    makeValuesDrop()
    initiateMove()
  }

  return {initiateMove: initiateMove}

})()