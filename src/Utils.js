/**
 * A utility library for all related blackjack functions.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Author: Chris Zieba <zieba.chris@gmail.com>
 */

var Blackjack = Blackjack || {};

Blackjack.Utils = {

    /**
     * Calculates the score total of a blackjack hand.
     * An ace is treated as 11 until the score is above 
     * 21 then it is used as a 1 instead. Returns an
     * integer value of the score of the hand.
     *
     * @param {Array} cards
     * @return {Integer} sum
     */
    score: function(cards) {
        var sum = 0;

        // A flag to determine whether the hand has an ace
        var ace;

        for (var i = 0, value; i < cards.length; i+=1) {
            if (cards[i].rank === 'J' || cards[i].rank === 'Q' || cards[i].rank === 'K') {
                value = 10;
            } else if (cards[i].rank === 'A') {
                value = 1;
                ace = true;
            } else {
                value = parseInt(cards[i].rank, 10);
            }

            sum += value;
        }

        // Treat the ace as an 11 if the hand will not bust
        if (ace && sum < 12) {
            sum += 10;
        }

        return sum; 
    }
};