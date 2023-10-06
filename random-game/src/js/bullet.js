export { BulletConst, Bullet };

const BulletConst = {
    numberOFBullets : 10,
}

class Bullet {
    constructor() {
        this.width = 10;
        this.height = 30;
        this.x = 0;
        this.y = 0;
        this.speed = 10;
        this.isFlown = false;
        this.image = document.querySelector('.bullet__img');
    }

    drawBullet(context) {
        if(this.isFlown) context.fillRect(this.x, this.y, this.width, this.height);
        if(this.isFlown) context.drawImage(this.image, 0, 0, 10, 30, this.x, this.y, this.width, this.height);
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