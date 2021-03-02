class Rule {
    constructor(params) {
        Object.assign(this, params);
    }

    sum(dice) {
        return dice.reduce((prev, curr) => prev + curr);
    }

    freq(dice) {
        const freqs = new Map();
        for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1);
        return Array.from(freqs.values());
    }

    count(dice, val) {
        return dice.filter(d => d === val).length;
    }
}

class TotalOneNumber extends Rule {
    evalRoll = dice => {
        return this.val * this.count(dice, this.val);
    };
}

class SumDistro extends Rule {
    evalRoll = dice => {
        return this.freq(dice).some(c => c >= this.count) ? this.sum(dice) : 0;
    };
}

class FullHouse extends Rule {
    evalRoll = dice => {
        const freqs = this.freq(dice);
        return (freqs.includes(2) && freqs.includes(3)) ? this.score : 0;
    };
}

class SmallStraight extends Rule {
    evalRoll = dice => {
        const d = new Set(dice);
        return d.size >= 4 && (d.has(3) && d.has(4)) ? this.score : 0;
    };
    // 1234, 2345, 3456
}

class LargeStraight extends Rule {
    evalRoll = dice => {
        const d = new Set(dice);
        return d.size === 5 && (!d.has(1) || !d.has(6)) ? this.score : 0;
    };
}

class Yahtzee extends Rule {
    evalRoll = dice => {
        return this.freq(dice)[0] === 5 ? this.score : 0;
    };
}

const ones = new TotalOneNumber({ val: 1, description: "1 point per 1" });
const twos = new TotalOneNumber({ val: 2, description: "2 point per 2" });
const threes = new TotalOneNumber({ val: 3, description: "3 point per 3" });
const fours = new TotalOneNumber({ val: 4, description: "4 point per 1" });
const fives = new TotalOneNumber({ val: 5, description: "5 point per 5" });
const sixes = new TotalOneNumber({ val: 6, description: "6 point per 6" });

const threeOfKind = new SumDistro({ count: 3, description: "Sum of all Dice if 3 are same" });
const fourOfKind = new SumDistro({ count: 4, description: "Sum of all Dice if 4 are same" });

const fullHouse = new FullHouse({ score: 25, description: "25 points for a Full House" });

const smallStraight = new SmallStraight({ score: 30, description: "30 points for Small Straight" });
const largeStraight = new LargeStraight({ score: 40, description: "40 points for Large Straight" });

const yahtzee = new Yahtzee({ score: 50, description: "50 points for Yahtzee" });

const chance = new SumDistro({ count: 0, description: "Sum of All Dice" });

export {
    ones,
    twos,
    threes,
    fours,
    fives,
    sixes,
    threeOfKind,
    fourOfKind,
    fullHouse,
    smallStraight,
    largeStraight,
    yahtzee,
    chance
};