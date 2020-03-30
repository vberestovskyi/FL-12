function reset(startGame, variables) {
  const xScoreContainer = document.getElementById('xScore');
  const oScoreContainer = document.getElementById('oScore');
  oScoreContainer.innerText = 0;
  xScoreContainer.innerText = 0;
  variables.oScore = 0;
  variables.xScore = 0;
  startGame();
}

export default reset;
