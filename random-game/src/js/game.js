import { Player } from './player.js';
export { Game };

const GameConst = {
    GameWidth : 600,
    GameHeight : 700,
}

class Game {
    constructor() {
        this.canvas = document.querySelector('.game');
        this.canvas.width = GameConst.GameWidth;
        this.canvas.height = GameConst.GameHeight;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width
        this.height = this.canvas.height;
        this.player = new Player(this)

        this.render();
    }

    render() {
        console.log(this.width, this.height);
        this.player.drawPlayer(this.context);

    }
}