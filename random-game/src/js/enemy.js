import { newUtils } from './utils.js';
export { Enemy };

const EnemyConst = {
    EnemyDelay : 700,
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 30;
        this.height = 30;
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        this.isFlown = false;
    }

    resolveEnemy() {
        return new Promise((resolve) => {
            console.log('enemy')
            setTimeout(() => {
                this.startEnemyFlow();
                resolve();
            }, EnemyConst.EnemyDelay)
        })
    }

    drawEnemy(context) {
        if(this.isFlown) context.fillRect(this.x, this.y, this.width, this.height);
    }

    startEnemyFlow() {
        this.x = newUtils.generateRandomPosition(0, this.game.width - this.width);
        this.isFlown = true;
    }

    updateEnemyLocation() {
        if (this.isFlown) {
            this.y += this.speed;
            if (this.y > this.game.height) this.returnEnemy();
            // if (this.y > this.game.height) this.y = 0;
        }
    }

    returnEnemy() {
        this.isFlown = false;
        this.y = 0;
        this.startEnemyFlow();
    }

}