function randomPlayer(variables) {
  Math.random() < 0.5 ? variables.circleTurn = true : variables.circleTurn = false;
}

export default randomPlayer;
