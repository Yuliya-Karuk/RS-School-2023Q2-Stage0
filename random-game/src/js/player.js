export { Player };

class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height;
    }

    drawPlayer(context) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}