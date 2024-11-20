import Drawer from "./Drawer.js";
export class Display {
    constructor(width, height, scale = 10) {
        this.drawer = new Drawer(width, height, scale);
    }
    refreshScore() {
        let score = document.getElementById("score");
        if (score != null)
            score.innerHTML = "0";
    }
    // Fonction pour dessiner tous les éléments du jeu
    draw(game) {
        this.drawer.clear(); // Efface l'écran avant de dessiner
        // Dessiner le joueur
        const playerPosition = game.getPlayer().getPosition();
        this.drawer.drawCircle(playerPosition.x, playerPosition.y, "blue");
        // Dessiner les rochers
        game.getRocks().forEach(rock => {
            const rockPosition = rock.getPosition();
            this.drawer.drawRectangle(rockPosition.x, rockPosition.y, "gray");
        });
        // Dessiner les trous
        game.getHoles().forEach(hole => {
            const holePosition = hole.getPosition();
            const color = hole.getIsFilled() ? "green" : "black"; // Change color if filled
            this.drawer.drawRectangle(holePosition.x, holePosition.y, color);
        });
    }
    // Méthode pour mettre à jour l'affichage du niveau dans le HTML
    updateLevel(level) {
        const levelDisplay = document.getElementById("score");
        if (levelDisplay) {
            levelDisplay.innerHTML = `${level}`; // Affiche le niveau dans le HTML
        }
    }
}
