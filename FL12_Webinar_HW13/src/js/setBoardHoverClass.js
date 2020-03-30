function setBoardHoverClass(variables) {
  const board = document.getElementById('board');
  board.classList.remove(variables.CROSS);
  board.classList.remove(variables.CIRCLE);
  if (variables.circleTurn) {
    board.classList.add(variables.CIRCLE);
  } else {
    board.classList.add(variables.CROSS);
  }
}

export default setBoardHoverClass;
