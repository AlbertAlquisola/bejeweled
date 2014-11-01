window.onload = function() {

  var newGameButton = document.getElementById('new-game');
  var board = document.getElementById('bejeweled');
  var previousCell;

  app.GamePlayLogic.initiateMove()

  function changeCellsToWhite() {
    var cells = document.getElementsByClassName('cell');

    for (var index = 0; index < cells.length; index++) {
      var currentCell = cells[index];
      currentCell.style.backgroundColor = 'white';
    }
  }

  function makeCurrentCellBlue(event) {
    event.target.style.backgroundColor = 'blue';
  }

  function getCellAbove(cell){
    var board = app.GameCreator.Board;
    var row = cell.attributes.row - 1;
    var column = cell.attributes.column;
    var cellAbove = _.first(board.where({row: row, column: column}));
    if (cellAbove) return cellAbove
  }

  function getCellBelow(cell){
    var board = app.GameCreator.Board;
    var row = cell.attributes.row + 1;
    var column = cell.attributes.column;
    var cellBelow = _.first(board.where({row: row, column: column}));
    if (cellBelow) return cellBelow
  }

  function getCellToTheLeft(cell) {
    var board = app.GameCreator.Board;
    var row = cell.attributes.row;
    var column = cell.attributes.column - 1;
    var leftCell = _.first(board.where({row: row, column: column}));
    if (leftCell) return leftCell
  }

  function getCellToTheRight(cell) {
    var board = app.GameCreator.Board;
    var row = cell.attributes.row;
    var column = cell.attributes.column + 1;
    var rightCell = _.first(board.where({row: row, column: column}));
    if (rightCell) return rightCell
  }

  function getTargetNeighbors(cell) {
    var neighbors = [];

    if (getCellAbove(cell)) neighbors.push(getCellAbove(cell))
    if (getCellBelow(cell)) neighbors.push(getCellBelow(cell))
    if (getCellToTheLeft(cell)) neighbors.push(getCellToTheLeft(cell))
    if (getCellToTheRight(cell)) neighbors.push(getCellToTheRight(cell))

    return neighbors
  }

  function swapValues(cell) {
    var previousValue = previousCell.attributes.value;
    previousCell.set({value: cell.attributes.value})
    cell.set({value: previousValue})
  }

  function validateMove(cell) {
    var allTriples = app.GameTriplesLogic.grabAllTriples()
    return allTriples.length > 0 ? true : false
  }


  newGameButton.addEventListener('click', function() {
    app.GameCreator.startNewGame()
  });


  board.addEventListener('click', function(event) {
    var board = app.GameCreator.Board;
    var position = event.target.id;
    var cell = board.at(position);
    var neighbors = getTargetNeighbors(cell);

    if (_.contains(neighbors, previousCell)) {
      swapValues(cell)
      var validMove = validateMove(cell)

      if (validMove) {
        app.GamePlayLogic.initiateMove()
        cell = undefined;
        previousCell = undefined;
        changeCellsToWhite();
      }
      else {
        swapValues(cell)
        alert("sorry, that move won't create any triples. Please try again.")
        cell = undefined;
        previousCell = undefined;
        changeCellsToWhite();
      }
    }
    else {
      previousCell = cell
      changeCellsToWhite();
      makeCurrentCellBlue(event);
    }
  })
}