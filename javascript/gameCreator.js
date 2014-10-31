app.GameCreator = (function(){

  function getRandomValue() {
    var possibleValues = ['diamond', 'gem', 'ruby', 'sapphire', 'emerald'];
    var randomNumber = Math.floor(Math.random() * 5);
    return possibleValues[randomNumber]
  }

  function createBoard(createCells) {
    app.GameCreator.Board = new app.Collections.Board()
    createCells()
  }

  function calculateRow(position) {
    return Math.floor(position / 8)
  }

  function calculateColumn(position) {
    return Math.floor(position % 8)
  }

  function createCell(row, column,position) {
    var cell = new app.Models.Cell({
      value: getRandomValue(),
      position:position,
      row: row,
      column: column
    })
    return cell
  }

  function createBoardCells() {
    for (var index = 0; index < 64; index++) {
      var row = calculateRow(index);
      var column = calculateColumn(index);
      var cell = createCell(row,column,index);

      app.GameCreator.Board.add(cell)
    }
  }

  function startNewGame() {
    var board = app.GameCreator.Board;

    for (var index = 0; index < board.length; index++) {
      var currentCell = board.at(index);
      var newValue = getRandomValue();
      currentCell.set({value: newValue})
    }
    // app.GamePlayLogic.checkForTriples();
  }

  function startInitialGame() {
    createBoard(createBoardCells)
  }

  return {
    startInitialGame : startInitialGame,
    startNewGame : startNewGame
  }

})()

app.GameCreator.startInitialGame()