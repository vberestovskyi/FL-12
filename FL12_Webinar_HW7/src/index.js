import getComputerChoice from './js/getComputerChoice.js';
import getWinner from './js/getWinner.js';
import showWinner from './js/showWinner.js';
import restartGame from './js/restartGame.js';
import clearModal from './js/clearModal.js';

import './scss/main.scss'
import picture from './img/game.png'

const choices = document.querySelectorAll('.choice');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const illustration = document.querySelector('#illustration');
illustration.innerHTML = `<img src="${picture}" alt="Illustration">`
const scoreboard = {
  player: 0,
  computer: 0
};

function play(e) {
  restart.style.display = "inline-block"
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice, scoreboard, modal);
}

choices.forEach(choice => { choice.addEventListener('click', play) });
window.addEventListener('click', (e) => clearModal(e));
restart.addEventListener('click', () => restartGame(scoreboard));
