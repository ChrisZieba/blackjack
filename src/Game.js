/**
 * A simple blackjack game engine.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Chris Zieba (zieba.chris@gmail.com)
 */

var Blackjack = Blackjack || {};

Blackjack.Game = (function() {
    'use strict';

    var SUITS = ['♥', '♦', '♠', '♣'];
    var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    var HIT = 'Hit';
    var BUST = 'Bust';
    var STAND = 'Stand';
    var SPLIT = 'Split';
    var DOUBLE = 'Double';
    var SURRENDER = 'Surrender';

    /**
     * Shuffle an array of cards.
     */
    var shuffle = function() {
        var i = this.shoe.length, j, swap;

        while (--i) {
            j = Math.random() * (i + 1) | 0;
            swap = this.shoe[i];
            this.shoe[i] = this.shoe[j];
            this.shoe[j] = swap;
        }
    };

    /**
     * Load the shoe with cards.
     */
    var load = function() {
        // Empty out the shoe (just to be sure)
        this.shoe = [];

        // Create the shoe using the decks setting
        for (var i = 0; i < this.decks; i+=1) {
            for (var j = 0; j < SUITS.length; j++) {
                for (var k = 0; k < RANKS.length; k++) {
                    this.shoe.push(new Card(RANKS[k], SUITS[j]));
                }
            }
        }
    };

    /**
     * Game Constructor.
     *
     * @param {String} player
     * @param {String} dealer
     * @param {Object} options
     */
    function Game(player, dealer, options) {
        this.decks = options.numberOfDecks;
        this.dealerHitSoft17 = options.dealerHitSoft17;

        // Set the dealer
        var DEALER = dealer;
        this.dealer = new Dealer(DEALER);

        // Only one player for now
        var PLAYER = player;
        this.player = new Player(PLAYER);
        
        this.shoe = [];
        this.turn = null;
    }

    /**
     * Player model.
     */
    var Player = (function() {
        function Player(name) {
            this.name = name;
            this.cards = [];
            this.actions = [];
            this.history = [];
        }

        /**
         * Returns the players cards.
         *
         * @return {Array} cards
         */
        Player.prototype.getCards = function() {
            return this.cards;
        };

        /**
         * Can a player split their dealt cards.
         *
         * @return {Boolean}
         */
        Player.prototype.canSplit = function() {
            // The dealer can never split their cards
            if (this.prototype instanceof Player) {
                return false;
            }

            var cards = this.cards;
            if (cards.length === 2 && cards[0].rank === cards[1].rank) {
                return true;
            }

            return false;
        };

        /**
         * Can a player double down their hand.
         *
         * @return {Boolean}
         */
        Player.prototype.canDouble = function() {
            // The dealer can never double down
            if (this.prototype instanceof Player) {
                return false;
            }

            // A double down is only allowed on the first play or after a split
            if (this.history.length === 0 || this.history[this.history.length-1] === SPLIT) {
                return true;
            }

            return false;
        };

        /**
         * Get a list of possible actions for the player.
         *
         * @return {Array}
         */
        Player.prototype.getActions = function() {
            var total = Blackjack.Utils.score(this.cards);
            this.actions = [];

            if (total < 21) {
                this.actions.push(HIT);
                this.actions.push(STAND);
            }

            if (this.canDouble.call(this)) {
                this.actions.push(DOUBLE);
            }

            if (this.canSplit.call(this)) {
                this.actions.push(SPLIT);
            }

            return this.actions;
        };

        return Player;
    }());

    /**
     * Represents the dealer (house) in the game. A dealer
     * is a subclass of the Player class.
     *
     * @param {String} name
     */
    function Dealer(name) {
        Player.call(this, name);
    }

    // Attach the Player object to the Dealer prototype for subclass
    Dealer.prototype = Object.create(Player.prototype);

    /**
     * Represents a card in the shoe.
     *
     * @param {String} rank 
     * @param {String} suit
     */
    function Card(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }


    Game.prototype.getTurn = function() {
        return this.turn;
    };

    Game.prototype.setTurn = function(player) {
        this.turn = player;
    };

    Game.prototype.getShoe = function(player) {
       return this.shoe;
    };

    Game.prototype.getPlayer = function() {
       return this.player;
    };

    Game.prototype.getDealer = function() {
       return this.dealer;
    };

    Game.prototype.deal = function() {
        // Add the cards to the deck
        load.call(this);

        // Shuffle the shoe
        shuffle.call(this);

        // Deal to the player first and then the dealer
        this.player.cards.push(this.shoe.pop());
        this.dealer.cards.push(this.shoe.pop());
        this.player.cards.push(this.shoe.pop());

        // The player will be the first to act
        this.turn = this.player;
    };

    return Game;
}());