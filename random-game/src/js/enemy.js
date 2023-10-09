import { newUtils } from './utils.js';
export { Enemy };

const EnemyConst = {
    EnemyDelay : 700,
}

class Enemy {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 60;
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
        if(this.isFlown) context.strokeRect(this.x, this.y, this.width, this.height);
        if(this.isFlown) context.drawImage(this.image, this.imageNumberX * this.monsterWidth, this.imageNumberY * this.monsterHeight, this.monsterWidth, this.monsterHeight, this.x, this.y, this.width, this.height);
    }

    startEnemyFlow() {
        let enemyCollision = true;
        let newLocation;

        while (enemyCollision) {
            newLocation = newUtils.generateRandomPosition(0, this.game.width - this.width);
            enemyCollision = this.checkCollisionEnemies(newLocation);
        }
        this.x = newLocation;
        this.isFlown = true;
    }

    checkCollisionEnemies(newLocation) {
        let collision = false;
        for (let i = 0; i < this.game.enemyPool.length ; i += 1) {
            if (this.game.enemyPool[i] === this) continue;
            if (Math.abs(this.game.enemyPool[i].x - newLocation) < this.width && Math.abs(this.game.enemyPool[i].y - this.y) < this.height) {
                collision = true;
            }
        }
        return collision;
    }

    updateEnemyLocation() {
        if (this.isFlown) {
            this.y += this.speed;
            this.game.player.bulletPool.forEach(bullet => {
                if (this.game.checkCollision(this, bullet) && this.lives > 0) {
                    this.lives -= 1;
                    if (!this.game.gameOver) this.game.score += 1;
                    this.game.player.showAnimation();
                    bullet.returnBullet();
                };
            });
            if (this.lives < 1) {
                if (this.game.frameAnimationUpdate) this.showMonsterChanging();
            }
            if (this.y + this.height > this.game.height || this.game.checkCollision(this, this.game.player)) {
                this.game.player.lives -= 1;
                console.log(this.game.player.lives)
                if (this.game.player.lives === 0) {
                    this.game.gameOver = true;
                    this.game.enemyPool = [];
                }
                this.returnEnemy();
            }
        }
    }

    returnEnemy() {
        this.isFlown = false;
        this.y = 0;
        this.imageNumberX = 0;
        this.imageNumberY = newUtils.generateRandomPosition(0, this.numberOfMonster);
        this.lives = 1;
        this.startEnemyFlow();
    }

    showMonsterChanging() {
        this.imageNumberX += 1;
        if (this.imageNumberX > 2) {
            this.returnEnemy();
            this.game.player.imageNumberX = 0;
        }
    }
}