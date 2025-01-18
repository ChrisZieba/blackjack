# blackjack

[![Build Status](https://travis-ci.org/ChrisZieba/blackjack.svg)](https://travis-ci.org/ChrisZieba/blackjack)

> A small game engine for blackjack, and a library for calculating hand probabilities.

The game engine is still very basic and needs a lot of functionality added. Its use is to create the needed scenarios for calculating hand probabilities. To see an example of hand probabilities being calculated please see [here](http://chriszieba.com/2015/03/30/blackjack-probabilities). There is also an [example](https://github.com/ChrisZieba/blackjack/blob/master/examples/blackjack.html) source file that can be found in the `examples` directory.

## Usage

You can use the game engine and probability library separately or together.

```js
var game = new Blackjack.Game('player1', 'house', {
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

## Options

- `numberOfDecks` {Integer} 
   - The number of decks in a shoe. The standard in most casinos is between 4 and 8.
- `dealerHitSoft17` {Boolean} 
    - If `true` the dealer will hit on soft 17, otherwise the dealer will continue to draw cards.

## Methods

The following are all the public methods exposed through the `Game`, `Player`, and `Probability` API.

#### Game

- `getDealer()` 
  - Returns the dealer object.
- `getPlayer()`
  - Returns the player object. *Only one player in a game supported right now.*
- `getTurn()` 
  - Returns the player or dealer, depending on which turn is set.
- `setTurn(player)`
  - Takes a player object and sets that player or dealer as the active turn.
- `getShoe()` 
  - Returns an array of all card objects in the shoe.
- `deal()`
  - Handles the game setup, i.e., card shuffling, turn setting, etc.
  
#### Player

- `getCards()` 
  - Returns an array of the players cards.
- `canSplit()`
  - True if the player can split their cards, false otherwise.
- `canDouble()` 
  - True if the player can double down, false otherwise.
- `getActions()` 
  - Returns an array of all the actions available to the player.

#### Probabilities

The `dealerCards` and `playerCards` can be retrieved using `game.getPlayer().getCards()`. The `maxPullCount` is used to limit the number of times the recursive function is called. A number between `3` and `5` will return a reasonably accurate result while still being fast.

- `stand(shoe, dealerCards, playerCards, maxPullCount)` 
- `hit(shoe, dealerCards, playerCards, maxPullCount)`
- `double(shoe, dealerCards, playerCards, maxPullCount)` 

## Development

There are many features for the game engine that need to be added and/or worked on:

- Add splitting to the probability library
- Handle player and dealer chip amounts
- Support for more than one player to a game

There are many options that need to be supported in the game constructor:

- `playerResplitAces`
- `player5Card21` 
- `playerSurrender`

#### Local

To build `blackjack` please run:

```
grunt
```

The combined minified file will appear in the `dist` folder.

## License

[MIT](https://github.com/ChrisZieba/blackjack/blob/master/LICENSE) license.
