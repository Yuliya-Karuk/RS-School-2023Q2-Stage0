export { Player };
import { BulletConst, Bullet } from './bullet.js';

class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.leftBoundary = 0 - this.width * 0.5;
        this.rightBoundary = this.game.width -  this.width * 0.5;
        this.speed = 5;

        this.bulletPool = [];
        this.createBulletPool();
    }

    drawPlayer(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePlayerLocation() {
        // if (movement === 'ArrowLeft') this.x -= this.speed;
        // if (movement === 'ArrowRight') this.x += this.speed;
        if(this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if(this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;

        if (this.x < this.leftBoundary) this.x = this.leftBoundary;
        if (this.x > this.rightBoundary) this.x = this.rightBoundary;
    }

    createBulletPool() {
        for (let i = 0; i < BulletConst.numberOFBullets; i += 1) {
            this.bulletPool.push(new Bullet());
        }
    }

    getOneBullet() {
        for (let i = 0; i < this.bulletPool.length; i += 1) {
            if (!this.bulletPool[i].isFlown) return this.bulletPool[i];
        }
    }

    shootBullet() {
        const bullet = this.getOneBullet();
        if (bullet) bullet.startBulletFlow(this.x + this.width * 0.5, this.y);
    }
}