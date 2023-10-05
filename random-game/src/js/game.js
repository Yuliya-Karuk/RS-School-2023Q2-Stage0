import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { GameTools } from './game_tools.js';
export { Game };

const GameConst = {
    GameWidth : window.innerWidth * 0.8,
    GameHeight : window.innerHeight * 0.8,
    numberOfEnemy : 5,
}

class Game {
    constructor() {
        this.canvas = document.querySelector('.game');
        this.canvas.width = GameConst.GameWidth > 600 ? 600 : GameConst.GameWidth;
        this.canvas.height = GameConst.GameHeight;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.keys = [];
        this.enemyPool = [];
        this.gameTools = new GameTools(this);
        this.score = 0;
        this.gameOver = false;

        this.updateGame();
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
        this.gameTools.showScore();
        this.gameTools.drawGamePlayerLives();
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

        if (this.gameOver) this.gameTools.drawGameOverText();
    }

    updateGame() {
        const ctx = this;
        ctx.context.clearRect(0, 0, ctx.width, ctx.height);
        ctx.render();

        window.requestAnimationFrame(() => ctx.updateGame());
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
        }
    }

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }
}
