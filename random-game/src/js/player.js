export { Player };

class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
        this.speed = 5;
    }

    drawPlayer(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    updatePlayerLocation() {
        // if (movement === 'ArrowLeft') this.x -= this.speed;
        // if (movement === 'ArrowRight') this.x += this.speed;
        if(this.game.keys.indexOf('ArrowLeft') > -1) this.x -= this.speed;
        if(this.game.keys.indexOf('ArrowRight') > -1) this.x += this.speed;

    }
}