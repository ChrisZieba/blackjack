#blackjack

> A small game engine for blackjack and a library for calculating hand probabilities.

The game engine is still very basic and needs a lot of functionality added. Its use is to create the needed scenarios for calculating hand probabilities. To see an example of hand probabilities being calculated please see [here](http://chriszieba.com/2015/03/30/blackjack_probabilities). There is also an [example](https://github.com/ChrisZieba/blackjack/blob/master/examples/blackjack.html) source file that can be found in the `examples` directory.

##Usage

You can use the game engine and probability library separately or together.

```js
var game = new Blackjack.Game("player1", "house, {
	numberOfDecks: 1
});

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

- `numberOfDecks` {Integer} 
   - The number of decks in a shoe. The standard in most casinos is between 4 and 8.
- `dealerHitSoft17` {Boolean} 
    - If `true` the dealer will hit on soft 17, otherwise the dealer will continue to draw cards.

##Development

There are many features for the game engine that need to be added and/or  worked on:

- Add splitting to the probability library
- Handle player and dealer chip amounts
- Support for more than one player to a game

There are many options that need to be supported in the game constructor:

- `playerResplitAces`
- `player5Card21` 
- `playerSurrender`

###Local

To build `blackjack` please run:

```
grunt
```

The combined minified file will appear in the `dist` folder.

##License

`blackjack` is [MIT](https://github.com/ChrisZieba/blackjack/blob/master/LICENSE) licensed.