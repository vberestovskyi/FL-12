import '../styles/layout.scss';
import '../styles/winning.scss';
import reset from './reset';
import endGame from './endGame';
import randomPlayer from './randomPlayer';
import setBoardHoverClass from './setBoardHoverClass';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMessage');
const clearButton = document.getElementById('clearButton');
const newButton = document.getElementById('newButton');
const variables = {
  xScore: 0,
  oScore: 0,
  circleTurn: false,
  CROSS: 'x',
  CIRCLE: 'circle',
};

startGame();
clearButton.addEventListener('click', () => reset(startGame, variables));
newButton.addEventListener('click', startGame);

function startGame() {
  randomPlayer(variables);
  cellElements.forEach((cell) => {
    cell.classList.remove(variables.CROSS);
    cell.classList.remove(variables.CIRCLE);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true});
  });
  setBoardHoverClass(variables);
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = variables.circleTurn ? variables.CIRCLE : variables.CROSS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false, variables);
  } else if (isDraw()) {
    endGame(true, variables);
  } else {
    swapTurns();
    setBoardHoverClass(variables);
  }
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(variables.CROSS) || cell.classList.contains(variables.CIRCLE);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  variables.circleTurn = !variables.circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
