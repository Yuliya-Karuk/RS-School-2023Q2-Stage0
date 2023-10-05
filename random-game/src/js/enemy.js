import { newUtils } from './utils.js';
export { Enemy };

const EnemyConst = {
    EnemyDelay : 700,
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.x = 0;
        this.y = 0;
        this.speed = 0.5;
        this.isFlown = false;
    }

    resolveEnemy() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.startEnemyFlow();
                resolve();
            }, EnemyConst.EnemyDelay);
        });
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
            this.game.player.bulletPool.forEach(bullet => {
                if (this.game.checkCollision(this, bullet)) {
                    if (!this.game.gameOver) this.game.score += 1;
                    this.returnEnemy();
                };
            });
            if (this.y + this.height > this.game.height || this.game.checkCollision(this, this.game.player)) {
                this.game.player.lives -= 1;
                console.log(this.game.player.lives)
                if (this.game.player.lives === 0) {
                    this.game.gameOver = true;
                }
                this.returnEnemy();
            }
        }
    }

    returnEnemy() {
        this.isFlown = false;
        this.y = 0;
        this.startEnemyFlow();
    }

}