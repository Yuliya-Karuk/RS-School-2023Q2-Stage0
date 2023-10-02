export { BulletConst, Bullet };

const BulletConst = {
    numberOFBullets : 10,
}

class Bullet {
    constructor() {
        this.width = 4;
        this.height = 20;
        this.x = 0;
        this.y = 0;
        this.speed = 20;
        this.isFlown = false;
    }

    drawBullet(context) {
        if(this.isFlown) context.fillRect(this.x, this.y, this.width, this.height);
    }

    startBulletFlow(x, y) {
        this.x = x - this.width * 0.5;
        this.y = y;
        this.isFlown = true;
    }

    updateBulletLocation() {
        if(this.isFlown) {
            this.y -= this.speed;
            if (this.y < -this.height) this.returnBullet();
        }
    }

    returnBullet() {
        this.isFlown = false;
    }
}