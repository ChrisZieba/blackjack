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

Blackjack.Game = (function () {

    var SUITS = ['♥', '♦', '♠', '♣'];
    var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    
    // constructor
    function Game(player, dealer, options) {
        this.decks = options.numberOfDecks;
        this.hitSoft17 = options.hitSoft17;
    };

    var Player = (function() {

    }());

    Dealer.prototype = Object.create(Player.prototype);

    function Card(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    Game.prototype.getTurn = function() {
        return this.turn;
    }

    Game.prototype.setTurn = function(player) {
        this.turn = player;
    }

    Game.prototype.deal = function() {
    };

    return Game;
}());