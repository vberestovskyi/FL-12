const getComputerChoice = () => {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock'
  } else if (rand < 0.67) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

export default getComputerChoice;