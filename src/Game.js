/**
 * A utility library for all related blackjack functions.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Chris Zieba <zieba.chris@gmail.com>
 */

'use strict';

var Blackjack = Blackjack || {};

Blackjack.Game = (function() {

    var SUITS = ['♥', '♦', '♠', '♣'];
    var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    
    // constructor
    function Game(player, dealer, options) {
        this.decks = options.numberOfDecks;
        this.hitSoft17 = options.hitSoft17;
    };

    var Player = (function() {
        function Player(name) {
            this.name = name;
            this.cards = [];
            this.actions = [];
        }

        Player.prototype.getCards = function() {
            return this.cards;
        };

        Player.prototype.canSplit = function() {

        };

        Player.prototype.canDouble = function() {

        };

        Player.prototype.getActions = function() {

        };

        return Player;
    }());

    /**
     * Represents the dealer (house) in the game. A dealer
     * is a subclass of the Player class.
     *
     * @param {String} $name
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

    /**
     * Shuffle an array of cards.
     *
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

    Game.prototype.getTurn = function() {
        return this.turn;
    }

    Game.prototype.setTurn = function(player) {
        this.turn = player;
    }

    Game.prototype.getShoe = function(player) {
       return this.shoe;
    }


    Game.prototype.getPlayer = function() {
       return this.player;
    }

    Game.prototype.getDealer = function() {
       return this.dealer;
    }

    Game.prototype.deal = function() {
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