import { Mouvement } from "./Mouvement.js";

export class Hole {
    protected x: number;
    protected y: number;
    protected isFilled: boolean;


    constructor(x: number, y: number, isFilled: boolean = false) {
        this.x = x
        this.y = y
        this.isFilled = isFilled
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    // Méthode pour obtenir si le trou est rempli
    public getIsFilled(): boolean {
        return this.isFilled;
    }

    public fill(isFilled: boolean = true) {
        this.isFilled = isFilled;
    }
    


}