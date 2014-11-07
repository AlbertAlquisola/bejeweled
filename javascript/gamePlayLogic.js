app.GamePlayLogic = (function(){

  var numberOfTriples;

  (function listenForPermissionToDropCells() {
    $(document).on('permissionGranted', makeCellDrop)
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
    if (numberOfTriples <= 0) allowCellsToDrop()
  }

  function highlightCell(cell) {
    var DOMElement = $('#' + cell.attributes.position)
    DOMElement.css({border: ".15em solid black", margin: "0em"})
  }

  function makeCellInvisible(cell) {
    cell.set({value: undefined})
  }

  function initiateCellChange(cell) {
    makeCellInvisible(cell)
    decrementNumberOfTriples()
    checkIfAllTriplesEmpty()
  }

  function allowCellsToDrop() {
    $(document).trigger('permissionGranted')
  }

  function fadeCellOut(cell) {
    var DOMElement = $('#' + cell.attributes.position);
    var settings = {duration: 1600, done: function() { initiateCellChange(cell) }}
      DOMElement.animate({opacity : 0}, settings)
  }

  function grabCellAbove(cell) {
    var positionOfCellAbove = cell.attributes.position - 8
    return app.GameCreator.Board.at(positionOfCellAbove)
  }

  function fetchCellToFall(cell) {
    var rowAbove = cell.attributes.row - 1;
    var cellAbove = grabCellAbove(cell);

    //base case
    if (cellAbove.attributes.row === 0) {
      cellAbove.set({value:getRandomValue()})
      return cellAbove
    }

    if (cellAbove.attributes.value) return cellAbove;

    return fetchCellToFall(cellAbove)
  }

  function makeTriplesDisappear(allTriples) {
    numberOfTriples = allTriples.length;

    for (var index = 0; index < allTriples.length; index++) {
      var currentCell = allTriples[index]
      highlightCell(currentCell)
      fadeCellOut(currentCell)
    }
  }

  function animateCellDropping(cellToDrop, currentCell, distance) {
    var settings = {duration: 350, done: function() {
      swapCells(cellToDrop, currentCell, distance)
      }
    }
    var DOMElement = document.getElementById(cellToDrop.attributes.position);
    $(DOMElement).animate({bottom: distance}, settings)
  }

  function moveInvisibleCellBackUp(cell) {
    var DOMElement = $('#' + cell.attributes.position);
    var settings = {duration: 100, done: function() { makeCellDrop() }};
    $(DOMElement).animate({bottom:0}, settings)
  }

  function makeCellVisible(cell, newValue) {
    var DOMElement = $('#' + cell.attributes.position);
    $(DOMElement).css({opacity:100, border:"none", margin: ".15em"})
    cell.set({value: newValue})
  }

  function swapCells(cellThatDropped, currentCell, distanceNeeded) {
    var newValue = cellThatDropped.attributes.value;
    makeCellInvisible(cellThatDropped)
    makeCellVisible(currentCell, newValue)
    moveInvisibleCellBackUp(cellThatDropped)
  }

  function makeCellDrop() {
    var board = app.GameCreator.Board;

    for (var index = board.length - 1; index >= 8; index--) {
      var currentCell = board.at(index);
      var currentDOMElement = document.getElementById(currentCell.attributes.position);

      if (!currentCell.attributes.value) {
        var cellToDrop = fetchCellToFall(currentCell);
        var newCellDOMElement = document.getElementById(cellToDrop.attributes.position);
        var distanceNeeded = newCellDOMElement.offsetTop - currentDOMElement.offsetTop;
        animateCellDropping(cellToDrop, currentCell, distanceNeeded)
        return;
      }
    }
    initiateMove();
  }

  function initiateMove() {
    var allTriples = app.GameTriplesLogic.grabAllTriples()

    //base case: no more triples
    if (allTriples.length === 0) return;
    makeTriplesDisappear(allTriples);
  }

  return {initiateMove: initiateMove}

})()