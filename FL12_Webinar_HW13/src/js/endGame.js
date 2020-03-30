function endGame(draw, variables) {
  const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
  const winningMessageElement = document.getElementById('winningMessage');
  const xScoreContainer = document.getElementById('xScore');
  const oScoreContainer = document.getElementById('oScore');

  if (draw) {
    variables.xScore++;
    variables.oScore++;
    oScoreContainer.innerText = variables.oScore;
    xScoreContainer.innerText = variables.xScore;
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    if (variables.circleTurn) {
      variables.oScore++;
      oScoreContainer.innerText = variables.oScore;
    } else {
      variables.xScore++;
      xScoreContainer.innerText = variables.xScore;
    }
    winningMessageTextElement.innerText = `${variables.circleTurn ? 'O\'s' : 'X\'s'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

export default endGame;
