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
        this.keys = []

        this.updatePlayer();
        // window.addEventListener('keydown', (e) => this.player.updatePlayerLocation(e.key))
        window.addEventListener('keydown', (e) => {
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.keyCode === 32) this.player.shootBullet();
        })
        window.addEventListener('keyup', (e) => {
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index, 1);
        })
    }

    render() {
        this.player.drawPlayer(this.context);
        this.player.updatePlayerLocation();
        this.player.bulletPool.forEach((bullet) => {
            bullet.drawBullet(this.context);
            bullet.updateBulletLocation();
        })
    }

    updatePlayer() {
        const ctx = this;
        ctx.context.clearRect(0, 0, ctx.width, ctx.height);
        ctx.render();
        
        window.requestAnimationFrame(() => ctx.updatePlayer());
    }
}