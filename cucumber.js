module.exports = class Cucumber {
    static create(x, y) {
        return new Cucumber(x, y);
    }

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = Cucumber._getRandomInt(35, 55);
        this.animationDuration = Cucumber._getRandomInt(25, 50);
        this.rotation = Cucumber._getRandomInt(0, 360);
        this.bezier = Cucumber._getBezier();
    }

    static _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static _getBezier() {
        const bez = [
            Cucumber._getRandomFloat(0.2, 0.8),
            Cucumber._getRandomFloat(0.2, 0.5),
            Cucumber._getRandomFloat(0.2, 0.5),
            Cucumber._getRandomFloat(0.2, 0.5)
        ].join(', ');

        return 'cubic-bezier(' + bez + ')';

    }
    static _getRandomFloat(min, max) {
        return (Math.random() * (max - min)) + min;
    }
};
