const pocketDefault = 8;
const prizeDefault = 100;
const prizeModifier = 2;
const minPocket = 0;
const increasePocket = 4;
const maxPrizeRatio = {
  '3': 1,
  '2': 2,
  '1': 4
};
let pocket = 0;
let userGuess = 0;
let maxPocket = 8;
let prize = 0;
let prizeBase = 100;
let isPlaying = true;
let wannaPlay = true;
let hasGuessed;

if (confirm('Do you want to play a game?')) {
  while (isPlaying) {
    while (wannaPlay) {
      pocket = Math.floor(Math.random() * (maxPocket + 1));
      for (let i = 3; i >= 1; i--) {
        userGuess = prompt(`
      Choose a roulette pocket number from 0 to ${maxPocket}
      Attempts left: ${i}
      Total prize: ${prize}$
      Possible prize on current attempt: ${prizeBase}$
      `, '0');
        let isInvalid = !userGuess || isNaN(+userGuess);
        if (!isInvalid && parseInt(userGuess, 10) === pocket) {
          prize += prizeBase;
          hasGuessed = true;
          prizeBase = prizeBase * maxPrizeRatio[i];
          break;
        }
        prizeBase = prizeBase / prizeModifier;
        hasGuessed = false;
      }
      if (hasGuessed) {
        if (confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`)) {
          maxPocket += increasePocket;
          prizeBase = prizeBase * prizeModifier;
        } else {
          wannaPlay = false;
        }
      } else {
        wannaPlay = false;
      }
    }
    alert(`Thank you for your participation. Your prize is: ${prize}$`);
    if (confirm('Do you want to play again?')) {
      isPlaying = true;
      wannaPlay = true;
      prize = 0;
      prizeBase = prizeDefault;
      maxPocket = pocketDefault;
    } else {
      isPlaying = false;
    }
  }
} else {
  alert('You did not become a billionaire, but can.');
}