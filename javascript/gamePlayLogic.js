app.GamePlayLogic = (function(){

  var numberOfTriples;

  (function listenForPermissionToDropGems() {
    $(document).on('permissionGranted', makeGemsDrop)
  })()

  function getRandomValue() {
    var possibleValues = ['#55E3ED', '#5571ED', '#C555ED', '#F06E8F', '#6EF0B3'];
    var randomNumber = Math.floor(Math.random() * 5);
    return possibleValues[randomNumber]
  }

  function decrementNumberOfTriples() {
    numberOfTriples--;
  }

  function checkIfAllTriplesEmpty() {
   if (numberOfTriples <= 0) allowGemsToDrop()
  }

  function highlightCell(cell) {
    var DOMElement = $('#' + cell.attributes.position)
    DOMElement.css({border: ".15em solid black", margin: "0em"})
  }

  function makeCellEmpty(cell) {
    cell.set({value : undefined})
  }

  function initiateCellChange(cell) {
    makeCellEmpty(cell)
    decrementNumberOfTriples()
    checkIfAllTriplesEmpty()
  }

  function allowGemsToDrop() {
    $(document).trigger('permissionGranted')
  }

  function fadeCellOut(cell) {
    var DOMElement = $('#' + cell.attributes.position);
    var settings = {duration: 2000, done: function() { initiateCellChange(cell) }}
      DOMElement.animate({opacity : 0}, settings)
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
    numberOfTriples = allTriples.length;

    for (var index = 0; index < allTriples.length; index++) {
      var currentCell = allTriples[index]
      highlightCell(currentCell)
      fadeCellOut(currentCell)
    }
  }

  function makeGemsDrop() {
    var board = app.GameCreator.Board;

    for (var index = board.length - 1; index >= 0; index--) {
      var currentCell = board.at(index);
      var DOMElement = $('#' + currentCell.attributes.position);

      if(!currentCell.attributes.value) {
        var value = fetchValueAbove(currentCell)
        DOMElement.css({opacity:100, border:"none",margin: ".15em"})
        currentCell.set({value : value})
      }
    }
    initiateMove()
  }

  function initiateMove() {
    var allTriples = app.GameTriplesLogic.grabAllTriples()

    //base case: no more triples
    if (allTriples.length === 0) return;
    makeTriplesDisappear(allTriples);
  }

  return {initiateMove: initiateMove}

})()