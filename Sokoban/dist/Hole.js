export class Hole {
    constructor(x, y, isFilled = false) {
        this.x = x;
        this.y = y;
        this.isFilled = isFilled;
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    // Méthode pour obtenir si le trou est rempli
    getIsFilled() {
        return this.isFilled;
    }
    fill(isFilled = true) {
        this.isFilled = isFilled;
    }
}
