export { Player };
import { BulletConst, Bullet } from './bullet.js';

const PlayerConst = {
    playerLives: 3,
}

class Player {
    constructor(game) {
        this.game = game;
        this.width = 80;
        this.height = 80;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.leftBoundary = 0 - this.width * 0.5;
        this.rightBoundary = this.game.width -  this.width * 0.5;
        this.speed = 2.5;
        this.lives = PlayerConst.playerLives;
        this.imageNumberX = 0;
        this.image = document.querySelector('.ship-img');

        this.bulletPool = [];
        this.createBulletPool();
    }

    drawPlayer() {
        this.game.context.drawImage(this.image, this.imageNumberX * this.width, 0, 80, 80, this.x, this.y, this.width, this.height);
    }

    updatePlayerLocation() {
        this.drawPlayer();
        if(this.game.buttonKeys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if(this.game.buttonKeys.indexOf('ArrowRight') > -1) this.x += this.speed;

        if (this.x < this.leftBoundary) this.x = this.leftBoundary;
        if (this.x > this.rightBoundary) this.x = this.rightBoundary;
    }

    createBulletPool() {
        for (let i = 0; i < BulletConst.numberOFBullets; i += 1) {
            this.bulletPool.push(new Bullet(this.game));
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

    restartPlayer() {
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.lives = PlayerConst.playerLives;
    }

    showAnimation() {
        this.imageNumberX = 1;
    }
}