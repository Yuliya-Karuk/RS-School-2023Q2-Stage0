export { BulletConst, Bullet };

const BulletConst = {
    numberOFBullets : 10,
}

class Bullet {
    constructor(game) {
        this.game = game;
        this.width = 10;
        this.height = 30;
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.isFlown = false;
        this.image = document.querySelector('.bullet-img');
    }

    startBulletFlow(x, y) {
        this.x = x - this.width * 0.5;
        this.y = y;
        this.isFlown = true;
    }

    drawBullet() {
        this.game.context.drawImage(this.image, 0, 0, 10, 30, this.x, this.y, this.width, this.height);
    }

    updateBullet() {
        if(this.isFlown) {
            this.drawBullet();
            this.y -= this.speed;
            if (this.y < -this.height) this.returnBullet();
        }
    }

    returnBullet() {
        this.isFlown = false;
    }
}