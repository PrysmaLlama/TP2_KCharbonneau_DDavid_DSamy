
export class PseudoRandom {
    constructor(seed) {
        if (Number.isInteger(seed) && seed > 0) {
            this.seed = seed;
        } else {
            this.seed = 1;
        }
    }

    current = 1;

    GetRandom(number) {
        if (!Number.isInteger(number)) {
            return false;
        } 
        else if (number <= 0) number = 1;

        return Math.round((this.seed * number * 573637) / 7489) % 564713;
    }

    Next() {
        this.current++;
        const randValue =  this.GetRandom(this.current)

        return randValue;
    }
}