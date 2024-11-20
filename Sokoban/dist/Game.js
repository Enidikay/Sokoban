import { Display } from "./Display.js";
import { Hole } from "./Hole.js";
import { Mouvement } from "./Mouvement.js";
import { Player } from "./Player.js";
import { Rock } from "./Rock.js";
export class Game {
    constructor(width, height, scale) {
        this.rocks = [];
        this.holes = [];
        this.level = 0;
        this.width = width;
        this.height = height;
        this.player = new Player(10, 10);
        this.display = new Display(width, height, scale);
        // Initialisation des éléments du jeu
        this.initialiseGame();
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }
    // Initialisation des éléments du jeu
    initialiseGame() {
        this.rocks = [];
        this.holes = [];
        this.level = 1;
        this.addLevelElements();
        console.log('Joueur:', this.player);
        console.log('Rochers:', this.rocks);
        console.log('Trous:', this.holes);
        this.display.draw(this);
        this.display.updateLevel(this.level); // Affichage du niveau initial
    }
    // Vérifie si une position (x, y) est occupée par un rocher ou par le joueur.
    positionTaken(x, y, currentRock) {
        for (const rock of this.rocks) {
            if (rock !== currentRock && rock.getPosition().x === x && rock.getPosition().y === y) {
                return true;
            }
        }
        const playerPosition = this.player.getPosition();
        if (playerPosition.x === x && playerPosition.y === y) {
            return true;
        }
        return false;
    }
    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
                this.movePlayer(Mouvement.UP);
                break;
            case 'ArrowDown':
                this.movePlayer(Mouvement.DOWN);
                break;
            case 'ArrowLeft':
                this.movePlayer(Mouvement.LEFT);
                break;
            case 'ArrowRight':
                this.movePlayer(Mouvement.RIGHT);
                break;
        }
    }
    // Déplace le joueur, gère les déplacements des rochers, et les interractions avec les trous
    movePlayer(dir) {
        const playerPos = this.player.getPosition();
        let newX = playerPos.x;
        let newY = playerPos.y;
        // Calculer la nouvelle position en fonction de la direction
        switch (dir) {
            case Mouvement.UP:
                newY -= 1;
                break;
            case Mouvement.DOWN:
                newY += 1;
                break;
            case Mouvement.LEFT:
                newX -= 1;
                break;
            case Mouvement.RIGHT:
                newX += 1;
                break;
        }
        // Vérifier si le mouvement est en dehors des limites du jeu
        if (newX < 0 || newY < 0 || newX >= this.width || newY >= this.height) {
            console.log("Impossible de se déplacer en dehors des limites.");
            return;
        }
        // Vérifier si la nouvelle position est un trou et s'il est rempli
        const hole = this.holes.find(h => h.getPosition().x === newX && h.getPosition().y === newY);
        if (hole && !hole.getIsFilled()) {
            console.log("Impossible de se déplacer sur un trou non rempli.");
            return;
        }
        // Vérifier si un rocher est sur la nouvelle position et essayer de le déplacer
        const rock = this.rocks.find(r => r.getPosition().x === newX && r.getPosition().y === newY);
        if (rock) {
            let rockNewX = newX;
            let rockNewY = newY;
            // Calculer la nouvelle position du rocher
            switch (dir) {
                case Mouvement.UP:
                    rockNewY -= 1;
                    break;
                case Mouvement.DOWN:
                    rockNewY += 1;
                    break;
                case Mouvement.LEFT:
                    rockNewX -= 1;
                    break;
                case Mouvement.RIGHT:
                    rockNewX += 1;
                    break;
            }
            // Vérifier si le rocher peut être déplacé (si la position n'est pas prise et si le rocher n'est pas dans un trou)
            if (rockNewX < 0 || rockNewY < 0 || rockNewX >= this.width || rockNewY >= this.height || this.positionTaken(rockNewX, rockNewY, rock)) {
                console.log("Le rocher ne peut pas être déplacé.");
                return;
            }
            // Déplacer le rocher
            rock.setPosition(rockNewX, rockNewY);
            // Vérifier si le rocher remplit un trou
            const holeToFill = this.holes.find(h => h.getPosition().x === rockNewX && h.getPosition().y === rockNewY);
            if (holeToFill) {
                holeToFill.fill(); // Remplir le trou
                console.log(`Le trou en (${rockNewX}, ${rockNewY}) est rempli.`);
                // Parcourir le tableau pour trouver et retirer le rocher
                for (let i = 0; i < this.rocks.length; i++) {
                    if (this.rocks[i] === rock) {
                        this.rocks.splice(i, 1); // Retirer le rocher trouvé
                        break;
                    }
                }
            }
        }
        // Déplacer le joueur si ce n'est pas un rocher
        this.player.setPosition(newX, newY);
        this.display.draw(this);
        // Vérifie si tous les trous sont remplis et passe au niveau suivant si c'est le cas
        if (this.isComplete()) {
            this.levelUp(); // Passe au niveau suivant
        }
    }
    // Gère l'initialisation d'un niveau
    addLevelElements() {
        // Ajouter des trous et des rochers pour ce niveau
        for (let i = 0; i < this.level; i++) {
            // Générer une position valide pour le trou
            let holePosition = this.generatePosition();
            while (this.positionTaken(holePosition.x, holePosition.y)) {
                holePosition = this.generatePosition(); // Chercher une nouvelle position valide
            }
            const hole = new Hole(holePosition.x, holePosition.y);
            this.holes.push(hole);
            // Générer une position valide pour le rocher
            let rockPosition = this.generatePosition();
            while (this.positionTaken(rockPosition.x, rockPosition.y)) {
                rockPosition = this.generatePosition(); // Chercher une nouvelle position valide
            }
            const rock = new Rock(rockPosition.x, rockPosition.y);
            this.rocks.push(rock);
        }
    }
    // Génère une position aléatoire qui n'est pas collée aux limites de la carte
    generatePosition() {
        const x = Math.floor(Math.random() * (this.width - 4)) + 2;
        const y = Math.floor(Math.random() * (this.height - 4)) + 2;
        return { x, y };
    }
    isComplete() {
        const allHolesFilled = this.holes.every(hole => hole.getIsFilled());
        return allHolesFilled;
    }
    // Remet à zéro les trous et ajoute les nouveaux éléments
    levelUp() {
        this.level += 1;
        console.log(`Niveau ${this.level}`);
        this.holes = [];
        this.rocks = [];
        // Ajouter les nouveaux éléments pour le prochain niveau
        this.addLevelElements();
        // Afficher le nouveau niveau
        this.display.updateLevel(this.level);
    }
    getRocks() {
        return this.rocks;
    }
    getHoles() {
        return this.holes;
    }
    getPlayer() {
        return this.player;
    }
}
