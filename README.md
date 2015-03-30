#blackjack

A small game engine for casino blackjack and a library for calculating hand probabilities.

#Usage

You can use the game engine and probability library seperator or together.

```js
var player = "Player";
var dealer = "Dealer";
var options = {
	numberOfDecks: 1
};

var game = new Blackjack.Game(player, dealer, options);

// Start a new game
game.deal();

var shoe = game.getShoe();
var dealerCards = game.getDealer().getCards();
var playerCards = game.getPlayer().getCards();			

// Calculate probabilities for standing, hitting, and doubling down
var stand = Blackjack.Probability.stand(shoe, dealerCards, playerCards, 3);
var hit = Blackjack.Probability.hit(shoe, dealerCards, playerCards, 3);
var double = Blackjack.Probability.double(shoe, dealerCards, playerCards, 3);
```

##Options

- `numberOfDecks` {Integer} The number of decks in a shoe. The standard in most casinos is between 4 and 8.

##TODO

- Add splitting to the probability library
- Handle player and dealer amounts
- More than one player to a game

There are many options that I would like to support:

- `dealerHitSoft17`
- `resplitAces`
- `player5Card21`