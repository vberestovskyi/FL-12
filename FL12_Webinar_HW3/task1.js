class Deck {
  static suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  static ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  constructor() {
    this.cards = [];
    this.createDeck = function () {
      for (const suit of Deck.suits) {
        for (const rank of Deck.ranks) {
          const card = new Card(suit, rank);
          this.cards.push(card);
        }
      }
    };
    this.createDeck();
  }
  get count() {
    if (!this.cards) {
      return 0;
    }
    return this.cards.length;
  }
  shuffle() {
    for (let i = this.count - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  draw(n) {
    return this.cards.splice(-n, n);
  }
}

class Card {
  static Compare(cardOne, cardTwo) {
    return cardOne.rank - cardTwo.rank;
  }
  static values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
  get isFaceCard() {
    return this.rank === 1 || this.rank > 10;
  }
  toString() {
    return `${Card.values[this.rank - 1]} of ${this.suit}`;
  }
}

class Player {
  static Play(playerOne, playerTwo) {
    const removeCards = 1;
    let message = '';
    playerOne.deck = new Deck();
    playerTwo.deck = new Deck();
    playerOne.deck.shuffle();
    playerTwo.deck.shuffle();
    while (playerOne.deck.count > 0 && playerTwo.deck.count > 0) {
      const cardOne = playerOne.deck.draw(removeCards)[0];
      const cardTwo = playerTwo.deck.draw(removeCards)[0];
      const higherCard = Card.Compare(cardOne, cardTwo);
      if (higherCard > 0) {
        playerOne.wins++;
      } else if (higherCard < 0) {
        playerTwo.wins++;
      }
    }
    if (playerOne.wins > playerTwo.wins) {
      message = `${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`;
    } else if (playerTwo.wins > playerOne.wins) {
      message = `${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`;
    } else {
      message = 'Draw!';
    }
    playerOne.wins = 0;
    playerTwo.wins = 0;
    return message;
  }
  constructor(name) {
    this.name = name;
    this.deck = new Deck();
  }
  get wins() {
    if (!this._wins) {
      this._wins = 0;
    }
    return this._wins;
  }
  set wins(value) {
    this._wins = value;
  }
}

//! DATA FOR TESTING
/*
const one = new Player('Bob');
const two = new Player('Pretender');
const three = new Player('Tester');
Player.Play(one, two);
let mycard = three.deck.cards[11];
let mycard2 = three.deck.cards[28];
*/