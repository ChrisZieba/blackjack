Blackjack.Utils = {
    score: function(cards) {
        var sum = 0, ace;

        for (var i = 0, value; i < cards.length; i+=1) {
            if (cards[i].rank === 'J' || cards[i].rank === 'Q' || cards[i].rank === 'K') {
                value = 10;
            } else if (cards[i].rank === 'A') {
                value = 1;
                ace = true;
            } else {
                value = parseInt(cards[i].rank);
            }

            sum += value;
        }

        if (ace && sum < 12) {
            sum += 10;
        }

        return sum; 
    }
}