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
        this.imageNumberY = 0; // пока 1 моснтр
        // this.imageNumberY = generateRandomPosition(0, 4); сделаю 4 монстра
        this.lives = 1;
    }
}