/*Please think carefully, what should be exposed to the world and what should be kept private 
(encapsulate sensitive data and unnecessary implementation details). 
Consider making use of static methods!
*/


class Deck {
  // Class members:
  // - properties:
  // - methods:
  // Implementation Details:
  // Initially each deck is filled with 52 cards (13 from each of 4 suits).

  constructor() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.cards = [];
    this.createDeck = function () {
      for (const suit of suits) {
        for (const rank of ranks) {
          const card = new Card(suit, rank);
          this.cards.push(card);
        };
      };
    };
    this.createDeck();
  };

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
    };
  };

  draw(n) {
    return this.cards.splice(-n, n);
  }
}

class Card {
  // Class members:
  // - properties:

  // - methods:
  // •	toString(): human-readable string representation of the card 
  //  (e.g. "Ace of Spades", "10 of Clubs", "Queen of Hearts" etc.)
  // •	Compare(cardOne, cardTwo): Cards must be Comparable to other cards by ranks.
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;

  }

  get isFaceCard() {
    return this.rank === 1 || this.rank > 10;
  }


}

class Player {
  //   Class members:
  // - properties:
  // - methods:
  // •	Play(playerOne, playerTwo): starts the game;
  // Implementation Details:
  // •	Players both take a card from their deck.
  // •	Whoever has a card with higher value wins the round and gets one point 
  //    (if the cards are of the same value, neither of them gets a point).
  // •	Then the two cards are discarded (removed from the deck) and they flip 
  //    the next card from the deck.
  // •	The game lasts until they are run out of cards.
  // •	When game ends, figure out who is a winner (compare their scores) and 
  //    return a summing up message with the final score:
  // `{Winner} wins {X} to {Y}` (i.e. "John wins 10 to 7").
  static Play(playerOne, playerTwo) {
    const removeCards = 1;
    let message = ''

    playerOne.deck = new Deck();
    playerTwo.deck = new Deck();
    playerOne.deck.shuffle();
    playerTwo.deck.shuffle();

    while (playerOne.deck.count > 0 && playerTwo.deck.count > 0) {
      const cardOne = playerOne.deck.draw(removeCards)[0];
      const cardTwo = playerTwo.deck.draw(removeCards)[0];

      if (cardOne.rank > cardTwo.rank) {
        playerOne.wins++;
      } else if (cardTwo.rank > cardOne.rank) {
        playerTwo.wins++;
      }
      //console.log('1', playerOne.wins, '2', playerTwo.wins);

    }


    if (playerOne.wins > playerTwo.wins) {
      message = `${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`;
    } else if (playerTwo.wins > playerOne.wins) {
      message = `${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`;
    } else message = 'Draw!';

    //console.log('1', playerOne.deck.cards.length, '2', playerTwo.deck.cards.length);
    playerOne.wins = 0;
    playerTwo.wins = 0;
    return message;
  }

  constructor(name) {
    this.name = name;
    this.deck = [];

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

const one = new Player('Bob');
const two = new Player('Pretender');
Player.Play(one, two);
