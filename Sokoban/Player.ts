import { Mouvement } from "./Mouvement.js";

export class Player {
    protected x: number;
    protected y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }
    
    setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
