function Fighter(props) {
  const name = props.name;
  const damage = props.damage;
  let hp = props.hp;
  const strength = props.strength;
  const agility = props.agility;
  const maxHP = hp;
  let losses = 0;
  let wins = 0;

  return {
    getName: () => name,
    getDamage: () => damage,
    getStrength: () => strength,
    getAgility: () => agility,
    getHealth: () => hp,
    attack: fighter => {
      const successLimit = 100;
      const maxSuccess = 1;
      let success = maxSuccess - (agility + strength) / successLimit;
      if (Math.random() <= success) {
        fighter.dealDamage(damage);
        console.log(`${name} makes ${damage} damage to ${fighter.getName()}`);
      } else {
        console.log(`${name} attack missed`);
      }
    },
    logCombatHistory: () => console.log(`Name: ${name}, ` + `Wins: ${wins}, ` + `Losses: ${losses}`),
    heal: amount => {
      amount + hp <= maxHP ? hp += amount : hp = maxHP;
    },
    dealDamage: amount => {
      hp - amount >= 0 ? hp -= amount : hp = 0;
    },
    addWin: () => wins++,
    addLoss: () => losses++
  };
}

function battle(fighterOne, fighterTwo) {
  if (fighterOne.getHealth() === 0 || fighterTwo.getHealth() === 0) {
    fighterOne.getHealth() === 0 ?
      console.log(`${fighterOne.getName()} is dead and can't fight.`) :
      console.log(`${fighterTwo.getName()} is dead and can't fight.`);
    return;
  }
  while (fighterOne.getHealth() > 0 && fighterTwo.getHealth() > 0) {
    fighterOne.attack(fighterTwo);
    if (fighterTwo.getHealth() > 0) {
      fighterTwo.attack(fighterOne);
      if (fighterOne.getHealth() === 0) {
        fighterTwo.addWin();
        fighterOne.addLoss();
        console.log(`${fighterTwo.getName()} has won!`);
      }
    } else {
      fighterOne.addWin();
      fighterTwo.addLoss();
      console.log(`${fighterOne.getName()} has won!`);
    }
  }
}