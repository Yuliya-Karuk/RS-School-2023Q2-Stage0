import { Enemy } from './enemy.js';
import { newUtils } from './utils.js';
export { Monster };

class Monster extends Enemy {
    constructor(game) {
        super(game)
        this.image = document.querySelector('.monster__img');
        this.monsterWidth = 140;
        this.monsterHeight = 130;
        this.imageNumberX = 0;
        this.numberOfMonster = 3;
        this.imageNumberY = newUtils.generateRandomPosition(0, this.numberOfMonster);
        this.lives = 1;
    }
}