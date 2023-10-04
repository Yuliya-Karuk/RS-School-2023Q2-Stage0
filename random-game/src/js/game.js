import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { newUtils } from './utils.js';
export { Game };

const GameConst = {
    GameWidth : 600,
    GameHeight : 700,
    numberOfEnemy : 8,
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
        this.keys = [];
        this.enemyPool = [];

        this.updatePlayer();
        this.createEnemyPool();

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
        this.enemyPool.forEach((enemy) => {
            enemy.drawEnemy(this.context);
            enemy.updateEnemyLocation();
        })
    }

    updatePlayer() {
        const ctx = this;
        ctx.context.clearRect(0, 0, ctx.width, ctx.height);
        ctx.render();

        window.requestAnimationFrame(() => ctx.updatePlayer());
    }

    // delay(enemy, ms) {
    //     return new Promise((resolve) => {
    //         console.log(ms)
    //         setTimeout(() => {
    //             enemy.startEnemyFlow();
    //             resolve();
    //         }, 500)
    //     })
    // }

    createEnemyPool() {
        for (let i = 0; i < GameConst.numberOfEnemy; i += 1) {
            this.enemyPool.push(new Enemy(this));
        }
        this.startEnemyAttack();
    }

    // getOneEnemy() {
    //     for (let i = 0; i < this.enemyPool.length; i += 1) {
    //         if (!this.enemyPool[i].isFlown) return this.enemyPool[i];
    //     }
    // }

    // async startEnemyAttack() {
    //     for (let i = 0; i < this.enemyPool.length; i += 1) {
    //         let enemy = this.enemyPool[i];
    //          await this.delay(enemy, (i + 1) * 500);
    //         console.log("start")
    //     }

    // }

    async startEnemyAttack() {
        for (let i = 0; i < this.enemyPool.length; i += 1) {
            await this.enemyPool[i].resolveEnemy();
            console.log("start")
        }

    }
}
