window.onload = function() {
  app.GamePlayLogic.checkForTriples();

  (function activateNewGameButton() {
    var newGameButton = document.getElementById('new-game');

      newGameButton.addEventListener('click', function(){
        app.GameCreator.startNewGame()
      })
  })()

}