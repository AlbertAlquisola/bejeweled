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

  function createBoardCells() {
    for (var index = 0; index < 64; index++) {
      var row = calculateRow(index);
      var column = calculateColumn(index);

      var cell = new app.Models.Cell({
        value: getRandomValue(),
        position:index,
        row: row,
        column: column
      })

      app.GameCreator.Board.add(cell)
    }
  }

  function startInitialGame() {
    createBoard(createBoardCells)
  }

  return {
    startInitialGame : startInitialGame
  }

})()

app.GameCreator.startInitialGame()