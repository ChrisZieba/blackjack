/**
 * Calulcate blackjack hand probabilities for different actions.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Chris Zieba (zieba.chris@gmail.com)
 */

var Blackjack = Blackjack || {};

Blackjack.Probability = (function() {
    'use strict';

    /**
     * Helper function to initiliaze the probabilities object.
     *
     * @return {Object} stats
     */
    function init() {
        var stats = {
            hands: 0,
            win: {
                hands: 0,
                odds: 0 
            },
            lose: {
                hands: 0,
                odds: 0 
            },
            push: {
                hands: 0,
                odds: 0 
            }
        };

        return stats;
    }

    /**
     * Helper function to combine probabilities.
     *
     * @return {Object} currentStats
     */
    function combine(currentStats, newStats) {
        currentStats.hands += newStats.hands;
        currentStats.win.hands += newStats.win.hands;
        currentStats.win.odds += newStats.win.odds;
        currentStats.lose.hands += newStats.lose.hands;
        currentStats.lose.odds += newStats.lose.odds;
        currentStats.push.hands += newStats.push.hands;
        currentStats.push.odds += newStats.push.odds;

        return currentStats;
    }

    /**
     * Calculate the win/loss/push probabilities of the player standing after the deal.
     *
     * @param {Array} shoe
     * @param {Object} dealerCards
     * @param {Object} playerCards
     * @param {Integer} maxPullCount
     * @param {Integer} pullCount
     * @param {Integer} startIndex
     * @return {Object} stats
     */
    var stand = function(shoe, dealerCards, playerCards, maxPullCount, pullCount, startIndex) {
        var dealerTotalAfterPull, dealerCardsAfterPull, newStats;
        var playerTotal = Blackjack.Utils.score(playerCards);
        var stats = init();

        //var index = (startIndex !== null) ? startIndex : 0;

        for (var i = 0, j=pullCount+startIndex; i < shoe.length-pullCount; i+=1, j+=1) {
            // The dealer pulls a card from the shoe

            j = (j >= shoe.length) ? 0 : j;
            // this is just making sure we wrap around the array
            var nextCard = shoe[(pullCount > 0) ? j : i];

            /**
             * Calculate the probability of pulling a card from the deck.
             * The probability for pulling one card from the shoe is 1/(cards in shoe).
            */
            var cardProbabilty = 1;
            for (var l=0; l<=pullCount; l+=1) {
                cardProbabilty *= 1/(shoe.length-l);
            }

            dealerCardsAfterPull = dealerCards.slice();
            dealerCardsAfterPull.push(nextCard);
            
            // We want to create a new array so we can use the previos cards easily
            dealerTotalAfterPull = Blackjack.Utils.score(dealerCardsAfterPull);

            if (playerTotal > 21) {
                stats.hands += 1;
                stats.lose.hands += 1;
                stats.lose.odds += cardProbabilty;
            } else if (dealerTotalAfterPull > 21) {
                stats.hands+=1;
                stats.win.hands += 1;
                stats.win.odds += cardProbabilty;
            } else if (dealerTotalAfterPull >= 17) {
                stats.hands += 1;
                // the odds are 0% on a push so it is ignored
                if (dealerTotalAfterPull < playerTotal) {
                    stats.win.hands += 1;
                    stats.win.odds+=cardProbabilty;
                } else if (dealerTotalAfterPull > playerTotal) {
                    stats.lose.hands += 1;
                    stats.lose.odds += cardProbabilty;
                } else {
                    stats.push.hands += 1;
                    stats.push.odds += cardProbabilty;
                }
            } else {
                /**
                 * If the player hand is not withing the standing range we hit again.
                 * The startIndex is important because we want to pull a card at a 
                 * specific element in the shoe (the next card). The maxPullCount is 
                 * used as a way to maintain 
                 */
                if (pullCount <= maxPullCount) {
                    newStats = stand(shoe, dealerCardsAfterPull, playerCards, maxPullCount, pullCount+1, (pullCount > 0) ? startIndex : i);
                    stats = combine(stats, newStats);
                }
            }
        }

        return stats;
    };

    /**
     * Calculate the win/loss/push probabilities of the player hitting their hand.
     *
     * @param {Array} shoe
     * @param {Object} dealerCards
     * @param {Object} playerCards
     * @param {Integer} maxPullCount
     * @param {Integer} pullCount
     * @param {Integer} startIndex
     * @return {Object} stats
     */
    var hit = function(shoe, dealerCards, playerCards, maxPullCount, pullCount, startIndex) {
        var playerTotalAfterPull, playerCardsAfterPull, newStats;
        var playerTotal = Blackjack.Utils.score(playerCards);
        var stats = init();

        /**
         * Loop through every card in the shoe.
         * Use the counters i,j, and pullCount to remember at what 
         * point in the shoe we are.
         */
        for (var i = 0, j = pullCount + startIndex; i < shoe.length - pullCount; i+=1, j+=1) {
            // The player pulls a card from the shoe
            j = (j >= shoe.length) ? 0 : j;

            // This is just making sure we wrap around the array
            var nextCard = shoe[(pullCount > 0) ? j : i];

            /**
             * Calculate the probability of pulling a card from the deck.
             * The probability for pulling one card from the shoe is 1/(cards left in shoe).
             */
            var cardProbabilty = 1;
            for (var l=0; l<=pullCount; l+=1) {
                cardProbabilty*= 1/(shoe.length-l);
            }

            playerCardsAfterPull = playerCards.slice();
            playerCardsAfterPull.push(nextCard);
            
            // Only take a card if not a blackjack
            if (pullCount === 0 && playerTotal === 21) {
                playerTotalAfterPull = playerTotal;
            } else {
                playerTotalAfterPull = Blackjack.Utils.score(playerCardsAfterPull);
            }

            // Even if the player total is a bust we need run through the hand probabilites agasint the dealer 
            if (playerTotalAfterPull >= 17) {
                /**
                 * If the player hand is within standing range (17 and 21) or bust (> 21)
                 * we need to calculate the probabilites as if the hand was played out by the dealer.
                 */
                newStats = stand(shoe, dealerCards, playerCardsAfterPull, maxPullCount, pullCount + 1, 0);
                stats = combine(stats, newStats);
            } else {
                /**
                 * If the player hand is not within the standing range we hit again.
                 * The startIndex is important because we want to pull a card at a 
                 * specific element in the shoe (the next card).
                 */
                if (pullCount <= maxPullCount) {
                    newStats = hit(shoe, dealerCards, playerCardsAfterPull, maxPullCount, pullCount + 1, (pullCount > 0) ? startIndex : i);
                    stats = combine(stats, newStats);
                }
            }
        }

        return stats;
    };

    /**
     * Calculate the win/loss/push probabilities of the player doubling down.
     *
     * @param {Array} shoe
     * @param {Object} dealerCards
     * @param {Object} playerCards
     * @param {Integer} maxPullCount
     * @param {Integer} pullCount
     * @param {Integer} startIndex
     * @return {Object} stats
     */
    var double = function(shoe, dealerCards, playerCards, maxPullCount, pullCount, startIndex) {
        var playerTotalAfterPull, playerCardsAfterPull, newStats;
        var playerTotal = Blackjack.Utils.score(playerCards);
        var stats = init();

        for (var i = 0, j=pullCount+startIndex; i < shoe.length-pullCount; i+=1, j+=1) {
            j = (j >= shoe.length) ? 0 : j;
            // The player pulls a card from the shoe
            var nextCard = shoe[(pullCount > 0) ? j : i];

            // Add the card to the players hand
            playerCardsAfterPull = playerCards.slice();
            playerCardsAfterPull.push(nextCard);

            // Calculate what the probabilities are when compared to the dealers hand
            newStats = stand(shoe, dealerCards, playerCardsAfterPull, maxPullCount, pullCount+1, 0);
            stats = combine(stats, newStats);
        }

        return stats;
    };

    return {
        stand: function(shoe, dealerCards, playerCards, maxPullCount) {
            return stand(shoe, dealerCards, playerCards, maxPullCount, 0, 0);
        },

        hit: function(shoe, dealerCards, playerCards, maxPullCount) {
            return hit(shoe, dealerCards, playerCards, maxPullCount, 0, 0);
        },

        double: function(shoe, dealerCards, playerCards, maxPullCount) {
            return double(shoe, dealerCards, playerCards, maxPullCount, 0, 0);
        }
    };
}());